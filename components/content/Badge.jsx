import React from "react";
export function Badge({children,tone="ink",inverse=false}){
  const c={ink:{bg:inverse?"var(--bt-white)":"var(--bt-ink)",fg:inverse?"var(--bt-ink)":"var(--bt-white)"},accent:{bg:inverse?"var(--bt-salmon)":"var(--bt-red)",fg:inverse?"var(--bt-ink)":"var(--bt-white)"},amber:{bg:"var(--bt-amber)",fg:"var(--bt-ink)"},outline:{bg:"transparent",fg:inverse?"var(--bt-white)":"var(--bt-ink)",bd:inverse?"var(--bt-white)":"var(--bt-ink)"}}[tone];
  return React.createElement("span",{style:{display:"inline-block",padding:"4px 8px",background:c.bg,color:c.fg,border:"1px solid "+(c.bd||"transparent"),font:"700 11px/1 var(--font-body)",letterSpacing:".18em",textTransform:"uppercase",borderRadius:"var(--radius-none)"}},children);
}