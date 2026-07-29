import axios from "axios";

export default async function handler(req, res) {
  try {
    const apiUrl = process.env.RENDER_BACKEND_URL || process.env.VITE_API_URL || "https://real-estate-website-wj16.onrender.com";
    
    // Ping backend endpoint which triggers a database read query
    const response = await axios.get(`${apiUrl}/api/properties`);

    console.log(`[Supabase Keep-Alive Cron] Executed successfully. Found ${response.data?.length || 0} properties.`);

    return res.status(200).json({
      success: true,
      message: "Supabase keep-alive cron executed successfully.",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Supabase Keep-Alive Cron] Error pinging database:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
