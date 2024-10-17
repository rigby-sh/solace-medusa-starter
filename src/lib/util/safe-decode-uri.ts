export function safeDecodeURIComponent(str: string): string {
  try {
    return decodeURIComponent(str)
  } catch (e) {
    return str
  }
}
