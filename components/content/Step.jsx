import React from "react";
export function Step({number,title,children,inverse=false,rule=true,style}){
  const ink=inverse?"var(--bt-white)":"var(--bt-ink)";
  return React.createElement("div",{style:{borderTop:rule?"2px solid "+(inverse?"var(--bt-salmon)":"var(--bt-red)"):"none",paddingTop:rule?"14px":0,...style}},
    number!==undefined&&React.createElement("div",{style:{font:"400 13px/1 var(--font-body)",letterSpacing:".14em",color:inverse?"var(--bt-salmon)":"var(--bt-red)",marginBottom:"10px"}},String(number).padStart(2,"0")),
    React.createElement("div",{style:{font:"900 20px/1.1 var(--font-display)",letterSpacing:".06em",textTransform:"uppercase",color:ink}},title),
    children&&React.createElement("div",{style:{font:"400 16px/1.4 var(--font-body)",color:inverse?"rgba(255,255,255,.62)":"var(--text-muted)",marginTop:"8px"}},children));
}