export async function GET(): Promise<Response> {
  return new Response(
    JSON.stringify({
      message: "Weather API is running",
      timestamp: new Date().toISOString(),
      status: "healthy",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
