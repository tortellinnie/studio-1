'use server';
/**
 * @fileOverview A Genkit flow for summarizing long pieces of text.
 *
 * - summarizeExistingText - A function that handles the text summarization process.
 * - SummarizeExistingTextInput - The input type for the summarizeExistingText function.
 * - SummarizeExistingTextOutput - The return type for the summarizeExistingText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeExistingTextInputSchema = z.object({
  text: z.string().describe('The long piece of text to be summarized.'),
});
export type SummarizeExistingTextInput = z.infer<
  typeof SummarizeExistingTextInputSchema
>;

const SummarizeExistingTextOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the key points of the text.'),
});
export type SummarizeExistingTextOutput = z.infer<
  typeof SummarizeExistingTextOutputSchema
>;

export async function summarizeExistingText(
  input: SummarizeExistingTextInput
): Promise<SummarizeExistingTextOutput> {
  return summarizeExistingTextFlow(input);
}

const summarizePrompt = ai.definePrompt({
  name: 'summarizeTextPrompt',
  input: {schema: SummarizeExistingTextInputSchema},
  output: {schema: SummarizeExistingTextOutputSchema},
  prompt: `You are an expert content editor.
Your task is to summarize the following text into a concise overview of its key points.
The summary should be easy to grasp quickly.

Text to summarize:
{{{text}}}`,
});

const summarizeExistingTextFlow = ai.defineFlow(
  {
    name: 'summarizeExistingTextFlow',
    inputSchema: SummarizeExistingTextInputSchema,
    outputSchema: SummarizeExistingTextOutputSchema,
  },
  async input => {
    const {output} = await summarizePrompt(input);
    return output!;
  }
);
