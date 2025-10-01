// api/generate/route.ts (Edge)
import { openai } from "@ai-sdk/openai"
import {
  streamText,
  UIMessage,
  convertToModelMessages,
} from "ai";
import { NextResponse } from "next/server";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages?: UIMessage[] } = await req.json();

    // If no messages are provided, fallback to your static prompt
    const fallbackPrompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const result = await streamText({
      model: openai("gpt-4o"),
      messages: messages
        ? convertToModelMessages(messages) // ✅ chat style
        : [{ role: "user", content: fallbackPrompt }], // ✅ prompt fallback
    });

    // Stream in UIMessage format (for frontend consumption)
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occured" },
      { status: 500 }
    );
  }
}
