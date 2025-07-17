// Import required modules and configuration
export async function GET(req: Request): Promise<Response> {
  try {
    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    // Validate required parameters
    if (!lat || !lon) {
      return new Response(
        JSON.stringify({ error: "Lat/Lon parameters are required" }),
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
        JSON.stringify({ error: "Weather service temporarily unavailable" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Set request options
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "accept-encoding": "deflate, gzip, br",
      },
    };

    // Get forecast data
    const forecastResponse = await fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&units=imperial&apikey=${process.env.NEXT_TOMMORROW_API_KEY}`,
      options
    );

    if (!forecastResponse.ok) {
      const errorData = await forecastResponse.json().catch(() => ({}));
      return new Response(JSON.stringify(errorData), {
        status: forecastResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const forecastData = await forecastResponse.json();

    // Get uv index data
    const uvIndexData = forecastData.timelines.hourly
      .slice(0, 24)
      .map((item: { time: string; values: { uvIndex: number } }) => {
        return {
          time: item.time,
          uvIndex: item.values.uvIndex,
        };
      });

    // Get moon data
    const timestamp = Math.floor(Date.now() / 1000);

    const moonReponse = await fetch(
      `https://api.farmsense.net/v1/moonphases/?d=${timestamp}`
    );

    if (!moonReponse.ok) {
      const errorData = await moonReponse.json().catch(() => ({}));
      return new Response(JSON.stringify(errorData), {
        status: moonReponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const moonData = await moonReponse.json();

    const dailyWeather = forecastData.timelines.daily[0].values;

    const todayWeather = forecastData.timelines.minutely[0].values;

    // Build response data
    const today = {
      temperature: {
        now: todayWeather.temperature,
        apparent: todayWeather.temperatureApparent,
        min: dailyWeather.temperatureMin,
        max: dailyWeather.temperatureMax,
      },
      wind: {
        speed: todayWeather.windSpeed,
        direction: todayWeather.windDirection,
        gust: todayWeather.windGust,
      },
      uvIndex: {
        current: todayWeather.uvIndex,
        max: dailyWeather.uvIndexMax,
        min: dailyWeather.uvIndexMin,
        hourly: uvIndexData,
      },
      sunset: {
        rise: dailyWeather.sunriseTime,
        set: dailyWeather.sunsetTime,
      },
      moon: {
        phase: moonData[0].Phase,
        illumination: moonData[0].Illumination,
        rise: dailyWeather.moonriseTime,
        set: dailyWeather.moonsetTime,
      },
      dewPoint: todayWeather.dewPoint,
      humidity: todayWeather.humidity,
      precipitation: todayWeather.precipitationProbability,
      cloudCover: todayWeather.cloudCover,
      weatherCode: todayWeather.weatherCode,
    };

    return new Response(
      JSON.stringify({
        current: today,
        forecast: forecastData.timelines,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300", // Cache for 5 minutes
        },
      }
    );
  } catch (error) {
    console.error("Weather API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
