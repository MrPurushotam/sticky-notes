import { forwardRef } from 'react'

interface NoteInterface{
  initalPosition:{x:number, y:number}
  content:string,
  date:Date,
}

const Note = forwardRef<HTMLDivElement,NoteInterface>(({initalPosition,content,date,...props},ref) => {
  const finalDate= new Date(date)
  return (
    <div
      ref={ref}
      className={`absolute border-2 border-black rounded-md select-none py-4 px-3 min-w-48 max-w-72 break-words text-wrap min-h-10 h-auto cursor-move bg-purple-200 flex flex-col text-medium text-lg`}
      style={{
        left:`${initalPosition?.x}px`,
        top:`${initalPosition?.y}px`,
      }}
      {...props}
    >
      {content}
      <span className='text-xs text-bold text-right'>{finalDate.getHours()+":"+finalDate.getMinutes()}-{finalDate.getDate()+"/"+finalDate.getMonth()+"/"+finalDate.getFullYear()}</span>
    </div>
  )
}
)
export default Note
