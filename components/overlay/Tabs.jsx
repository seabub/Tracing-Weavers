import React from "react";
export function Tabs({items=[],value,defaultValue,onChange,inverse=false}){
  const [inner,setInner]=React.useState(defaultValue??(items[0]&&(items[0].value??items[0])));const cur=value??inner;
  const ink=inverse?"var(--bt-white)":"var(--bt-ink)",acc=inverse?"var(--bt-salmon)":"var(--bt-red)";
  return React.createElement("div",{role:"tablist",style:{display:"flex",gap:"28px",borderBottom:"1px solid "+(inverse?"rgba(255,255,255,.18)":"var(--bt-stone)")}},
    items.map(it=>{const v=it.value??it,l=it.label??it,on=v===cur;return React.createElement("button",{key:v,role:"tab","aria-selected":on,type:"button",onClick:()=>{setInner(v);onChange&&onChange(v)},style:{all:"unset",cursor:"pointer",padding:"10px 0 12px",marginBottom:"-1px",font:"400 14px/1 var(--font-body)",letterSpacing:".16em",textTransform:"uppercase",color:on?ink:(inverse?"rgba(255,255,255,.62)":"var(--text-muted)"),borderBottom:"2px solid "+(on?acc:"transparent"),transition:"color var(--duration-fast) var(--ease-out)"}},l)}));
}