import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Replace with your actual GitHub raw JSON URL for image models
  const res = await fetch("https://raw.githubusercontent.com/placeholder-user/placeholder-repo/main/image-models.json", {
    cache: "no-store", // Ensure fresh data on each request
  });

   if (!res.ok) {
    // Handle HTTP errors
    return new NextResponse(`Failed to fetch data from GitHub: ${res.status} ${res.statusText}`, { status: res.status });
  }

  try {
    const models = await res.json();
    return NextResponse.json(models);
  } catch (error) {
    // Handle JSON parsing errors
    console.error("Error parsing JSON from GitHub:", error);
    return new NextResponse("Failed to parse JSON data from GitHub.", { status: 500 });
  }
} 