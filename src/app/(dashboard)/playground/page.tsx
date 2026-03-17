
"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
  Share2,
  Cpu,
  History,
  Save,
  Trash2,
  Maximize2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateTextFromPrompt } from "@/ai/flows/generate-text-from-prompt";
import { generateCodeFromPrompt } from "@/ai/flows/generate-code-from-prompt";
import { rephraseExistingText } from "@/ai/flows/rephrase-existing-text";
import { summarizeExistingText } from "@/ai/flows/summarize-existing-text";
import { translateText } from "@/ai/flows/translate-text";
import { generateImage } from "@/ai/flows/generate-image";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function PlaygroundPage() {
  const [isClient, setIsClient] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("You are a professional assistant designed to help with creative and technical tasks. Keep responses concise and factual.");
  const [userPrompt, setUserPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("text");
  const [codeLanguage, setCodeLanguage] = useState("typescript");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([2048]);
  const [topP, setTopP] = useState([1.0]);
  const [showSystemPrompt, setShowSystemPrompt] = useState(true);
  
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({ title: "Copied!", description: "Text copied to clipboard." });
    }
  };

  const handleGenerateText = async () => {
    if (!userPrompt) return;
    setIsLoading(true);
    setGeneratedImageUrl(null);
    try {
      const finalPrompt = showSystemPrompt ? `System: ${systemPrompt}\n\nUser: ${userPrompt}` : userPrompt;
      const result = await generateTextFromPrompt({ prompt: finalPrompt });
      setOutput(result.generatedText);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate text." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCode = async () => {
    if (!userPrompt) return;
    setIsLoading(true);
    setGeneratedImageUrl(null);
    try {
      const result = await generateCodeFromPrompt({ prompt: userPrompt, language: codeLanguage });
      setOutput(result.code);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate code." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslate = async () => {
    if (!userPrompt) return;
    setIsLoading(true);
    setGeneratedImageUrl(null);
    try {
      const result = await translateText({ text: userPrompt, targetLanguage: targetLang });
      setOutput(result.translatedText);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to translate text." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!userPrompt) return;
    setIsLoading(true);
    setOutput("");
    try {
      const result = await generateImage({ prompt: userPrompt });
      setGeneratedImageUrl(result.imageUrl);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate image." });
    } finally {
      setIsLoading(false);
    }
  };

  const clear = () => {
    setUserPrompt("");
    setOutput("");
    setGeneratedImageUrl(null);
  };

  if (!isClient) return null;

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500 p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-headline leading-tight">AI Playground</h1>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em]">Environment: Production v2.4</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 px-4 text-xs font-bold gap-2" onClick={() => toast({ title: "Draft Saved" })}>
            <Save className="h-3.5 w-3.5" /> Save Draft
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground" onClick={clear}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-muted/20 p-1 h-11 mb-6">
              <TabsTrigger value="text" className="gap-2 text-[10px] uppercase font-bold tracking-widest"><Type className="h-3 w-3" /> Text</TabsTrigger>
              <TabsTrigger value="code" className="gap-2 text-[10px] uppercase font-bold tracking-widest"><Code className="h-3 w-3" /> Code</TabsTrigger>
              <TabsTrigger value="image" className="gap-2 text-[10px] uppercase font-bold tracking-widest"><ImageIcon className="h-3 w-3" /> Image</TabsTrigger>
              <TabsTrigger value="translate" className="gap-2 text-[10px] uppercase font-bold tracking-widest"><Languages className="h-3 w-3" /> Translate</TabsTrigger>
              <TabsTrigger value="refine" className="gap-2 text-[10px] uppercase font-bold tracking-widest"><RefreshCw className="h-3 w-3" /> Refine</TabsTrigger>
            </TabsList>

            <Card className="border-border/50 bg-card/30 flex-1 flex flex-col overflow-hidden">
              <CardHeader className="py-4 px-6 border-b border-border/50 bg-muted/5 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Configuration & Prompt</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">System Mode</span>
                  <Switch checked={showSystemPrompt} onCheckedChange={setShowSystemPrompt} className="scale-75" />
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6 overflow-y-auto">
                {showSystemPrompt && (
                  <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">System Instructions</Label>
                    <Textarea 
                      placeholder="Define the behavior of the model..."
                      className="min-h-[80px] bg-muted/20 border-border/50 resize-none text-sm font-medium leading-relaxed"
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">User Instructions</Label>
                  <Textarea 
                    placeholder={
                      activeTab === "text" ? "Write a detailed product description for..." :
                      activeTab === "code" ? "Generate a React component for a..." :
                      activeTab === "image" ? "A futuristic neon cityscape at sunset..." :
                      "Paste your content here..."
                    }
                    className="min-h-[350px] bg-background border-none focus-visible:ring-0 text-lg font-light leading-relaxed p-0 resize-none"
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t border-border/50 bg-muted/5">
                <div className="flex w-full gap-4">
                   {activeTab === "text" && (
                    <Button className="flex-1 h-12 text-sm font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-white" onClick={handleGenerateText} disabled={isLoading || !userPrompt}>
                      {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                      Generate Analysis
                    </Button>
                  )}
                  {activeTab === "code" && (
                    <Button className="flex-1 h-12 text-sm font-bold uppercase tracking-widest bg-secondary hover:bg-secondary/90 shadow-xl shadow-secondary/20" onClick={handleGenerateCode} disabled={isLoading || !userPrompt}>
                      {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Terminal className="mr-2 h-4 w-4" />}
                      Execute Production Code
                    </Button>
                  )}
                  {activeTab === "image" && (
                    <Button className="flex-1 h-12 text-sm font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-white" onClick={handleGenerateImage} disabled={isLoading || !userPrompt}>
                      {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <ImageIcon className="mr-2 h-4 w-4" />}
                      Synthesize Image
                    </Button>
                  )}
                  {(activeTab === "translate" || activeTab === "refine") && (
                    <Button className="flex-1 h-12 text-sm font-bold uppercase tracking-widest bg-muted/30 border-border/50 hover:bg-muted/50" onClick={activeTab === "translate" ? handleTranslate : handleGenerateText} disabled={isLoading || !userPrompt}>
                      {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                      Process Content
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </Tabs>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="border-border/50 bg-card/30">
            <CardHeader className="py-4 border-b border-border/50 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Settings2 className="h-3.5 w-3.5" />
                Hyperparameters
              </CardTitle>
              <Badge variant="outline" className="text-[9px] font-bold border-primary/30 text-primary">ADVANCED</Badge>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">AI Model</Label>
                  <span className="text-[9px] font-mono text-primary font-bold">GEMINI 1.5 PRO</span>
                </div>
                <Select defaultValue="gemini-pro">
                  <SelectTrigger className="bg-muted/30 border-border/50 h-9 text-xs font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gemini-pro">Gemini 1.5 Pro</SelectItem>
                    <SelectItem value="gemini-flash">Gemini 1.5 Flash</SelectItem>
                    <SelectItem value="imagen-4">Imagen 4 Fast</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {activeTab === "code" && (
                <div className="space-y-4">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Language Output</Label>
                  <Select value={codeLanguage} onValueChange={setCodeLanguage}>
                    <SelectTrigger className="bg-muted/30 border-border/50 h-9 text-xs font-semibold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="rust">Rust</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                    <span className="text-muted-foreground">Temperature</span>
                    <span className="text-primary font-mono">{temperature[0]}</span>
                  </div>
                  <Slider value={temperature} onValueChange={setTemperature} max={1} step={0.1} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                    <span className="text-muted-foreground">Max Tokens</span>
                    <span className="text-primary font-mono">{maxTokens[0]}</span>
                  </div>
                  <Slider value={maxTokens} onValueChange={setMaxTokens} min={1} max={4096} step={1} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                    <span className="text-muted-foreground">Top P</span>
                    <span className="text-primary font-mono">{topP[0]}</span>
                  </div>
                  <Slider value={topP} onValueChange={setTopP} max={1} step={0.01} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/30 flex-1 flex flex-col min-h-[400px]">
            <CardHeader className="py-4 border-b border-border/50 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <History className="h-3.5 w-3.5" />
                Inference Preview
              </CardTitle>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={handleCopy} disabled={!output}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" disabled={!output && !generatedImageUrl}>
                  <Download className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                  <Maximize2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto flex-1 bg-background/20 font-sans text-sm leading-relaxed">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="h-10 w-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary animate-pulse">Computing Inference...</p>
                </div>
              ) : generatedImageUrl ? (
                <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-border/50 shadow-2xl animate-in zoom-in-95 duration-500">
                  <Image src={generatedImageUrl} fill alt="Inference output" className="object-cover" />
                </div>
              ) : output ? (
                <div className="whitespace-pre-wrap text-foreground/90 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {output}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-30">
                  <Sparkles className="h-10 w-10" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Awaiting Command</p>
                </div>
              )}
            </CardContent>
            {(output || generatedImageUrl) && (
              <CardFooter className="p-3 border-t border-border/50 bg-muted/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase">Tokens: {output?.length || 0}</span>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase">Latency: 1.2s</span>
                </div>
                <Badge variant="secondary" className="text-[8px] h-4 font-bold uppercase tracking-tighter">Gemini 1.5 Pro</Badge>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
