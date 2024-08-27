



import './App.css'
import { useState } from 'react';

const About=()=>{
  return(
    <>
      <h1 style={{color:"pink", fontSize:"3rem"}}>about</h1>
      <h1>test</h1>
    </>
  )
}

const Home=()=>{
  return(
    <>
      <h1 style={{color:"green", fontSize:"3rem"}}>HOME</h1>
      <h1>test</h1>
    </>
  )
}
const Test=()=>{
  return(
    <>

      <h1 style={{color:"blue", fontSize:"3rem"}}>test</h1> 

    </>
  )
}
function App() {
  const [test,setTest]=useState<boolean>(false)
  const [test2,setTest2]=useState<boolean>(false)
  const [test3,setTest3]=useState<boolean>(false)

  return (
    <>
    <div style={{border:"solid", color:"red"}}>
      <h1>this is the home </h1>
      <button onClick={()=>setTest(prev=>!prev)}>click me1</button>
      {test&& <Home/>}
      <button onClick={()=>setTest2(prev=>!prev)}>click me2</button>
      {test2&& <Test/>}      
      <button onClick={()=>setTest3(prev=>!prev)}>click me3</button>
      {test3&& <About/>}

    </div>


{/* 
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/test' element={<Test/>} />

    </Routes> */}

    </>

  )
}

export default App
