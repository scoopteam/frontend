function capitalize(s: string) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function humanizeFieldName(field: string) {
  return capitalize(field.replace(/_/g, " "));
}
