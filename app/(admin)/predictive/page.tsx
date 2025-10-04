"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Rocket } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Stage {
  id: string;
  name: string;
  duration: string;
  unit: string;
  startDate: string;
  risks: string[];
}

const stageOptions = [
  "Planning",
  "Procurement",
  "Delivery",
  "Foundation",
  "Structural Work",
  "Finishing",
  "Testing & Commissioning"
];

const riskFactors = [
  "Complicated Design",
  "Bad Ground Conditions",
  "Resource Shortages",
  "Regulatory Approvals",
  "Supplier Delays",
  "Weather Risks"
];

export default function PredictiveInsights() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("Bridge Construction");
  const [stages, setStages] = useState<Stage[]>([
    {
      id: "1",
      name: "Planning",
      duration: "3",
      unit: "months",
      startDate: "2025-01-01",
      risks: []
    }
  ]);

  const addStage = () => {
    const newStage: Stage = {
      id: Date.now().toString(),
      name: "",
      duration: "",
      unit: "months",
      startDate: "",
      risks: []
    };
    setStages([...stages, newStage]);
  };

  const removeStage = (id: string) => {
    if (stages.length === 1) {
      toast.error("At least one stage is required");
      return;
    }
    setStages(stages.filter(s => s.id !== id));
  };

  const updateStage = (id: string, field: keyof Stage, value: any) => {
    setStages(stages.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const toggleRisk = (stageId: string, risk: string) => {
    setStages(stages.map(s => {
      if (s.id === stageId) {
        const risks = s.risks.includes(risk)
          ? s.risks.filter(r => r !== risk)
          : [...s.risks, risk];
        return { ...s, risks };
      }
      return s;
    }));
  };

  const runPrediction = () => {
    if (!projectName.trim()) {
      toast.error("Please enter a project name");
      return;
    }

    const invalidStage = stages.find(s => !s.name || !s.duration || !s.startDate);
    if (invalidStage) {
      toast.error("Please complete all stage details");
      return;
    }

    // Navigate to results with stage data
    const params = new URLSearchParams({
      projectName,
      stages: JSON.stringify(stages)
    });
    router.push(`/results?${params.toString()}`);
  };

  return (
    <>
      <div className="p-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Predictive Insights – Scenario Setup</h1>
          <p className="text-muted-foreground">Configure project stages and risk factors to predict potential delays</p>
        </div>

        {/* Project Name */}
        <Card className="mb-6 shadow-md">
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                className="max-w-md"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stages */}
        <Card className="mb-6 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Stage Details</CardTitle>
                <CardDescription>Define each project stage with duration and risk factors</CardDescription>
              </div>
              <Button onClick={addStage} variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Stage
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {stages.map((stage, index) => (
              <div key={stage.id} className="p-4 border rounded-lg bg-muted/30 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Stage {index + 1}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStage(stage.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Stage Name</Label>
                    <Select value={stage.name} onValueChange={(value) => updateStage(stage.id, "name", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        {stageOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={stage.startDate}
                      onChange={(e) => updateStage(stage.id, "startDate", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Planned Duration</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        min="1"
                        value={stage.duration}
                        onChange={(e) => updateStage(stage.id, "duration", e.target.value)}
                        placeholder="Duration"
                        className="flex-1"
                      />
                      <Select value={stage.unit} onValueChange={(value) => updateStage(stage.id, "unit", value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover z-50">
                          <SelectItem value="weeks">weeks</SelectItem>
                          <SelectItem value="months">months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Risk Factors</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {riskFactors.map(risk => (
                      <div key={risk} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${stage.id}-${risk}`}
                          checked={stage.risks.includes(risk)}
                          onCheckedChange={() => toggleRisk(stage.id, risk)}
                        />
                        <Label
                          htmlFor={`${stage.id}-${risk}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {risk}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Run Button */}
        <div className="flex justify-end">
          <Button onClick={runPrediction} size="lg" className="bg-app-primary hover:bg-app-primary/90">
            <Rocket className="mr-2 h-5 w-5" />
            Run Prediction
          </Button>
        </div>
      </div>
    </>
  );
}
