import React from "react";
export function Select({label,options=[],value,defaultValue,onChange,placeholder="Select",disabled=false,inverse=false,style}){
  const ink=inverse?"var(--bt-white)":"var(--bt-ink)",muted=inverse?"rgba(255,255,255,.62)":"var(--text-muted)";
  return React.createElement("label",{style:{display:"block"}},
    label&&React.createElement("span",{style:{display:"block",font:"400 12px/1 var(--font-body)",letterSpacing:".14em",textTransform:"uppercase",color:muted,marginBottom:"2px"}},label),
    React.createElement("span",{style:{position:"relative",display:"block"}},
      React.createElement("select",{value,defaultValue:value===undefined?(defaultValue??""):undefined,disabled,onChange:e=>onChange&&onChange(e.target.value),style:{width:"100%",appearance:"none",WebkitAppearance:"none",background:"transparent",color:ink,border:"none",borderBottom:"1px solid "+(inverse?"rgba(255,255,255,.35)":"var(--bt-ink-3)"),padding:"10px 28px 10px 0",font:"400 19px/1.3 var(--font-body)",outline:"none",opacity:disabled?.4:1,cursor:"pointer",...style}},
        React.createElement("option",{value:"",disabled:true},placeholder),
        options.map(o=>{const v=typeof o==="string"?o:o.value,l=typeof o==="string"?o:o.label;return React.createElement("option",{key:v,value:v},l)})),
      React.createElement("span",{"aria-hidden":true,style:{position:"absolute",right:"4px",top:"50%",transform:"translateY(-60%) rotate(45deg)",width:"8px",height:"8px",borderRight:"1px solid "+ink,borderBottom:"1px solid "+ink,pointerEvents:"none"}})));
}