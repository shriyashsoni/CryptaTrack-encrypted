"use client"

export function PoweredByBadge() {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm text-muted-foreground">Powered by</span>
      <div className="flex items-center gap-2">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Solana_logo-DzylnaWIYunJ7ZEGVh1eaYJ4JZmMhM.png"
          alt="Solana Logo"
          className="h-5 w-5 object-contain"
        />
        <span className="text-sm font-semibold text-accent">Solana</span>
      </div>
      <span className="text-sm text-muted-foreground">&</span>
      <div className="flex items-center gap-2">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ab-jKieRhlK681cfOFZREIItd6bVPiHL2.jpg"
          alt="Arcium Logo"
          className="h-5 w-5 object-contain rounded"
        />
        <span className="text-sm font-semibold text-primary">Arcium</span>
      </div>
    </div>
  )
}
