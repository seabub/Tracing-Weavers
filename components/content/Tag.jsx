import React from "react";
export function Tag({children,tone="neutral",inverse=false,onRemove}){
  const c={neutral:{bg:"transparent",fg:inverse?"var(--bt-white)":"var(--bt-ink)",bd:inverse?"rgba(255,255,255,.35)":"var(--bt-ink-3)"},accent:{bg:inverse?"var(--bt-salmon)":"var(--bt-red)",fg:inverse?"var(--bt-ink)":"var(--bt-white)",bd:"transparent"},soft:{bg:inverse?"#332F2E":"var(--bt-blush)",fg:inverse?"var(--bt-salmon)":"var(--bt-red)",bd:"transparent"}}[tone];
  return React.createElement("span",{style:{display:"inline-flex",alignItems:"center",gap:"8px",height:"26px",padding:"0 12px",border:"1px solid "+c.bd,background:c.bg,color:c.fg,borderRadius:"var(--radius-pill)",font:"400 13px/1 var(--font-body)",letterSpacing:".1em",textTransform:"uppercase",whiteSpace:"nowrap"}},children,
    onRemove&&React.createElement("button",{type:"button",onClick:onRemove,"aria-label":"Remove",style:{all:"unset",cursor:"pointer",lineHeight:1,fontSize:"14px"}},"×"));
}