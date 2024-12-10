export function formatNameForTestId(name: string): string {
  return name.toLowerCase().replace(/ /g, '-')
}
