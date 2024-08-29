import { useState } from 'react';
import './App.css';
import { chatState } from './context/chatProvider';
import SideBar from './sideBar/sideBar'; 
import ChatBox from './myChats/myChats';
const App = () => {
  // const { user } = chatState();
const user={email
  : 
  "adi@adi.com",
  image
  : 
  null,
  password
  : 
  "$2b$10$slyTj6eLI.yoThyYacj8He/ShBQZ700l4tcJMU8syZnbeansmSpqC",
  role
  : 
  "admin",
  updatedAt
  : 
  "2024-08-28T14:34:28.533Z",
  username
  : 
  "adi",
  _id
  : 
  "66ced4119ac7737115764bd1"

}
  const [fetchAgain, setFetchAgain]=useState(false)
  return (
    <>
      <div style={{ border: "solid", height: "50vh", width: "50vw",display:"flex",justifyContent:"space-between",padding:"10px" }}>
        { user&&<>
          <SideBar/>
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
          </>}
      </div>
    </>
  );
};

export default App;
