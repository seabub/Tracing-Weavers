/** Native select styled as an underlined field with a chevron drawn from borders. */
export interface SelectProps{label?:string;options:Array<string|{value:string;label:string}>;value?:string;defaultValue?:string;onChange?:(v:string)=>void;placeholder?:string;disabled?:boolean;inverse?:boolean;style?:React.CSSProperties}
export function Select(props:SelectProps):JSX.Element;