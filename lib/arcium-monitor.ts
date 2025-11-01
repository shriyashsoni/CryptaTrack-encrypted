"use client"

/**
 * Arcium Network Monitor
 * Tracks MPC network health, encryption status, and compute metrics
 */

export interface ArciumMetrics {
  mpcNodes: number
  activeConnections: number
  fheOperationsCount: number
  averageComputeTime: number
  encryptionType: "MPC" | "FHE" | "Hybrid"
  networkHealth: "healthy" | "degraded" | "offline"
}

export interface ComputeSession {
  sessionId: string
  startTime: number
  endTime?: number
  operationCount: number
  totalDataSize: number
  status: "active" | "completed" | "failed"
}

class ArciumMonitor {
  private metrics: ArciumMetrics = {
    mpcNodes: 0,
    activeConnections: 0,
    fheOperationsCount: 0,
    averageComputeTime: 0,
    encryptionType: "Hybrid",
    networkHealth: "offline",
  }

  private sessions: Map<string, ComputeSession> = new Map()

  /**
   * Get current network metrics
   */
  getMetrics(): ArciumMetrics {
    return { ...this.metrics }
  }

  /**
   * Check network health via server endpoint
   */
  async checkNetworkHealth(): Promise<ArciumMetrics> {
    try {
      const response = await fetch("/api/arcium/health", {
        method: "GET",
      })

      if (!response.ok) {
        this.metrics.networkHealth = "offline"
        return this.metrics
      }

      const data = await response.json()

      this.metrics = {
        mpcNodes: data.nodeCount || 0,
        activeConnections: data.connections || 0,
        fheOperationsCount: data.operations || 0,
        averageComputeTime: data.avgComputeTime || 0,
        encryptionType: data.encryptionType || "Hybrid",
        networkHealth: data.status === "healthy" ? "healthy" : "degraded",
      }

      return this.metrics
    } catch (error) {
      console.error("Error checking network health:", error)
      this.metrics.networkHealth = "offline"
      return this.metrics
    }
  }

  /**
   * Create a new compute session
   */
  createSession(sessionId: string): ComputeSession {
    const session: ComputeSession = {
      sessionId,
      startTime: Date.now(),
      operationCount: 0,
      totalDataSize: 0,
      status: "active",
    }

    this.sessions.set(sessionId, session)
    return session
  }

  /**
   * End compute session
   */
  endSession(sessionId: string, success = true): ComputeSession | null {
    const session = this.sessions.get(sessionId)

    if (session) {
      session.endTime = Date.now()
      session.status = success ? "completed" : "failed"
    }

    return session || null
  }

  /**
   * Get session details
   */
  getSession(sessionId: string): ComputeSession | null {
    return this.sessions.get(sessionId) || null
  }

  /**
   * Track operation in session
   */
  trackOperation(sessionId: string, dataSize: number): boolean {
    const session = this.sessions.get(sessionId)

    if (!session) return false

    session.operationCount++
    session.totalDataSize += dataSize

    return true
  }
}

export const arciumMonitor = new ArciumMonitor()
