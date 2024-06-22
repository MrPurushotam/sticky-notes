import { useState, useRef, useEffect } from 'react'
import './App.css'
import Notes from './components/notes'
import { RiDeleteBin6Line } from "react-icons/ri";
import Theme from './components/Theme';
import ColorSetting from "./components/ColorSetting"

interface Note {
  id: string;
  content: string;
  date: Date;
  position?:{x:number,y:number}
  color?:{light:string,dark:string};
}
function App() {
  const [notes, setNotes] = useState<Note[]>(window.localStorage.getItem("notes") ? JSON.parse(window.localStorage.getItem("notes")!) : [])
  const [current, setCurrent] = useState<string>("")
  const [clicked, setClicked] = useState<boolean>(false)
  const [update,setUpdate]=useState<Note|null>(null)
  const [darkTheme , setDarkTheme]=useState(window.localStorage.getItem("mode")?((window.localStorage.getItem("mode"))==='dark') : window.matchMedia((`prefers-color-scheme:dark`)).matches)
  const [editColor,setEditColor]=useState<boolean>(false)
  const [editColorNote,setEditColorNote]=useState<Note | null>(null)
  const deleteRef = useRef<HTMLDivElement>()
  const editColorRef = useRef<HTMLDivElement>()
  const idCounter = useRef(window.localStorage.getItem("counter") ? JSON.parse(window.localStorage.getItem("counter")!) : "2024000")

  useEffect(() => {
    window.localStorage.setItem("counter", JSON.stringify(idCounter.current))
  }, [idCounter.current])

  useEffect(()=>{
    darkTheme?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")
  },[darkTheme])

  useEffect(()=>{
    setCurrent(update?.content || "")
  },[update])

  const handleClick = () => {
    setClicked(true)
    if (!current.trim()) {
      alert("Note can't be empty.")
    } else {
      setNotes(prev => [...prev, { content: current.trim(), date: new Date(), id: String(idCounter.current++) ,color:{dark:"#E5B8F4",light:"#E9D5FF"} }])
      setCurrent("")
    }
    setClicked(false)
  }

  const updateNote=()=>{
    //  THOUGHT this will update the edited note content
    setClicked(true)
    setNotes(prev=>
      prev.map(n=>
        n.id ===update?.id ? {...n,content:current.trim(),date:new Date()}:n
      )
    )
    setUpdate(null)
    setCurrent("")
    setClicked(false)
  }

  const EditColorFunction=(color:{light:string,dark:string})=>{
    if(!editColorNote){
      return alert("Something went wrong.")
    }
    setNotes(prev=>
      prev.map(n=>
        n.id ===editColorNote.id ?{...n,color}:n
      )
    )
    setEditColorNote(null)
    setEditColor(false)
  }

  const handleOutsideEditColorBoxClick=(e:MouseEvent)=>{
    if(editColorRef.current && !editColorRef.current.contains(e.target as Node)){
      setEditColor(false)
      setEditColorNote(null)
    }
  }

  useEffect(()=>{
    document.addEventListener("mousedown",handleOutsideEditColorBoxClick);
    return ()=>{
      document.removeEventListener("mousedown",handleOutsideEditColorBoxClick);
    }
  },[])


  return (
    <div className=' bg-white dark:bg-[#3F4E4F] w-[100vw] h-[100vh]'>
      <div className='text-xl text-gray-400 font-light absolute top-[50vh] left-[40vw] shadow-sm text-semibold dark:text-gray-200 select-none'>Create your notes & Place it accordingly</div>
      <div className='flex justify-between'>
        <span></span>
        <div ref={deleteRef} className='flex w-1/2 border-2 p-2 space-x-4 mx-auto my-7 items-center'>
          <RiDeleteBin6Line className='text-[4vh] hover:shadow-xl hover:shadow-red-500 rounded-lg dark:text-white' />
          <input type="text" placeholder='Enter your note here'
            className='p-2 border-2 border-gray-400 rounded-sm text-lg shadow-md w-full dark:bg-[#F4EEE0]'
            onChange={(e) => setCurrent(e.target.value)}
            onKeyDown={(e) => { e.key === "Enter" ? (update? updateNote() : handleClick()) : null }}
            value={current}
          />
          <button
            className={`text-lg text-gray-900 shadow-md  p-2 w-20 shadow-purple-700 rounded-md hover:bg-violet-400 hover:underline transition-all ${clicked ? "bg-violet-400" : "bg-violet-600"}`}
            onClick={update?updateNote:handleClick} disabled={clicked}>{update?"Update":!clicked ? "Save" : "Wait"}</button>
        </div>
        <Theme darkTheme={darkTheme} setThemeDark={setDarkTheme} />
      </div>
      <Notes notes={notes} setNotes={setNotes} deleteRef={deleteRef} setUpdate={setUpdate} setEditColorNote={setEditColorNote} setEditColor={setEditColor} />

      {editColor && editColorNote && <ColorSetting EditColorFunction={EditColorFunction} note={editColorNote} editColorRef={editColorRef} />}
    </div>
  )
}

export default App
