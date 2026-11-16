/** Troca PNG/JPG por WebP gerado por `npm run optimize-images`. */
export function toWebpSrc(path: string): string {
  return path.replace(/\.(png|jpe?g)(?=($|\?))/i, ".webp");
}
