// Captialize a string, e.g. "hello" => "Hello"
function capitalize(s: string) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// Humanize a field name, e.g. "my_field" => "My field"
export function humanizeFieldName(field: string) {
  return capitalize(field.replace(/_/g, " "));
}
