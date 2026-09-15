import React from "react";
export function Eyebrow({children,inverse=false,muted=false,as="div",style}){
  return React.createElement(as,{style:{font:"400 13px/1 var(--font-body)",letterSpacing:"var(--tracking-eyebrow)",textTransform:"uppercase",color:muted?(inverse?"rgba(255,255,255,.62)":"var(--text-muted)"):(inverse?"var(--bt-salmon)":"var(--bt-red)"),...style}},children);
}