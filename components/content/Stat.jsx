import React from "react";
export function Stat({value,label,accent=false,inverse=false,size="lg",align="left"}){
  const fs={md:"64px",lg:"96px",xl:"120px"}[size];
  const color=accent?(inverse?"var(--bt-salmon)":"var(--bt-red)"):(inverse?"var(--bt-white)":"var(--bt-ink)");
  return React.createElement("div",{style:{textAlign:align}},
    React.createElement("div",{style:{font:"900 "+fs+"/1 var(--font-display)",letterSpacing:"-.03em",color}},value),
    label&&React.createElement("div",{style:{font:"400 17px/1.3 var(--font-body)",color:inverse?"rgba(255,255,255,.62)":"var(--text-muted)",marginTop:"8px",maxWidth:"28ch",marginLeft:align==="center"?"auto":0,marginRight:align==="center"?"auto":0}},label));
}