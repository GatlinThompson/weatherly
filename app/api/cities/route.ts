export async function GET(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    // Validate required parameters
    if (!query || query.length < 2) {
      return new Response(
        JSON.stringify({
          error: "Query parameter must be at least 2 characters",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate API key
    const apiKey =
      process.env.WEATHER_API_KEY || process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    if (!apiKey) {
      console.error("Weather API key not configured");
      return new Response(
        JSON.stringify({
          error: "City search service temporarily unavailable",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Fetch cities from OpenWeatherMap Geocoding API
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      query
    )}&limit=5&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return new Response(JSON.stringify(errorData), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=600", // Cache for 10 minutes
      },
    });
  } catch (error) {
    console.error("Cities API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
