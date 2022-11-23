import '../App.css'
import { Button, Input, message, Tag } from 'antd'
import { useState, useEffect, useRef } from "react";
import useChat from './hooks/useChat';
import styled from 'styled-components';
import Title from '../components/Title';

const ChatBoxesWrapper = styled.div`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`;

const FootRef = styled.div`
  height: 20px;
`;

function ChatRoom() {
  const { status, me, messages, sendMessage, displayStatus } = useChat()
  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')  // textBody
  const [msgSent, setMsgSent] = useState(false)

  const msgRef = useRef(null)
  const msgFooter = useRef(null)

  const displayMessages = () => (
    messages.length === 0 ? (
      <p style={{ color: '#ccc' }}> No messages... </p>
    ):(
      messages.map(({ name, body }, i) => (
        <p className="App-message" key={i}>
          <Tag color="blue">{name}</Tag> {body}
        </p>
      ))
    )
  )

  useEffect(() => {
    displayStatus(status)}, [status])

  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView
    ({ behavior: 'smooth', block: "start" });
  };
  useEffect(() => {
    scrollToBottom();
    setMsgSent(false);
  }, [msgSent]);
  return (
    <>
      <Title name={me}>
        <h1>Simple Chat</h1>
        <Button type="primary" danger >
          Clear
        </Button>
      </Title>
      <ChatBoxesWrapper>
        {displayMessages()}
        <FootRef ref={msgFooter}/>
      </ChatBoxesWrapper>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            msgRef.current.focus();
        }}}
        style={{ marginBottom: 10 }}
      ></Input>
      <Input.Search
        ref={msgRef}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !username) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return
          }
          sendMessage({ name: username, body: msg })
          setBody('')
          setMsgSent('true');
        }}
      ></Input.Search>
    </>
  )
}

export default ChatRoom;
