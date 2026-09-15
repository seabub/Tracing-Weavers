/** Ink tooltip on hover/focus. */
export interface TooltipProps{label:string;children:React.ReactNode;side?:"top"|"bottom"|"left"|"right"}
export function Tooltip(props:TooltipProps):JSX.Element;