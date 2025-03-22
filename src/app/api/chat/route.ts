import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { systemPrompt as system } from "@/lib/ai/system";
import { tools } from "@/lib/ai/tools";

const model = openai("gpt-4o-mini");
export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const stream = streamText({
    model,
    prompt,
    system,
    tools,
    maxSteps: 5,
  });

  return stream.toDataStreamResponse();
}

// useChat
// import { Message } from "ai";

// export async function POST(req: Request) {
//   const { messages }: { messages: Message[] } = await req.json();

//   const stream = streamText({
//     model,
//     messages,
//     system,
//     tools,
//     maxSteps: 5,
//   });

//   return stream.toDataStreamResponse();
// }
