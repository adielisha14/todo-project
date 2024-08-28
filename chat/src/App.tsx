import { useState } from 'react';
import './App.css';
import { chatState } from './context/chatProvider';
import SideBar from './sideBar/sideBar'; 
import ChatBox from './myChats/myChats';
const App = () => {
  const { user } = chatState();
  const [fetchAgain, setFetchAgain]=useState(false)
  return (
    <>
      <div style={{ border: "solid", height: "50vh", width: "50vw",display:"flex",justifyContent:"space-between",padding:"10px" }}>
        {
          user&&
          <SideBar/>} 
        {
        user &&
         <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </div>
    </>
  );
};

export default App;
