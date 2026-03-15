'use server';
/**
 * @fileOverview A Genkit flow for generating code snippets based on a natural language prompt and a specified programming language.
 *
 * - generateCodeFromPrompt - A function that handles the code generation process.
 * - GenerateCodeFromPromptInput - The input type for the generateCodeFromPrompt function.
 * - GenerateCodeFromPromptOutput - The return type for the generateCodeFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodeFromPromptInputSchema = z.object({
  prompt: z
    .string()
    .describe('The natural language prompt describing the desired code snippet.'),
  language: z.string().describe('The programming language for the code snippet.'),
});
export type GenerateCodeFromPromptInput = z.infer<
  typeof GenerateCodeFromPromptInputSchema
>;

const GenerateCodeFromPromptOutputSchema = z.object({
  code: z.string().describe('The generated code snippet.'),
});
export type GenerateCodeFromPromptOutput = z.infer<
  typeof GenerateCodeFromPromptOutputSchema
>;

export async function generateCodeFromPrompt(
  input: GenerateCodeFromPromptInput
): Promise<GenerateCodeFromPromptOutput> {
  return generateCodeFromPromptFlow(input);
}

const codeGenerationPrompt = ai.definePrompt({
  name: 'codeGenerationPrompt',
  input: {schema: GenerateCodeFromPromptInputSchema},
  output: {schema: GenerateCodeFromPromptOutputSchema},
  prompt: `You are an expert code generator. Your task is to write a code snippet in the specified programming language that fulfills the user's request. Only output the code and nothing else, unless the user explicitly asks for explanations.

Programming Language: {{{language}}}
User Request: {{{prompt}}}`,
});

const generateCodeFromPromptFlow = ai.defineFlow(
  {
    name: 'generateCodeFromPromptFlow',
    inputSchema: GenerateCodeFromPromptInputSchema,
    outputSchema: GenerateCodeFromPromptOutputSchema,
  },
  async input => {
    const {output} = await codeGenerationPrompt(input);
    return output!;
  }
);
