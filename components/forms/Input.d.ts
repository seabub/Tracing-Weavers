/** Underlined text field with small-caps label; matches the deck's hairline rules. */
export interface InputProps{label?:string;hint?:string;error?:string;placeholder?:string;value?:string;defaultValue?:string;onChange?:(v:string)=>void;type?:string;multiline?:boolean;rows?:number;disabled?:boolean;inverse?:boolean;style?:React.CSSProperties}
export function Input(props:InputProps):JSX.Element;