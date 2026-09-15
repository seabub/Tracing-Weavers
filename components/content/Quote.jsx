import React from "react";
export function Quote({children,source,inverse=false,size="md"}){
  const fs={md:"28px",lg:"40px"}[size];
  return React.createElement("figure",{style:{margin:0,borderLeft:"2px solid "+(inverse?"var(--bt-salmon)":"var(--bt-red)"),paddingLeft:"24px"}},
    React.createElement("blockquote",{style:{margin:0,font:"400 "+fs+"/1.15 var(--font-display)",color:inverse?"var(--bt-white)":"var(--bt-ink)",letterSpacing:"-.01em"}},children),
    source&&React.createElement("figcaption",{style:{marginTop:"14px",font:"400 13px/1 var(--font-body)",letterSpacing:".14em",textTransform:"uppercase",color:inverse?"rgba(255,255,255,.62)":"var(--text-muted)"}},source));
}