type ClassValue = string | number | null | undefined | false | ClassValue[];

function flatten(values: ClassValue[], out: string[]) {
  for (const value of values) {
    if (!value && value !== 0) continue;
    if (Array.isArray(value)) {
      flatten(value, out);
    } else {
      out.push(String(value));
    }
  }
}

/** Minimal conditional-classname joiner — no extra dependency needed for this. */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  flatten(values, out);
  return out.join(' ');
}
