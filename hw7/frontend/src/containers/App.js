import '../App.css'
import { Button, Input, message, Tag } from 'antd'
import { useState, useEffect, useRef } from "react";
import { useChat } from './hooks/useChat';
import styled from 'styled-components';
import Title from '../components/Title';
import ChatRoom from './ChatRoom';
import SignIn from './SignIn';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const App = () => {
  const {status, me, signedIn, displayStatus} = useChat();
  useEffect(() => {
    displayStatus(status)}, [status]
  );
  return(
    <Wrapper>
      {signedIn? <ChatRoom/> : <SignIn me={me}/>}
    </Wrapper>
  )
}

// by TA

// const App = () => {
//   const { status, me, displayStatus } = useChat()
//   const [ signedIn, setSignedIn ]  = useState(false)
//   useEffect(() => {
//     displayStatus(status)}, [status, displayStatus])
  
//   return (
//     <Wrapper> 
//       {signedIn? <ChatRoom /> : 
//       <SignIn setSignedIn={setSignedIn}/>} 
//     </Wrapper>
//   )
// }

export default App;