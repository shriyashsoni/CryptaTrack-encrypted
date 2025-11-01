import { type NextRequest, NextResponse } from "next/server"

const ARCIUM_API_KEY = process.env.ARCIUM_API_KEY

export async function POST(request: NextRequest) {
  if (!ARCIUM_API_KEY) {
    return NextResponse.json({ error: "Missing Arcium credentials" }, { status: 500 })
  }

  try {
    const { initialValue, currentValue, encryptedMode } = await request.json()

    if (encryptedMode) {
      // Use Arcium for encrypted computation
      const response = await fetch("https://api.arcium.com/v1/compute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ARCIUM_API_KEY}`,
        },
        body: JSON.stringify({
          operation: "calculate_pnl",
          inputs: { initialValue, currentValue },
        }),
      })

      if (!response.ok) throw new Error("Arcium computation failed")
      return NextResponse.json(await response.json())
    } else {
      // Regular calculation
      const pnl = currentValue - initialValue
      const pnlPercent = (pnl / initialValue) * 100

      return NextResponse.json({
        pnl,
        pnlPercent,
        status: "calculated",
      })
    }
  } catch (error) {
    console.error("P&L calculation error:", error)
    return NextResponse.json({ error: "Calculation failed" }, { status: 500 })
  }
}
