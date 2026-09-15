import React from "react";
export function Card({eyebrow,title,children,image,footer,tone="default",inverse=false,padding="24px",style}){
  const bg={default:inverse?"#2A2827":"var(--bt-white)",tint:inverse?"#332F2E":"var(--bt-blush)",outline:"transparent"}[tone];
  const border=tone==="outline"?"1px solid "+(inverse?"rgba(255,255,255,.25)":"var(--bt-ink)"):"1px solid "+(inverse?"rgba(255,255,255,.12)":"var(--bt-stone)");
  const ink=inverse?"var(--bt-white)":"var(--bt-ink)";
  return React.createElement("div",{style:{background:bg,border,display:"flex",flexDirection:"column",overflow:"hidden",...style}},
    image&&React.createElement("div",{style:{aspectRatio:"16/9",background:"url("+image+") center/cover",filter:"var(--photo-filter)"}}),
    React.createElement("div",{style:{padding,flex:1,display:"flex",flexDirection:"column",gap:"10px"}},
      eyebrow&&React.createElement("div",{style:{font:"400 12px/1 var(--font-body)",letterSpacing:".32em",textTransform:"uppercase",color:inverse?"var(--bt-salmon)":"var(--bt-red)"}},eyebrow),
      title&&React.createElement("div",{style:{font:"900 22px/1.1 var(--font-display)",color:ink}},title),
      children&&React.createElement("div",{style:{font:"400 16px/1.4 var(--font-body)",color:inverse?"rgba(255,255,255,.62)":"var(--text-muted)"}},children),
      footer&&React.createElement("div",{style:{marginTop:"auto",paddingTop:"12px",borderTop:"1px solid "+(inverse?"rgba(255,255,255,.12)":"var(--bt-stone)"),font:"400 13px/1 var(--font-body)",letterSpacing:".12em",textTransform:"uppercase",color:inverse?"rgba(255,255,255,.62)":"var(--text-muted)"}},footer)));
}