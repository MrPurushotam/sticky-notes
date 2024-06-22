import React from 'react'
import Note from './note';

interface ColorComponent{
  color:string;
  onClick:()=>void;
}

interface ColorList{
  dark:string;
  light:string;
}

interface Note {
  id: string;
  content: string;
  date: Date;
  color?:{light:string,dark:string};
}

interface ColorSettingProps{
  note:Note|null;
  EditColorFunction: (color:{light:string,dark:string})=>void;
  editColorRef:React.RefObject<HTMLDivElement>;
}
const colorList:ColorList[]=[{dark:"#E5B8F4",light:"#E9D5FF"},{dark:"yellow",light:"yellow"},{dark:"red",light:"red"},{dark:"green",light:"green"}];



const ColorComponent:React.FC<ColorComponent>=({color,onClick})=>{
    return(
      <div className={`w-12 h-12 aspect-[3/2] hover:border-2 hover:border-black rounded-md p-2`} style={{backgroundColor:color}} onClick={onClick}/>
    )
}

const ColorSetting:React.FC<ColorSettingProps>= ({EditColorFunction,note,editColorRef}) => {
  const mode= window.localStorage.getItem("mode")?((window.localStorage.getItem("mode"))==='dark') : window.matchMedia((`prefers-color-scheme:dark`)).matches

  return (
    <div className="w-full h-[100vh]">
    <div className=" absolute top-[30%] left-[35%] z-10 bg-white border-2 border-black h-auto w-1/3 flex flex-col space-y-2 p-2" ref={editColorRef}>
      <div className="text-center">
        Choose  your note color for
        <br/>
        <div className='text-left p-2 border-2 border-black rounded-md w-9/12 bg-purple-200 mx-auto my-2'>
          {note?.content}
        </div>
      </div>
      <div className='w-full flex flex-row justify-center items-center h-auto min-h-16 space-x-2 overflow-hidden p-2 '>
        {colorList?.map((color,i)=>(
          <ColorComponent key={i} color={!mode?color.light:color.dark} onClick={()=>EditColorFunction(color)} />
        ))}
      </div>
    </div>
    </div>
  )
}

export default ColorSetting
