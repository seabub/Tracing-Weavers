/** Underlined caps tabs; red 2px indicator. */
export interface TabsProps{items:Array<string|{value:string;label:string}>;value?:string;defaultValue?:string;onChange?:(v:string)=>void;inverse?:boolean}
export function Tabs(props:TabsProps):JSX.Element;