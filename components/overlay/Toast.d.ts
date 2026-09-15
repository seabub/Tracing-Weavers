/** Bottom-anchored notice bar; ink by default. */
export interface ToastProps{children:React.ReactNode;tone?:"ink"|"accent"|"amber";action?:string;onAction?:()=>void;style?:React.CSSProperties}
export function Toast(props:ToastProps):JSX.Element;