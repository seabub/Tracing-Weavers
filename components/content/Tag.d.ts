/** Pill label for places, themes and interest picks. */
export interface TagProps{children:React.ReactNode;tone?:"neutral"|"accent"|"soft";inverse?:boolean;onRemove?:()=>void}
export function Tag(props:TagProps):JSX.Element;