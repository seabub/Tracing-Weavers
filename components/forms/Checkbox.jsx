import React from "react";
export function Checkbox({label,description,checked,defaultChecked=false,onChange,disabled=false,inverse=false,name,value}){
  const [inner,setInner]=React.useState(defaultChecked);const on=checked??inner;
  const ink=inverse?"var(--bt-white)":"var(--bt-ink)",acc=inverse?"var(--bt-salmon)":"var(--bt-red)";
  const toggle=()=>{if(disabled)return;const n=!on;setInner(n);onChange&&onChange(n)};
  const box={width:"18px",height:"18px",flex:"none",border:"1px solid "+(on?acc:ink),background:on&&acc,borderRadius:"var(--radius-none)",display:"grid",placeItems:"center",transition:"all var(--duration-fast) var(--ease-out)",marginTop:"2px"};
  return React.createElement("label",{onClick:e=>{e.preventDefault();toggle()},style:{display:"flex",gap:"12px",alignItems:"flex-start",cursor:disabled?"not-allowed":"pointer",opacity:disabled?.4:1,fontFamily:"var(--font-body)",color:ink}},
    React.createElement("input",{type:"checkbox",name,value,checked:on,readOnly:true,style:{position:"absolute",opacity:0,width:0,height:0}}),
    React.createElement("span",{style:box},on&&React.createElement("span",{style:{width:"9px",height:"5px",borderLeft:"2px solid #fff",borderBottom:"2px solid #fff",transform:"translateY(-1px) rotate(-45deg)"}})),
    React.createElement("span",null,React.createElement("span",{style:{display:"block",font:"400 17px/1.3 var(--font-body)"}},label),description&&React.createElement("span",{style:{display:"block",font:"400 14px/1.3 var(--font-body)",color:inverse?"rgba(255,255,255,.62)":"var(--text-muted)"}},description)));
}