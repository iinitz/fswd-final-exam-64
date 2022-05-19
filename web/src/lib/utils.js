export const plural = (n, text) => {
  if (n === 0 || n === 1) {
    return text
  }
  return `${text}s`
}
