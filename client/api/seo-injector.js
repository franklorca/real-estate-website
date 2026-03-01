import fs from 'fs';
import path from 'path';
import Hashids from 'hashids';
import axios from 'axios';

// Initialize Hashids exactly as we did in client/src/utils/slugify.js
const hashids = new Hashids("real-estate-club-properties", 4, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

export default async function handler(req, res) {
    // 1. Get the path, e.g., /properties/beautiful-villa-e4R
    const { url } = req;
    const identifier = url.replace('/properties/', '').split('?')[0]; // beautiful-villa-e4R

    // 2. Decode the ID Safely
    let propertyId = null;
    const isStrictlyNumeric = /^\d+$/.test(identifier);

    const parts = identifier ? identifier.split("-") : [];
    const lastPart = parts.length > 0 ? parts[parts.length - 1] : "";

    if (isStrictlyNumeric) {
        propertyId = identifier;
    } else if (lastPart) {
        const decoded = hashids.decode(lastPart);
        if (decoded && decoded.length > 0) {
            propertyId = decoded[0];
        }
    }

    // 3. Fallback to Legacy ID (e.g. 12-beautiful-villa)
    if (!propertyId) {
        const legacyMatch = identifier?.match(/^(\d+)/);
        if (legacyMatch) {
            propertyId = legacyMatch[1];
        }
    }

    // 4. Read the raw HTML via a loopback request to the homepage
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    let html = '';
    try {
        // Fetch the root '/' which Vercel statically serves as index.html
        const htmlResponse = await axios.get(`${baseUrl}/`);
        html = htmlResponse.data;
    } catch (e) {
        console.error("Failed to read static index.html via loopback", e.message);
        return res.status(500).send("Internal Server Error: Missing index.html");
    }

    // 5. If we have a valid ID, fetch from backend and inject Meta Tags
    if (propertyId) {
        try {
            // Note: We use the production API URL here. Make sure this runs correctly on vercel.
            const apiUrl = process.env.VITE_API_URL || 'https://luminous-heaven-server.vercel.app';
            const response = await axios.get(`${apiUrl}/api/properties/${propertyId}`);
            const property = response.data;

            if (property) {
                const title = `${property.title} | Luminous Heaven`;
                const description = `Beautiful ${property.bedrooms} bed, ${property.bathrooms} bath property in ${property.city}. ${property.description ? property.description.substring(0, 120) + '...' : ''}`;
                const image = (property.image_gallery && property.image_gallery[0]) || property.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
                const cleanUrl = `https://${req.headers.host}${req.url}`;

                // Prepare the new <head> tags we want to inject
                const customTags = `
          <title>${title}</title>
          <meta name="description" content="${description}">
          <meta property="og:type" content="article">
          <meta property="og:title" content="${title}">
          <meta property="og:description" content="${description}">
          <meta property="og:url" content="${cleanUrl}">
          <meta property="og:image" content="${image}">
          <meta property="og:site_name" content="Luminous Heaven">
          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:title" content="${title}">
          <meta name="twitter:description" content="${description}">
          <meta name="twitter:image" content="${image}">
        `;

                // Replace the default title with our custom massive block
                html = html.replace('<title>Luminous Heaven</title>', customTags);
            }
        } catch (apiError) {
            console.error(`Failed to fetch property ${propertyId} for OG injection:`, apiError.message);
            // Fallback: just serve the normal HTML without custom tags if the API fails
        }
    }

    // 6. Return the perfectly hydrated HTML string!
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30'); // Cache on Vercel Edge for 60s
    return res.status(200).send(html);
}
