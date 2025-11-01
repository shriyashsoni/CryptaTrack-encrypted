import { type NextRequest, NextResponse } from "next/server"

const ARCIUM_API_KEY = process.env.ARCIUM_API_KEY
const ARCIUM_PUBLIC_KEY = process.env.ARCIUM_PUBLIC_KEY

export async function POST(request: NextRequest) {
  if (!ARCIUM_API_KEY || !ARCIUM_PUBLIC_KEY) {
    return NextResponse.json({ error: "Missing Arcium credentials" }, { status: 500 })
  }

  try {
    const { data } = await request.json()

    // Call Arcium API to encrypt data
    const response = await fetch("https://api.arcium.com/v1/encrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ARCIUM_API_KEY}`,
      },
      body: JSON.stringify({
        publicKey: ARCIUM_PUBLIC_KEY,
        data,
      }),
    })

    if (!response.ok) {
      throw new Error(`Arcium API error: ${response.statusText}`)
    }

    const encrypted = await response.json()
    return NextResponse.json(encrypted)
  } catch (error) {
    console.error("Encryption error:", error)
    return NextResponse.json({ error: "Encryption failed" }, { status: 500 })
  }
}
