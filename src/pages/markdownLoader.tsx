export async function loadMarkdown(): Promise<string> {
  const response = await fetch('./add_hospitals.md');
  const text = await response.text();
  return text;
}