import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function HueTextAreaPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-24 bg-background">
      <div className="w-full max-w-md space-y-4">
        <header className="text-center">
          <h1 className="text-3xl font-headline font-bold text-foreground">
            Hue Animated Textarea
          </h1>
          <p className="text-muted-foreground font-body">
            Experience a visually engaging textarea with dynamic effects.
          </p>
        </header>
        
        <div className="space-y-2">
          <Label 
            htmlFor="hue-textarea" 
            className="text-sm font-medium font-headline text-foreground"
          >
            Your Thoughts Here:
          </Label>
          <div className="glowing-textarea-wrapper rounded-md shadow-sm">
            <Textarea
              id="hue-textarea"
              placeholder="Type something beautiful..."
              className="w-full h-40 text-base font-body resize-none p-4 focus:ring-2 focus:ring-ring"
              aria-label="Hue animated textarea input field"
            />
          </div>
          <p className="text-xs text-muted-foreground font-body text-center pt-1">
            Hover over the textarea to activate the animated gradient glow.
          </p>
        </div>

        <footer className="text-center pt-4">
            <p className="text-xs text-muted-foreground font-body">
                Crafted with Shadcn UI & Tailwind CSS.
            </p>
        </footer>
      </div>
    </main>
  );
}
