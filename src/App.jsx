import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] =useState
  (false);
  const [charAllowed, setCharAllowed] =useState
  (false);
  const [password,setPassword] =useState("")

 //useRef
 const  passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "?!@#$&*)(~~`[]%^"

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random()  * str.length + 
      1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length,numberAllowed,charAllowed, setPassword])

   const copyPasswordToClipboard = useCallback(() => {

   passwordRef.current?.select()
   passwordRef.current?.setSelectionRange(0,100);
   window.navigator.clipboard.writeText(password)
}, [password])
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed,
    passwordGenerator])
  

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-8 my-18 text-blue-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='className="flex shadow rounded-lg overflow-hidden mb-8 "'>
        <input
         type="text"
         value={password}
         className='outline-none w-full py-1 px-4'
         placeholder='password'
          readOnly
          ref={passwordRef}

         
         
         />
         <button
         onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-2 rounded-3xl mt-1 mb-2 py-0.5 "
          >Copy </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
           type="range" 
           min={8}
           max={100}
           value={length}
           className='cursor-pointer'
           onChange={(e) => {setlength(e.target.value)}}
           />
           <label> Length: {length} </label>
        </div>
        <div className="flex-items-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
          />
          <label htmlfor="numberInput">Numbers</label>
        </div>
        <input
        type="checkbox"
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
          />
          <label htmlfor="numberInput">Characters</label>
      </div>

     </div>
    
    </>
  )
}

export default App

