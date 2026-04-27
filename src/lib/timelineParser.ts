import type { TimelineEntry } from "@/types";

const MESSAGE_RE = /^([A-Za-z][\w\- ]*)\s*=>\s*([A-Za-z][\w\- ]*)\s*:\s*(.*)$/;
const NARRATION_RE = /^\[Narration\]\s*(.*)$/;

export function parseTimelineLine(line: string): TimelineEntry | null {
  const trimmed = line.trim();
  if (!trimmed) return null;

  const narrationMatch = trimmed.match(NARRATION_RE);
  if (narrationMatch?.[1]) {
    return { type: "narration", text: narrationMatch[1] };
  }

  const messageMatch = trimmed.match(MESSAGE_RE);
  if (messageMatch?.[1] && messageMatch[2] && messageMatch[3]) {
    return {
      type: "message",
      from: messageMatch[1].trim(),
      to: messageMatch[2].trim(),
      text: messageMatch[3].trim(),
    };
  }

  return { type: "narration", text: trimmed };
}

export function parseTimeline(lines: string[]): TimelineEntry[] {
  const entries: TimelineEntry[] = [];
  for (const line of lines) {
    const entry = parseTimelineLine(line);
    if (entry) entries.push(entry);
  }
  return entries;
}
