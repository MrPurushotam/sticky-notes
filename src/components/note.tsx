import { forwardRef, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";

interface NoteInterface {
  initalPosition: { x: number, y: number }
  content: string,
  date: Date,
}

const Note = forwardRef<HTMLDivElement, NoteInterface>(({ initalPosition, content, date, ...props }, ref) => {
  const finalDate = new Date(date)
  const [dropdown, setDropdown] = useState(false)

  const toggleDropdown = () => {
    setDropdown(prev => !prev);
  };
  return (
    <>
      <div
        ref={ref}
        className={`absolute border-2 border-black rounded-md py-3 px-3 min-w-48 max-w-72 break-words text-wrap min-h-10 h-auto cursor-move bg-purple-200 flex flex-col text-medium text-lg`}
        style={{
          left: `${initalPosition?.x}px`,
          top: `${initalPosition?.y}px`,
        }}
        {...props}
      >
        {content}
        <div className='flex justify-between items-center pt-2 select-none'>
          <div className="relative">
            
            <button
              id="dropdownMenuIconHorizontalButton"
              data-dropdown-toggle="dropdownDotsHorizontal"
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-purple-200 rounded-lg hover:bg-purple-300 focus:ring-2 focus:outline-none focus:ring-purple-50"
              type="button"
              onClick={toggleDropdown}
            >
              <BsThreeDots />
            </button>

            {dropdown && (
              <div
                id="dropdownDotsHorizontal"
                className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-0 mt-2"
              >
                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownMenuIconHorizontalButton">
                  <li>
                    <span className="block px-4 py-2 hover:bg-gray-100">Edit Note</span>
                  </li>
                  <li>
                    <span className="block px-4 py-2 hover:bg-gray-100">Change Color</span>
                  </li>
                  
                </ul>
              </div>
            )}
          </div>
          <span className='text-xs text-bold text-right'>{finalDate.getHours() + ":" + finalDate.getMinutes()}-{finalDate.getDate() + "/" + finalDate.getMonth() + "/" + finalDate.getFullYear()}</span>
        </div>
      </div>
    </>
  )
}
)
export default Note
