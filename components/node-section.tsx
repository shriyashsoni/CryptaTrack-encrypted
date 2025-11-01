"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NodeSetupGuide from "./node-setup-guide"
import NodeConfigGenerator from "./node-config-generator"
import NodeSetupChecklist from "./node-setup-checklist"
import NodeOperatorDashboard from "./node-operator-dashboard"
import DockerDeploymentGuide from "./docker-deployment-guide"

export default function NodeSection() {
  return (
    <Tabs defaultValue="guide" className="w-full">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
        <TabsTrigger value="guide">Setup Guide</TabsTrigger>
        <TabsTrigger value="config">Config Generator</TabsTrigger>
        <TabsTrigger value="checklist">Checklist</TabsTrigger>
        <TabsTrigger value="docker">Docker Deploy</TabsTrigger>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
      </TabsList>

      <TabsContent value="guide" className="mt-6">
        <NodeSetupGuide />
      </TabsContent>

      <TabsContent value="config" className="mt-6">
        <NodeConfigGenerator />
      </TabsContent>

      <TabsContent value="checklist" className="mt-6">
        <NodeSetupChecklist />
      </TabsContent>

      <TabsContent value="docker" className="mt-6">
        <DockerDeploymentGuide />
      </TabsContent>

      <TabsContent value="dashboard" className="mt-6">
        <NodeOperatorDashboard />
      </TabsContent>
    </Tabs>
  )
}
