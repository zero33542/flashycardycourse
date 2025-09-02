import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            🎉 Next.js + shadcn/ui
          </h1>
          <p className="text-lg text-muted-foreground">
            Your project is now set up with beautiful, accessible components!
          </p>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Button Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Button Component</CardTitle>
              <CardDescription>
                Multiple variants and styles available
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button>Default Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
            </CardContent>
          </Card>

          {/* Input Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Input Component</CardTitle>
              <CardDescription>
                Styled form inputs ready to use
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Enter your name..." />
              <Input type="email" placeholder="Email address" />
              <Input type="password" placeholder="Password" />
            </CardContent>
          </Card>

          {/* Project Info */}
          <Card>
            <CardHeader>
              <CardTitle>FlashyCardyCourse</CardTitle>
              <CardDescription>
                Ready for flashcard development!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                ✅ Next.js 15 with App Router<br/>
                ✅ TypeScript configured<br/>
                ✅ Tailwind CSS setup<br/>
                ✅ shadcn/ui components<br/>
                ✅ ESLint configured
              </p>
              <Button className="w-full">Start Building</Button>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>
              Ready to build your flashcard course application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Add More Components:</h4>
                <code className="text-sm bg-muted p-2 rounded block">
                  npx shadcn@latest add dialog form table
                </code>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Available Components:</h4>
                <p className="text-sm text-muted-foreground">
                  Visit{" "}
                  <a 
                    href="https://ui.shadcn.com/docs/components" 
                    target="_blank" 
                    className="text-primary underline"
                  >
                    ui.shadcn.com
                  </a>{" "}
                  to explore all components
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
