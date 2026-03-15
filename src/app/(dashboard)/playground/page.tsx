
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Sparkles, 
  Code, 
  Type, 
  RefreshCw, 
  Copy, 
  Download, 
  Check, 
  Terminal,
  Eraser,
  Wand2,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateTextFromPrompt } from "@/ai/flows/generate-text-from-prompt";
import { generateCodeFromPrompt } from "@/ai/flows/generate-code-from-prompt";
import { rephraseExistingText } from "@/ai/flows/rephrase-existing-text";
import { summarizeExistingText } from "@/ai/flows/summarize-existing-text";

export default function PlaygroundPage() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("text");
  const [codeLanguage, setCodeLanguage] = useState("typescript");
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    });
  };

  const handleGenerateText = async () => {
    if (!prompt) return;
    setIsLoading(true);
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
    try {
      const result = await generateCodeFromPrompt({ prompt, language: codeLanguage });
      setOutput(result.code);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate code." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async (action: 'summarize' | 'rephrase') => {
    if (!prompt) return;
    setIsLoading(true);
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
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">AI Playground</h1>
          <p className="text-muted-foreground">Experiment with state-of-the-art AI generation tools.</p>
        </div>
        <Button variant="outline" size="sm" onClick={clear}>
          <Eraser className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Configuration & Prompt */}
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted/30">
              <TabsTrigger value="text" className="gap-2 data-[state=active]:lavender-glow">
                <Type className="h-4 w-4" /> Text
              </TabsTrigger>
              <TabsTrigger value="code" className="gap-2 data-[state=active]:blue-glow">
                <Code className="h-4 w-4" /> Code
              </TabsTrigger>
              <TabsTrigger value="refine" className="gap-2 data-[state=active]:lavender-glow">
                <RefreshCw className="h-4 w-4" /> Refine
              </TabsTrigger>
            </TabsList>

            <div className="mt-6 space-y-4">
              {activeTab === "code" && (
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={codeLanguage} onValueChange={setCodeLanguage}>
                    <SelectTrigger className="lavender-glow">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="rust">Rust</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="prompt">Prompt / Source Content</Label>
                <Textarea 
                  id="prompt"
                  placeholder={
                    activeTab === "text" ? "Describe the content you want to create..." :
                    activeTab === "code" ? "Describe the functionality you need..." :
                    "Paste text you want to refine, summarize or rephrase..."
                  }
                  className="min-h-[250px] resize-none lavender-glow focus-visible:ring-primary/50"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                {activeTab === "text" && (
                  <Button 
                    className="flex-1 bg-primary text-primary-foreground lavender-glow hover:bg-primary/90" 
                    onClick={handleGenerateText}
                    disabled={isLoading || !prompt}
                  >
                    {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Generate Text
                  </Button>
                )}
                {activeTab === "code" && (
                  <Button 
                    className="flex-1 bg-secondary text-secondary-foreground blue-glow hover:bg-secondary/90" 
                    onClick={handleGenerateCode}
                    disabled={isLoading || !prompt}
                  >
                    {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Terminal className="mr-2 h-4 w-4" />}
                    Write Code
                  </Button>
                )}
                {activeTab === "refine" && (
                  <>
                    <Button 
                      variant="outline"
                      className="flex-1 border-primary/50 hover:bg-primary/10" 
                      onClick={() => handleRefine('summarize')}
                      disabled={isLoading || !prompt}
                    >
                      <FileText className="mr-2 h-4 w-4 text-primary" />
                      Summarize
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1 border-secondary/50 hover:bg-secondary/10" 
                      onClick={() => handleRefine('rephrase')}
                      disabled={isLoading || !prompt}
                    >
                      <Wand2 className="mr-2 h-4 w-4 text-secondary" />
                      Rephrase
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Tabs>

          <Card className="bg-muted/10 border-dashed">
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">Tips & Hacks</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-2">
              <p>• Be specific about tone and audience for better text results.</p>
              <p>• For code, include edge cases or specific library requirements.</p>
              <p>• Try rephrasing generated content to match your brand's unique voice.</p>
            </CardContent>
          </Card>
        </div>

        {/* Right: Output */}
        <div className="space-y-4 lg:sticky lg:top-8">
          <Card className="min-h-[500px] flex flex-col lavender-glow bg-card/40 backdrop-blur-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-muted/20 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Output</span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy} disabled={!output}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled={!output}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-6 overflow-auto font-mono text-sm">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground animate-pulse space-y-4">
                  <Sparkles className="h-12 w-12 text-primary/30" />
                  <p>AI is thinking...</p>
                </div>
              ) : output ? (
                <div className="whitespace-pre-wrap leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {output}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground/40 space-y-4 text-center">
                  <div className="p-4 rounded-full bg-muted/20">
                    <Sparkles className="h-10 w-10" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground/50">Ready to Create</p>
                    <p className="text-xs max-w-[200px]">Generated content will appear here once you run a prompt.</p>
                  </div>
                </div>
              )}
            </CardContent>
            {output && (
              <CardFooter className="border-t border-border/50 bg-muted/10 py-3 px-6 flex justify-between">
                <span className="text-[10px] text-muted-foreground">Words: {output.split(/\s+/).length} | Chars: {output.length}</span>
                <Badge variant="outline" className="text-[10px] border-primary/20 text-primary">Model: Gemini 1.5 Flash</Badge>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
