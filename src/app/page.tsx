
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Zap, Shield, Rocket, ChevronRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === "gen-1");

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg shadow-lg lavender-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-headline tracking-tight">GenAI Studio</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
            <Link href="/overview">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground lavender-glow">
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-1000">
                <Zap className="h-3 w-3" />
                <span>Next-Generation Content Creation</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold font-headline leading-tight tracking-tighter">
                Crafting the future with <span className="text-primary italic">Intelligence</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                The most advanced AI dashboard for modern teams. Generate high-quality text, code, and images with the power of Gemini 1.5.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/overview">
                  <Button size="lg" className="h-12 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground lavender-glow font-semibold group">
                    Get Started Free
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg border-white/10 hover:bg-white/5 font-semibold">
                  View Demo
                </Button>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground pt-4">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> No card required</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Free credits included</div>
              </div>
            </div>

            <div className="relative group perspective-1000 hidden lg:block">
              <div className="relative z-10 rounded-2xl border border-white/10 overflow-hidden shadow-2xl lavender-glow transform rotate-y-[-5deg] rotate-x-[5deg] group-hover:rotate-0 transition-transform duration-700">
                <Image 
                  src={heroImage?.imageUrl || "https://picsum.photos/seed/hero/800/600"} 
                  width={800} 
                  height={600} 
                  alt="Hero Visualization" 
                  className="w-full object-cover"
                  data-ai-hint="abstract ai"
                />
              </div>
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full z-0 opacity-50"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-card/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold font-headline">Enterprise-Grade Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to integrate advanced AI into your workflow safely and efficiently.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Rapid Generation", 
                  desc: "Blazing fast response times powered by Google's latest infrastructure.", 
                  icon: Zap, 
                  color: "text-amber-400" 
                },
                { 
                  title: "Secure & Compliant", 
                  desc: "Enterprise-level security ensuring your prompts and data stay private.", 
                  icon: Shield, 
                  color: "text-blue-400" 
                },
                { 
                  title: "Built for Scale", 
                  desc: "Easily manage thousands of generations with robust history and analytics.", 
                  icon: Rocket, 
                  color: "text-primary" 
                },
              ].map((feature, i) => (
                <div key={i} className="p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-all group">
                  <div className={`p-3 rounded-lg bg-white/5 w-fit mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-bold">GenAI Studio</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary">Terms</Link>
            <Link href="#" className="hover:text-primary">Privacy</Link>
            <Link href="#" className="hover:text-primary">Contact</Link>
          </div>
          <p className="text-xs text-muted-foreground/60">© 2024 GenAI Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
