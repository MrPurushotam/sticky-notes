import { useState, useRef, useEffect } from 'react'
import './App.css'
import Notes from './components/notes'
import { RiDeleteBin6Line } from "react-icons/ri";
import Theme from './components/Theme';

interface Note {
  id: string,
  content: string,
  date: Date
}
function App() {
  const [notes, setNotes] = useState<Note[]>(window.localStorage.getItem("notes") ? JSON.parse(window.localStorage.getItem("notes")!) : [])
  const [current, setCurrent] = useState<string>("")
  const [clicked, setClicked] = useState<boolean>(false)
  const [darkTheme , setDarkTheme]=useState(window.localStorage.getItem("mode")?((window.localStorage.getItem("mode"))==='dark') : window.matchMedia((`prefers-color-scheme:dark`)).matches)
  const deleteRef = useRef<HTMLDivElement>()
  const idCounter = useRef(window.localStorage.getItem("counter") ? JSON.parse(window.localStorage.getItem("counter")!) : "2024000")

  useEffect(() => {
    window.localStorage.setItem("counter", JSON.stringify(idCounter.current))
  }, [idCounter.current])

  useEffect(()=>{
    darkTheme?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")
  },[darkTheme])

  const handleClick = () => {
    setClicked(true)
    if (!current.trim()) {
      alert("Note can't be empty.")
    } else {
      setNotes(prev => [...prev, { content: current.trim(), date: new Date(), id: String(idCounter.current++) }])
      setCurrent("")
    }
    setClicked(false)
  }
  return (
    <div className=' bg-white dark:bg-[#3F4E4F] w-[100vw] h-[100vh]'>
      <div className='text-xl text-gray-400 font-light absolute top-[50vh] left-[40vw] shadow-sm text-semibold dark:text-gray-200 select-none'>Create your notes & Place it accordingly</div>
      <div className='flex justify-between'>
        <span></span>
        <div ref={deleteRef} className='flex w-1/2 border-2 p-2 space-x-4 mx-auto my-7 items-center'>
          <RiDeleteBin6Line className='text-[4vh] hover:shadow-xl hover:shadow-red-500 rounded-lg dark:text-white' />
          <input type="text" placeholder='Enter your note here'
            className='p-2 border-2 border-gray-400 rounded-sm text-lg shadow-md w-full dark:bg-[#E5E5CB]'
            onChange={(e) => setCurrent(e.target.value)}
            onKeyDown={(e) => { e.key === "Enter" ? handleClick() : null }}
            value={current}
          />
          <button
            className={`text-lg text-gray-900 shadow-md  p-2 w-20 shadow-purple-700 rounded-md hover:bg-violet-400 hover:underline transition-all ${clicked ? "bg-violet-400" : "bg-violet-600"}`}
            onClick={handleClick} disabled={clicked}>{!clicked ? "Save" : "Wait"}</button>
        </div>
        <Theme darkTheme={darkTheme} setThemeDark={setDarkTheme} />
      </div>
      <Notes notes={notes} setNotes={setNotes} deleteRef={deleteRef} />
    </div>
  )
}

export default App
