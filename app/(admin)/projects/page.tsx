"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, Calendar, MapPin, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
const router = useRouter()
  return (
    <>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
          <p className="text-muted-foreground">
            Manage and monitor your construction projects
          </p>
        </div>

        {/* Project Card */}
        <Card className="max-w-3xl shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-muted rounded-lg">
                  <Building2 className="h-6 w-6 text-app-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl mb-1">
                    Bridge Construction
                  </CardTitle>
                  <CardDescription className="text-base">
                    Major infrastructure project
                  </CardDescription>
                </div>
              </div>
              <span className="px-3 py-1 bg-risk-low/10 text-risk-low rounded-full text-sm font-medium">
                Active
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-muted-foreground mr-1">Location:</span>
                <span className="text-foreground font-medium">
                  Downtown District
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-muted-foreground mr-1">Duration:</span>
                <span className="text-foreground font-medium">18 months</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Predict delays and optimize project timeline
              </div>
              <Button
                onClick={() => router.push("/predictive")}
                className="bg-app-primary hover:bg-app-primary/90"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Run Predictive Insights
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
