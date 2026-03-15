'use server';
/**
 * @fileOverview A Genkit flow for generating text content based on a user prompt.
 *
 * - generateTextFromPrompt - A function that handles the text generation process.
 * - GenerateTextFromPromptInput - The input type for the generateTextFromPrompt function.
 * - GenerateTextFromPromptOutput - The return type for the generateTextFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTextFromPromptInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate content from.'),
});
export type GenerateTextFromPromptInput = z.infer<typeof GenerateTextFromPromptInputSchema>;

const GenerateTextFromPromptOutputSchema = z.object({
  generatedText: z.string().describe('The AI-generated text content.'),
});
export type GenerateTextFromPromptOutput = z.infer<typeof GenerateTextFromPromptOutputSchema>;

export async function generateTextFromPrompt(
  input: GenerateTextFromPromptInput
): Promise<GenerateTextFromPromptOutput> {
  return generateTextFromPromptFlow(input);
}

const generateTextPrompt = ai.definePrompt({
  name: 'generateTextPrompt',
  input: {schema: GenerateTextFromPromptInputSchema},
  output: {schema: GenerateTextFromPromptOutputSchema},
  prompt: `You are a helpful AI assistant that generates text content based on user prompts.\nPlease generate text content based on the following prompt:\n\nPrompt: {{{prompt}}}\n\nEnsure the output is well-structured and directly answers the user's request.`,
});

const generateTextFromPromptFlow = ai.defineFlow(
  {
    name: 'generateTextFromPromptFlow',
    inputSchema: GenerateTextFromPromptInputSchema,
    outputSchema: GenerateTextFromPromptOutputSchema,
  },
  async (input) => {
    const {output} = await generateTextPrompt(input);
    if (!output) {
      throw new Error('Failed to generate text content.');
    }
    return output;
  }
);
