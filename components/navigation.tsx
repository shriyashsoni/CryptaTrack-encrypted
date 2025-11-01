"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { CryptaTrackLogo } from "@/components/cryptatrack-logo"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <CryptaTrackLogo />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition">
              About
            </Link>
            <Link href="/whitepaper" className="text-muted-foreground hover:text-foreground transition">
              Whitepaper
            </Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition">
              Dashboard
            </Link>
            <Link href="/nodes">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <Link href="/about" className="block px-4 py-2 hover:bg-card rounded">
              About
            </Link>
            <Link href="/whitepaper" className="block px-4 py-2 hover:bg-card rounded">
              Whitepaper
            </Link>
            <Link href="/dashboard" className="block px-4 py-2 hover:bg-card rounded">
              Dashboard
            </Link>
            <Link href="/nodes" className="block px-4 py-2">
              <Button size="sm" className="w-full bg-primary">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
