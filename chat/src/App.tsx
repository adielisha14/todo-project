import { useState } from 'react';
import './App.css';
import SideBar from './sideBar/sideBar'; 
import ChatBox from './myChats/myChats';
import  ChatProvider  from "./context/chatProvider.tsx"



const App = () => {
  const [fetchAgain, setFetchAgain]=useState(false)
  
  return (
    <ChatProvider>
      {localStorage.getItem("token")&&<>
      <div style={{ border: "solid", height: "50vh", width: "50vw",display:"flex",justifyContent:"space-between",padding:"10px" }}>
          <SideBar/>
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
      </div>
      </>}

    </ChatProvider>
  );
};

export default App;
