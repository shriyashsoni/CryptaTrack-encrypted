"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Activity, Cpu, HardDrive, Network, Clock, AlertCircle, CheckCircle2 } from "lucide-react"

interface NodeStatus {
  offset: number
  status: "active" | "inactive" | "syncing"
  uptime: number
  computations: number
  rewards: number
  lastUpdate: Date
  cpuUsage: number
  memoryUsage: number
  peersConnected: number
}

export default function NodeOperatorDashboard() {
  const [nodeStatus, setNodeStatus] = useState<NodeStatus>({
    offset: 123456789,
    status: "active",
    uptime: 72,
    computations: 1247,
    rewards: 0.0,
    lastUpdate: new Date(),
    cpuUsage: 45,
    memoryUsage: 62,
    peersConnected: 8,
  })

  const performanceData = [
    { time: "00:00", computations: 0, success: 0 },
    { time: "04:00", computations: 120, success: 118 },
    { time: "08:00", computations: 280, success: 275 },
    { time: "12:00", computations: 450, success: 445 },
    { time: "16:00", computations: 620, success: 610 },
    { time: "20:00", computations: 1247, success: 1240 },
  ]

  const resourceData = [
    { metric: "CPU", usage: 45, limit: 100 },
    { metric: "Memory", usage: 62, limit: 100 },
    { metric: "Network", usage: 28, limit: 100 },
    { metric: "Storage", usage: 15, limit: 100 },
  ]

  const statusColor = {
    active: "bg-green-500/20 text-green-600 border-green-200",
    inactive: "bg-red-500/20 text-red-600 border-red-200",
    syncing: "bg-yellow-500/20 text-yellow-600 border-yellow-200",
  }

  const statusIcon = {
    active: <CheckCircle2 className="h-4 w-4" />,
    inactive: <AlertCircle className="h-4 w-4" />,
    syncing: <Activity className="h-4 w-4 animate-pulse" />,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Node Operator Dashboard</h1>
        <p className="text-muted-foreground mt-2">Monitor your ARX node performance and health</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Node Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full border ${statusColor[nodeStatus.status]}`}
              >
                {statusIcon[nodeStatus.status]}
                <span className="capitalize text-sm font-medium">{nodeStatus.status}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Offset: {nodeStatus.offset}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nodeStatus.uptime}h</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
              <Clock className="h-3 w-3" /> Continuous operation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Computations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nodeStatus.computations}</div>
            <p className="text-xs text-muted-foreground">Total completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Peers Connected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nodeStatus.peersConnected}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
              <Network className="h-3 w-3" /> Active connections
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Computation History</CardTitle>
              <CardDescription>Computations completed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="time" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="computations"
                    stroke="var(--accent)"
                    strokeWidth={2}
                    dot={{ fill: "var(--accent)", r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="success"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={{ fill: "var(--primary)", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Resources</CardTitle>
              <CardDescription>Current resource utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={resourceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" stroke="var(--muted-foreground)" />
                  <YAxis dataKey="metric" type="category" stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                    }}
                  />
                  <Bar dataKey="usage" fill="var(--accent)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resourceData.map((item) => (
              <Card key={item.metric}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{item.metric}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.usage}%</div>
                  <div className="w-full bg-secondary rounded-full h-2 mt-2">
                    <div className="bg-accent h-2 rounded-full transition-all" style={{ width: `${item.usage}%` }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Logs</CardTitle>
              <CardDescription>Node operation logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex gap-2 text-green-600">
                  <span>[2024-12-20 14:35:22]</span>
                  <span>Node started successfully - offset: {nodeStatus.offset}</span>
                </div>
                <div className="flex gap-2 text-accent">
                  <span>[2024-12-20 14:35:45]</span>
                  <span>Connected to 8 peers in cluster</span>
                </div>
                <div className="flex gap-2 text-accent">
                  <span>[2024-12-20 14:36:10]</span>
                  <span>Computation job received - id: 0x7a2f...</span>
                </div>
                <div className="flex gap-2 text-accent">
                  <span>[2024-12-20 14:36:55]</span>
                  <span>Computation completed successfully - result hash: 0x4b1c...</span>
                </div>
                <div className="flex gap-2 text-accent">
                  <span>[2024-12-20 14:38:22]</span>
                  <span>Periodic health check passed</span>
                </div>
                <div className="flex gap-2 text-yellow-600">
                  <span>[2024-12-20 14:39:15]</span>
                  <span>Memory usage at 62% - monitor closely</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common node operations</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button variant="outline" className="justify-start bg-transparent">
            <Activity className="h-4 w-4 mr-2" />
            View Logs
          </Button>
          <Button variant="outline" className="justify-start bg-transparent">
            <Cpu className="h-4 w-4 mr-2" />
            Check Health
          </Button>
          <Button variant="outline" className="justify-start bg-transparent">
            <Network className="h-4 w-4 mr-2" />
            Network Stats
          </Button>
          <Button variant="outline" className="justify-start bg-transparent">
            <HardDrive className="h-4 w-4 mr-2" />
            System Info
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
