/** Round radio; red dot when selected. Control the group with checked/onChange. */
export interface RadioProps{label:string;description?:string;checked?:boolean;defaultChecked?:boolean;onChange?:(value?:string)=>void;disabled?:boolean;inverse?:boolean;name?:string;value?:string}
export function Radio(props:RadioProps):JSX.Element;