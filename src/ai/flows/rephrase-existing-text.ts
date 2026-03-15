'use server';
/**
 * @fileOverview An AI agent for rephrasing existing text.
 *
 * - rephraseExistingText - A function that handles the text rephrasing process.
 * - RephraseExistingTextInput - The input type for the rephraseExistingText function.
 * - RephraseExistingTextOutput - The return type for the rephraseExistingText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RephraseExistingTextInputSchema = z.object({
  text: z.string().describe('The original text to be rephrased.'),
  styleTone: z
    .string()
    .describe(
      'The desired style or tone for the rephrased text (e.g., "formal", "casual", "humorous", "professional").'
    ),
});
export type RephraseExistingTextInput = z.infer<typeof RephraseExistingTextInputSchema>;

const RephraseExistingTextOutputSchema = z.object({
  rephrasedText: z.string().describe('The AI-generated rephrased text.'),
});
export type RephraseExistingTextOutput = z.infer<typeof RephraseExistingTextOutputSchema>;

export async function rephraseExistingText(
  input: RephraseExistingTextInput
): Promise<RephraseExistingTextOutput> {
  return rephraseExistingTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rephraseExistingTextPrompt',
  input: {schema: RephraseExistingTextInputSchema},
  output: {schema: RephraseExistingTextOutputSchema},
  prompt: `You are an expert content writer. Rephrase the following text to match the specified style or tone.

Original Text:
{{{text}}}

Desired Style/Tone:
{{{styleTone}}}

Rephrased Text:`,
});

const rephraseExistingTextFlow = ai.defineFlow(
  {
    name: 'rephraseExistingTextFlow',
    inputSchema: RephraseExistingTextInputSchema,
    outputSchema: RephraseExistingTextOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
