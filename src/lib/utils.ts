"use client";

export function parseLocalDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const offset = -100;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;

  window.scrollTo({ top, behavior: "smooth" });
}
