export function compactJoin(values, separator = " ") {
  return values.filter(Boolean).join(separator);
}

export function toLowerText(value) {
  return String(value || "").toLowerCase();
}

export function pluralize(count, singular, plural = `${singular}s`) {
  return count === 1 ? singular : plural;
}
