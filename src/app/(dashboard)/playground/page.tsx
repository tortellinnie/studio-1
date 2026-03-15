"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Sparkles, 
  Code, 
  Type, 
  RefreshCw, 
  Copy, 
  Download, 
  Terminal,
  Eraser,
  Wand2,
  FileText,
  Languages,
  Image as ImageIcon,
  Settings2,
  Share2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateTextFromPrompt } from "@/ai/flows/generate-text-from-prompt";
import { generateCodeFromPrompt } from "@/ai/flows/generate-code-from-prompt";
import { rephraseExistingText } from "@/ai/flows/rephrase-existing-text";
import { summarizeExistingText } from "@/ai/flows/summarize-existing-text";
import { translateText } from "@/ai/flows/translate-text";
import { generateImage } from "@/ai/flows/generate-image";
import Image from "next/image";

export default function PlaygroundPage() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("text");
  const [codeLanguage, setCodeLanguage] = useState("typescript");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [temperature, setTemperature] = useState([0.7]);
  const { toast } = useToast();

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({ title: "Copied!", description: "Text copied to clipboard." });
    }
  };

  const handleGenerateText = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setGeneratedImageUrl(null);
    try {
      const result = await generateTextFromPrompt({ prompt });
      setOutput(result.generatedText);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate text." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCode = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setGeneratedImageUrl(null);
    try {
      const result = await generateCodeFromPrompt({ prompt, language: codeLanguage });
      setOutput(result.code);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate code." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslate = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setGeneratedImageUrl(null);
    try {
      const result = await translateText({ text: prompt, targetLanguage: targetLang });
      setOutput(result.translatedText);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to translate text." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setOutput("");
    try {
      const result = await generateImage({ prompt });
      setGeneratedImageUrl(result.imageUrl);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate image." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async (action: 'summarize' | 'rephrase') => {
    if (!prompt) return;
    setIsLoading(true);
    setGeneratedImageUrl(null);
    try {
      if (action === 'summarize') {
        const result = await summarizeExistingText({ text: prompt });
        setOutput(result.summary);
      } else {
        const result = await rephraseExistingText({ text: prompt, styleTone: "professional and modern" });
        setOutput(result.rephrasedText);
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: `Failed to ${action} text.` });
    } finally {
      setIsLoading(false);
    }
  };

  const clear = () => {
    setPrompt("");
    setOutput("");
    setGeneratedImageUrl(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">AI Hub Playground</h1>
          <p className="text-muted-foreground">The ultimate creative suite powered by Gemini 1.5 & Imagen 4.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={clear}>
            <Eraser className="mr-2 h-4 w-4" />
            Clear
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Configuration & Prompt (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-muted/30 p-1 h-12">
              <TabsTrigger value="text" className="gap-2"><Type className="h-4 w-4" /> Text</TabsTrigger>
              <TabsTrigger value="code" className="gap-2"><Code className="h-4 w-4" /> Code</TabsTrigger>
              <TabsTrigger value="image" className="gap-2"><ImageIcon className="h-4 w-4" /> Image</TabsTrigger>
              <TabsTrigger value="translate" className="gap-2"><Languages className="h-4 w-4" /> Translate</TabsTrigger>
              <TabsTrigger value="refine" className="gap-2"><RefreshCw className="h-4 w-4" /> Refine</TabsTrigger>
            </TabsList>

            <div className="mt-6 space-y-6">
              {/* Contextual Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeTab === "code" && (
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">Target Language</Label>
                    <Select value={codeLanguage} onValueChange={setCodeLanguage}>
                      <SelectTrigger className="lavender-glow"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="rust">Rust</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {activeTab === "translate" && (
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">Translate To</Label>
                    <Select value={targetLang} onValueChange={setTargetLang}>
                      <SelectTrigger className="lavender-glow"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="Japanese">Japanese</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">Creativity (Temp)</Label>
                    <span className="text-xs font-mono">{temperature[0]}</span>
                  </div>
                  <Slider value={temperature} onValueChange={setTemperature} max={1} step={0.1} className="py-2" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-xs font-semibold uppercase text-muted-foreground">Your Instructions</Label>
                <Textarea 
                  id="prompt"
                  placeholder={
                    activeTab === "text" ? "Write a blog post about..." :
                    activeTab === "code" ? "Create a function to..." :
                    activeTab === "image" ? "A futuristic neon city with..." :
                    activeTab === "translate" ? "Enter text to translate..." :
                    "Paste content to refine..."
                  }
                  className="min-h-[300px] resize-none lavender-glow text-lg font-light leading-relaxed"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                {activeTab === "text" && (
                  <Button className="flex-1 h-12 text-lg lavender-glow" onClick={handleGenerateText} disabled={isLoading || !prompt}>
                    {isLoading ? <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
                    Generate Text
                  </Button>
                )}
                {activeTab === "code" && (
                  <Button className="flex-1 h-12 text-lg blue-glow bg-secondary" onClick={handleGenerateCode} disabled={isLoading || !prompt}>
                    {isLoading ? <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> : <Terminal className="mr-2 h-5 w-5" />}
                    Write Code
                  </Button>
                )}
                {activeTab === "image" && (
                  <Button className="flex-1 h-12 text-lg lavender-glow" onClick={handleGenerateImage} disabled={isLoading || !prompt}>
                    {isLoading ? <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> : <ImageIcon className="mr-2 h-5 w-5" />}
                    Generate Image
                  </Button>
                )}
                {activeTab === "translate" && (
                  <Button className="flex-1 h-12 text-lg lavender-glow" onClick={handleTranslate} disabled={isLoading || !prompt}>
                    {isLoading ? <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> : <Languages className="mr-2 h-5 w-5" />}
                    Translate
                  </Button>
                )}
                {activeTab === "refine" && (
                  <div className="flex-1 flex gap-2">
                    <Button variant="outline" className="flex-1 h-12" onClick={() => handleRefine('summarize')} disabled={isLoading || !prompt}>
                      <FileText className="mr-2 h-5 w-5" /> Summarize
                    </Button>
                    <Button variant="outline" className="flex-1 h-12" onClick={() => handleRefine('rephrase')} disabled={isLoading || !prompt}>
                      <Wand2 className="mr-2 h-5 w-5" /> Rephrase
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Tabs>
        </div>

        {/* Right: Output (5 cols) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-8">
          <Card className="min-h-[600px] flex flex-col border-white/5 bg-card/40 backdrop-blur-xl overflow-hidden shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/5 py-4 px-6">
              <div className="flex items-center gap-3">
                <Settings2 className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Output Preview</span>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy} disabled={!output}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled={!output && !generatedImageUrl}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-8 overflow-auto">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                  <p className="text-sm font-medium animate-pulse text-primary">Synthesizing Request...</p>
                </div>
              ) : generatedImageUrl ? (
                <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
                  <Image src={generatedImageUrl} fill alt="Generated content" className="object-cover" />
                </div>
              ) : output ? (
                <div className="whitespace-pre-wrap font-sans text-lg leading-relaxed text-foreground/90 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {output}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground/30 space-y-6 text-center">
                  <div className="p-6 rounded-full bg-white/5 border border-white/5">
                    <Sparkles className="h-16 w-16" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-foreground/40">Ready for Action</p>
                    <p className="text-sm max-w-[240px]">Select a task and click generate to witness the magic.</p>
                  </div>
                </div>
              )}
            </CardContent>
            {(output || generatedImageUrl) && (
              <CardFooter className="border-t border-white/5 bg-white/5 py-4 px-8 flex justify-between items-center">
                <div className="flex gap-4 text-[10px] text-muted-foreground/60 uppercase font-bold tracking-tighter">
                  {output && <span>{output.split(/\s+/).length} Words</span>}
                  <span>LATENCY: 1.4s</span>
                </div>
                <Badge variant="outline" className="text-[10px] bg-primary/10 border-primary/20 text-primary font-bold">GEMINI 1.5 PRO</Badge>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
