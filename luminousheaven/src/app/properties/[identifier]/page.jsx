// luminousheaven/src/app/properties/[identifier]/page.jsx
import PropertyDetailClient from "@/components/PropertyDetailClient";
import db from "@/lib/db";
import { decodeId, isValidHashId } from "@/utils/slugify";

export async function generateMetadata({ params }) {
  const { identifier } = await params;

  let resolvedId = null;
  const isStrictlyNumeric = /^\d+$/.test(identifier);

  const parts = identifier ? identifier.split("-") : [];
  const lastPart = parts.length > 0 ? parts[parts.length - 1] : "";

  if (isStrictlyNumeric) {
    resolvedId = identifier;
  } else if (lastPart && isValidHashId(lastPart)) {
    resolvedId = decodeId(lastPart);
  } else {
    const legacyMatch = identifier?.match(/^(\d+)/);
    if (legacyMatch) {
      resolvedId = legacyMatch[1];
    }
  }

  if (!resolvedId) {
    return {
      title: "Exclusive Property | Luminous Heaven",
      description: "Discover luxury real estate and exclusive properties at Luminous Heaven.",
    };
  }

  try {
    const propertyId = parseInt(resolvedId, 10);
    const property = await db("properties").where({ id: propertyId }).first();

    if (!property) {
      return {
        title: "Property Not Found | Luminous Heaven",
      };
    }

    const title = `${property.title} in ${property.city} | Luminous Heaven`;
    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(property.price);

    const description = property.description
      ? property.description.substring(0, 160).replace(/\n/g, " ") + "..."
      : `Beautiful ${property.bedrooms} bed, ${property.bathrooms} bath residence in ${property.city} listed for ${formattedPrice}. Discover exclusive luxury real estate at Luminous Heaven.`;

    // Determine featured image for OpenGraph / Twitter cards
    let propertyImageUrl = property.image;
    if (!propertyImageUrl && property.image_gallery) {
      let gallery = [];
      if (Array.isArray(property.image_gallery)) gallery = property.image_gallery;
      else if (typeof property.image_gallery === "string") {
        try {
          gallery = JSON.parse(property.image_gallery);
        } catch (e) {}
      }
      if (Array.isArray(gallery) && gallery.length > 0) {
        propertyImageUrl = gallery[0];
      }
    }

    const ogImage =
      propertyImageUrl ||
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

    const canonicalUrl = `https://www.luminous-heaven.com/properties/${identifier}`;

    return {
      title: title,
      description: description,
      openGraph: {
        title: title,
        description: description,
        url: canonicalUrl,
        siteName: "Luminous Heaven",
        type: "article",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: property.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: [ogImage],
      },
    };
  } catch (error) {
    console.error("Error generating metadata for property:", error);
    return {
      title: "Exclusive Property | Luminous Heaven",
    };
  }
}

export default async function PropertyDetailPage({ params }) {
  const { identifier } = await params;

  let resolvedId = null;
  const isStrictlyNumeric = /^\d+$/.test(identifier);

  const parts = identifier ? identifier.split("-") : [];
  const lastPart = parts.length > 0 ? parts[parts.length - 1] : "";

  if (isStrictlyNumeric) {
    resolvedId = identifier;
  } else if (lastPart && isValidHashId(lastPart)) {
    resolvedId = decodeId(lastPart);
  } else {
    const legacyMatch = identifier?.match(/^(\d+)/);
    if (legacyMatch) {
      resolvedId = legacyMatch[1];
    }
  }

  let initialProperty = null;
  if (resolvedId) {
    try {
      const propertyId = parseInt(resolvedId, 10);
      initialProperty = await db("properties").where({ id: propertyId }).first();
    } catch (e) {
      console.error("Error prefetching property on server:", e);
    }
  }

  return (
    <PropertyDetailClient
      initialProperty={initialProperty}
      identifier={identifier}
    />
  );
}
