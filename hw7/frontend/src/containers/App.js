import '../App.css'
import { Button, Input, message, Tag } from 'antd'
import { useState, useEffect, useRef } from "react";
import useChat from './hooks/useChat';
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

// const App =  () => {
//   const {status, me, signedIn, displayStatus} = useChat();
//   useEffect(() => {
//     displayStatus(status)}, [status]
//   );
//   // console.log("signedin at")
//   console.log(signedIn);
//   return(
//     <Wrapper>
//       {signedIn? <ChatRoom/> : <SignIn me={me}/>}
//     </Wrapper>
//   )
// }

const App = () => {
    const { status, signedIn, displayStatus } = useChat()
    useEffect(() => {
      displayStatus(status)}, [status, displayStatus])
    console.log("entered app");
    return (
      <Wrapper> {signedIn? <ChatRoom />: <SignIn />} </Wrapper>
  )
}

export default App;