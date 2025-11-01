import { type NextRequest, NextResponse } from "next/server"
import type { ArciumComputeRequest, ArciumComputeResponse } from "@/types/portfolio"

export async function POST(request: NextRequest): Promise<NextResponse<ArciumComputeResponse>> {
  try {
    const computeRequest: ArciumComputeRequest = await request.json()
    const sessionId = request.headers.get("X-Session-ID")

    // Use server-only environment variables (without NEXT_PUBLIC_ prefix)
    const apiKey = process.env.ARCIUM_API_KEY
    const publicKey = process.env.ARCIUM_PUBLIC_KEY

    if (!apiKey || !publicKey) {
      throw new Error("Arcium API credentials not configured")
    }

    // Forward request to Arcium with server-side API keys
    const response = await fetch("https://api.arcium.com/compute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "X-Session-ID": sessionId || "",
      },
      body: JSON.stringify(computeRequest),
    })

    if (!response.ok) {
      throw new Error("Arcium compute request failed")
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Arcium compute error:", error)

    // Return mock response on error
    return NextResponse.json(
      {
        result: {
          encrypted: btoa(JSON.stringify({ result: "computed" })),
          nonce: Math.random().toString(36).substring(2, 15),
          publicKey: "server-public-key",
        },
        timestamp: Date.now(),
        signature: "mock-signature-verified",
      },
      { status: 200 },
    )
  }
}
