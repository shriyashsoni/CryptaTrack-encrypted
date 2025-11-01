import { NextResponse } from "next/server"
import type { ArciumMetrics } from "@/lib/arcium-monitor"

export async function GET(): Promise<NextResponse<ArciumMetrics>> {
  try {
    const apiKey = process.env.ARCIUM_API_KEY

    if (!apiKey) {
      throw new Error("Arcium API credentials not configured")
    }

    // Forward health check to Arcium with server-side API key
    const response = await fetch("https://api.arcium.com/health", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        {
          mpcNodes: 0,
          activeConnections: 0,
          fheOperationsCount: 0,
          averageComputeTime: 0,
          encryptionType: "Hybrid",
          networkHealth: "offline",
        },
        { status: 200 },
      )
    }

    const data = await response.json()

    return NextResponse.json({
      mpcNodes: data.nodeCount || 0,
      activeConnections: data.connections || 0,
      fheOperationsCount: data.operations || 0,
      averageComputeTime: data.avgComputeTime || 0,
      encryptionType: data.encryptionType || "Hybrid",
      networkHealth: data.status === "healthy" ? "healthy" : "degraded",
    })
  } catch (error) {
    console.error("Arcium health check error:", error)

    return NextResponse.json(
      {
        mpcNodes: 0,
        activeConnections: 0,
        fheOperationsCount: 0,
        averageComputeTime: 0,
        encryptionType: "Hybrid",
        networkHealth: "offline",
      },
      { status: 200 },
    )
  }
}
