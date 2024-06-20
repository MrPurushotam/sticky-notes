  import React, { createRef, useEffect, useRef } from 'react'
  import Note from './note';

  interface NotesProps{
      notes:Note[];
      setNotes:React.Dispatch<React.SetStateAction<Note[]>>;
      deleteRef:React.RefObject<HTMLDivElement>;
  }
  interface Note{
      id:string;
      content:string;
      date:Date;
      position:postionInterface;
  }

  interface postionInterface{
      x:number;
      y:number;
  }

  const Notes:React.FC<NotesProps> = ({notes,setNotes,deleteRef}) => {

    const generatPosition=():postionInterface=>{
      const maxX=window.innerWidth - 210
      const maxY=window.innerHeight - 230
      return { 
        x: Math.floor(Math.random()*maxX),
        y: Math.floor(Math.random()*maxY)+100
      }
    }

    useEffect(()=>{
      const savedNotes:Note[]=window.localStorage.getItem("notes")!==null?JSON.parse(window.localStorage.getItem("notes")!) as Note[]:[]
      const updatedNotes=notes.map((note)=>{
        const savedNote:Note=savedNotes.find(n=>n.id===note.id)! as Note;
        if(savedNote){
          return {...note,position:savedNote.position}
        }else{
          const position: postionInterface=generatPosition()
          return {...note,position}
        }
      })
      setNotes(updatedNotes)
      localStorage.setItem("notes",JSON.stringify(updatedNotes))
    },[notes.length])

    const notesRef=useRef<{[key:string]:React.RefObject<HTMLDivElement>}>({})

    const handleDrag=(note:Note,e:React.MouseEvent<HTMLDivElement,MouseEvent>)=>{
      const {id}= note
      const noteRef=notesRef.current[id].current
      const rect= noteRef?.getBoundingClientRect()
      if(!rect) return 
      const offsetX= e.clientX- rect.left
      const offsetY= e.clientY- rect.top
      const startPos= note.position

      const handleMouseMove=(e:MouseEvent)=>{
        const newX= e.clientX-offsetX;
        const newY=e.clientY-offsetY;
        if(!noteRef) return 
        noteRef.style.left=`${newX}px`
        noteRef.style.top=`${newY}px`
      }

      const handleMouseUp=()=>{
        document.removeEventListener("mousemove",handleMouseMove)
        document.removeEventListener("mouseup",handleMouseUp)

        const final= noteRef?.getBoundingClientRect()
        if(!final) return 
        const newpos={x:final.left,y:final.top}
        if (checkForOverlap(id)) {
          // check for overlap
          if(!noteRef) return
          noteRef.style.left = `${startPos.x}px`;
          noteRef.style.top = `${startPos.y}px`;
        } else {
          updateNotePosition(id, newpos);
        }
        if(checkForDeleteNote(final)){
          deleteNote(id)
        }
      }
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    const checkForOverlap=(id:string)=>{
      const current=notesRef.current[id].current
      const currentRect= current?.getBoundingClientRect()
      if(!currentRect) return 
      return notes.some((n)=>{
        if(n.id === id) return  false;
        const otherNotRef= notesRef.current[n.id].current
        const otherRect=otherNotRef?.getBoundingClientRect()
        if(!otherRect) return 
        const overlap = !(
          currentRect.right < otherRect.left ||
          currentRect.left > otherRect.right ||
          currentRect.bottom < otherRect.top ||
          currentRect.top > otherRect.bottom
        );
  
        return overlap;
      })
    }
    
    const checkForDeleteNote=(noteRect:DOMRect)=>{
      const deleteRect= deleteRef.current?.getBoundingClientRect()
      
      if(!deleteRect) return
      const overlap =!(
        noteRect.left > deleteRect.right ||
        noteRect.right < deleteRect.left ||
        noteRect.bottom < deleteRect.top ||
        noteRect.top > deleteRect.bottom
      )
      return overlap
    }

    const deleteNote=(id:string)=>{
      const updatedNote=notes.filter((n)=> n.id !== id)
      setNotes(updatedNote)
      localStorage.setItem("notes",JSON.stringify(updatedNote))
    }

    const updateNotePosition = (id:string, newPosition:postionInterface) => {
      const updatedNotes = notes.map((note) =>
        note.id === id ? {...note, position: newPosition} : note
      );
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };
    return (
      <div>
          {notes?.map(n=>(
              <Note 
              ref={notesRef.current[n.id]?notesRef.current[n.id]:notesRef.current[n.id]=createRef()} 
              key={n.id}
              initalPosition={n.position}
              content={n.content}
              date={n.date}
              onMouseDown={(e:React.MouseEvent)=>handleDrag(n,e)} />
          ))}
      </div>
    )
  }

  export default Notes
