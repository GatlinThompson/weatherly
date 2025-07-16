export async function GET(req: Request): Promise<Response> {
  try {
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

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "accept-encoding": "deflate, gzip, br",
      },
    };

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

    const uvIndexData = forecastData.timelines.hourly
      .slice(0, 24)
      .map((item: { time: string; values: { uvIndex: number } }) => {
        return {
          time: item.time,
          uvIndex: item.values.uvIndex,
        };
      });

    const dailyWeather = forecastData.timelines.daily[0].values;

    const todayWeather = forecastData.timelines.minutely[0].values;

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
