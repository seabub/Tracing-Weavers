import React from "react";
export function Tooltip({label,children,side="top"}){
  const [on,setOn]=React.useState(false);
  const pos={top:{bottom:"calc(100% + 8px)",left:"50%",transform:"translateX(-50%)"},bottom:{top:"calc(100% + 8px)",left:"50%",transform:"translateX(-50%)"},right:{left:"calc(100% + 8px)",top:"50%",transform:"translateY(-50%)"},left:{right:"calc(100% + 8px)",top:"50%",transform:"translateY(-50%)"}}[side];
  return React.createElement("span",{onMouseEnter:()=>setOn(true),onMouseLeave:()=>setOn(false),onFocus:()=>setOn(true),onBlur:()=>setOn(false),style:{position:"relative",display:"inline-flex"}},children,
    on&&React.createElement("span",{role:"tooltip",style:{position:"absolute",...pos,background:"var(--bt-ink)",color:"var(--bt-white)",padding:"6px 10px",font:"400 13px/1.3 var(--font-body)",whiteSpace:"nowrap",zIndex:50,pointerEvents:"none"}},label));
}