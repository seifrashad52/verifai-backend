import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are the fact-checking engine inside verifAI.
Given a user's claim (text and/or an image), you MUST:
1. Use the web_search tool to find real, current sources before answering.
2. Return a verdict of exactly one of: "true", "false", "unverifiable".
3. Use "unverifiable" whenever sources are insufficient, conflicting, or the claim
   is too recent/local to confirm — never guess to avoid an "unverifiable" answer.
4. Always cite the sources you used (title + url) that justify the verdict.
5. Respond ONLY in strict JSON: {"verdict": "...", "explanation": "...", "sources": [{"title": "...", "url": "..."}]}`;

export async function checkClaim(input: {
  text?: string;
  imageBase64?: string;
  imageMediaType?: string;
}) {
  const content: Anthropic.MessageParam["content"] = [];

  if (input.imageBase64) {
    // Claude reads images natively — no separate OCR step needed for
    // screenshots; Claude extracts and reasons about the text directly.
    content.push({
      type: "image",
      source: {
        type: "base64",
        media_type: (input.imageMediaType as any) ?? "image/jpeg",
        data: input.imageBase64,
      },
    });
  }
  if (input.text) {
    content.push({ type: "text", text: input.text });
  }

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6", // always use the current Sonnet model string
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    tools: [{ type: "web_search_20250305", name: "web_search" } as any],
    messages: [{ role: "user", content }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  const raw = textBlock && "text" in textBlock ? textBlock.text : "{}";

  try {
    return JSON.parse(raw.replace(/```json|```/g, "").trim());
  } catch {
    return {
      verdict: "unverifiable",
      explanation: "Could not parse a confident verdict — please try rephrasing the claim.",
      sources: [],
    };
  }
}
