import { useState } from 'react'
import './App.css'
import Notes from './components/notes'

interface Note{
  id:string,
  content:string,
  date:Date
}
function App() {
  const [notes, setNotes] = useState<Note[]>(window.localStorage.getItem("notes")?JSON.parse(window.localStorage.getItem("notes")!):[])
  const [current,setCurrent]=useState<string>("")
  const [clicked,setClicked]=useState<boolean>(false)
  const handleClick=()=>{
    setClicked(true)
      if(!current.trim()){
        alert("Note can't be empty.")
      }else{
        setNotes(prev=>[...prev,{content:current.trim(),date:new Date(),id:String(notes.length+1)}])
        setCurrent("")
      }
    setClicked(false)
  }
  return(
    <div>
      <div className='text-xl text-gray-400 font-light absolute top-[50vh] left-[40vw] shadow-sm text-semibold'>Create your notes & Place it accordingly</div>
      <div className='flex w-1/2 border-2 p-2 space-x-4 mx-auto my-7 items-center'>
        <div className='flex items-center justify-center w-16 hover:shadow-lg hover:shadow-red-500'>
          <svg xmlns="http://www.w3.org/2000/svg" className='w-full h-full' x="0px" y="0px" viewBox="0 0 48 48">
            <path d="M 20 2 C 18.35503 2 17 3.3550302 17 5 L 17 7 L 4 7 A 1.0001 1.0001 0 1 0 4 9 L 18 9 A 1.0001 1.0001 0 0 0 19 8 L 19 5 C 19 4.4349698 19.43497 4 20 4 L 28 4 C 28.56503 4 29 4.4349698 29 5 L 29 8 A 1.0001 1.0001 0 0 0 30 9 L 44 9 A 1.0001 1.0001 0 1 0 44 7 L 31 7 L 31 5 C 31 3.3550302 29.64497 2 28 2 L 20 2 z M 6.9863281 10.986328 A 1.0001 1.0001 0 0 0 6 12.09375 L 8.6640625 40.466797 C 8.9044953 43.026846 11.070395 45 13.642578 45 L 24 45 L 34.357422 45 C 36.928851 45 39.095475 43.027166 39.335938 40.466797 L 42 12.09375 A 1.000496 1.000496 0 0 0 40.007812 11.90625 L 37.345703 40.28125 C 37.200166 41.830881 35.913993 43 34.357422 43 L 24 43 L 13.642578 43 C 12.084761 43 10.799864 41.831201 10.654297 40.28125 L 7.9921875 11.90625 A 1.0001 1.0001 0 0 0 6.9863281 10.986328 z M 14.646484 13.986328 A 1.0001 1.0001 0 0 0 13.626953 15.0625 L 15.001953 37.0625 A 1.0001 1.0001 0 1 0 16.998047 36.9375 L 15.623047 14.9375 A 1.0001 1.0001 0 0 0 14.646484 13.986328 z M 23.984375 13.986328 A 1.0001 1.0001 0 0 0 23 15 L 23 37 A 1.0001 1.0001 0 1 0 25 37 L 25 15 A 1.0001 1.0001 0 0 0 23.984375 13.986328 z M 33.324219 13.986328 A 1.0001 1.0001 0 0 0 32.376953 14.9375 L 31.001953 36.9375 A 1.0001 1.0001 0 1 0 32.998047 37.0625 L 34.373047 15.0625 A 1.0001 1.0001 0 0 0 33.324219 13.986328 z"></path>
          </svg>
        </div>
        <input type="text" placeholder='Enter your note here' 
          className='p-2 border-2 border-gray-400 rounded-sm text-lg shadow-md w-full'
          onChange={(e)=>setCurrent(e.target.value)}
          onKeyDown={(e)=>{e.key==="Enter"?handleClick():null}}
          value={current}
        />
        <button
          className={`text-lg text-gray-900 shadow-md  p-2 w-20 shadow-purple-700 rounded-md hover:bg-violet-400 hover:underline transition-all ${clicked?"bg-violet-400":"bg-violet-600"}`}  
          onClick={handleClick}>{!clicked?"Save":"Wait"}</button>
      </div>
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  )
}

export default App
