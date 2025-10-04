"use client"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, RefreshCw, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface StageResult {
  stage: string;
  duration: string;
  risk: number;
  riskLevel: "low" | "medium" | "high";
  notes: string;
}

export default function Results() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<StageResult[]>([]);

  useEffect(() => {
    const stages = searchParams.get('stages');
    const projectName = searchParams.get('projectName');
    
    if (!stages) {
      router.push("/predictive");
      return;
    }

    // Simulate API call with loading
    setTimeout(() => {
      const parsedStages = JSON.parse(stages);
      
      // Generate mock results based on risk factors
      const mockResults: StageResult[] = parsedStages.map((stage: any) => {
        let riskPercentage = 20;
        const notes:any[] = [];

        if (stage.risks.includes("Complicated Design")) riskPercentage += 20;
        if (stage.risks.includes("Bad Ground Conditions")) riskPercentage += 15;
        if (stage.risks.includes("Resource Shortages")) riskPercentage += 15;
        if (stage.risks.includes("Regulatory Approvals")) riskPercentage += 25;
        if (stage.risks.includes("Supplier Delays")) riskPercentage += 20;
        if (stage.risks.includes("Weather Risks")) riskPercentage += 10;

        // Determine notes based on risks
        if (stage.risks.includes("Regulatory Approvals")) notes.push("Regulatory approvals");
        if (stage.risks.includes("Supplier Delays")) notes.push("Supplier delays");
        if (stage.risks.includes("Weather Risks")) notes.push("Weather risks");
        if (stage.risks.includes("Bad Ground Conditions")) notes.push("Ground conditions");

        const finalRisk = Math.min(riskPercentage, 85);
        const riskLevel = finalRisk >= 60 ? "high" : finalRisk >= 35 ? "medium" : "low";

        return {
          stage: stage.name,
          duration: `${stage.duration} ${stage.unit}`,
          risk: finalRisk,
          riskLevel,
          notes: notes.length > 0 ? notes.join(", ") : "Standard monitoring"
        };
      });

      setResults(mockResults);
      setLoading(false);
    }, 2000);
  }, [searchParams, router]);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "var(--color-red-600)";
      case "medium": return "var(--color-amber-500)";
      case "low": return "var(--color-green-600)";
      default: return "(var(--muted))";
    }
  };

  const getRiskEmoji = (level: string) => {
    switch (level) {
      case "high": return "🔴";
      case "medium": return "🟡";
      case "low": return "🟢";
      default: return "⚪";
    }
  };

  const insights = [
    "Add 1 month buffer to high-risk stages for schedule contingency",
    "Secure backup supplier contracts to mitigate procurement delays",
    "Engage regulatory consultants early in planning phase",
    "Implement weekly risk monitoring dashboards for active stages"
  ];

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-app-primary mx-auto" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Running Predictive Analysis...</h2>
              <p className="text-muted-foreground mt-2">Estimating probability of delay per stage</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="p-8 w-full">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Predictive Analysis Results</h1>
            <p className="text-muted-foreground">Risk assessment and recommendations for {searchParams.get('projectName') || 'Project'}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button onClick={() => router.push("/predictive")} className="bg-app-primary hover:bg-app-primary/90">
              <RefreshCw className="mr-2 h-4 w-4" />
              Run New Scenario
            </Button>
          </div>
        </div>

        {/* Results Table */}
        <Card className="mb-6 shadow-md">
          <CardHeader>
            <CardTitle>Stage Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Stage</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Duration</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Risk %</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">{result.stage}</td>
                      <td className="py-3 px-4 text-muted-foreground">{result.duration}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getRiskEmoji(result.riskLevel)}</span>
                          <span 
                            className="font-semibold"
                            style={{ color: getRiskColor(result.riskLevel) }}
                          >
                            {result.risk}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{result.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Risk Overview Chart */}
        <Card className="mb-6 shadow-md">
          <CardHeader>
            <CardTitle>Risk Overview Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={results}>
                  <CartesianGrid strokeDasharray="3 3" stroke="(var(--border))" />
                  <XAxis 
                    dataKey="stage" 
                    tick={{ fill: "(var(--muted-foreground))" }}
                    tickLine={{ stroke: "(var(--border))" }}
                  />
                  <YAxis 
                    tick={{ fill: "(var(--muted-foreground))" }}
                    tickLine={{ stroke: "(var(--border))" }}
                    label={{ value: "Risk %", angle: -90, position: "insideLeft", fill: "(var(--muted-foreground))" }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: "0.5rem"
                    }}
                  />
                  <Bar dataKey="risk" radius={[8, 8, 0, 0]}>
                    {results.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getRiskColor(entry.riskLevel)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {insights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-app-primary font-bold mr-3">→</span>
                  <span className="text-foreground">{insight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
