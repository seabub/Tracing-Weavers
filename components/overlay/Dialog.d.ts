/** Centered modal on an ink scrim — the only surface with a shadow and 4px radius. */
export interface DialogProps{open:boolean;onClose?:()=>void;eyebrow?:string;title?:string;children?:React.ReactNode;actions?:React.ReactNode;width?:number}
export function Dialog(props:DialogProps):JSX.Element|null;