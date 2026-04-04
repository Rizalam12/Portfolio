import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md glass-card border-white/10">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-primary shrink-0" />
            <h1 className="text-2xl font-bold text-foreground">404 — Page not found</h1>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            This page doesn&apos;t exist. Head back to the portfolio.
          </p>
          <Button asChild className="mt-6">
            <a href="/">
              <Home className="mr-2 w-4 h-4" />
              Back to home
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
