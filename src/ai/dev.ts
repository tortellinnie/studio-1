import { config } from 'dotenv';
config();

import '@/ai/flows/generate-code-from-prompt.ts';
import '@/ai/flows/summarize-existing-text.ts';
import '@/ai/flows/rephrase-existing-text.ts';
import '@/ai/flows/generate-text-from-prompt.ts';
import '@/ai/flows/translate-text.ts';
import '@/ai/flows/generate-image.ts';
