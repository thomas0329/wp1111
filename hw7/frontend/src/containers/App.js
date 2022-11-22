import '../App.css'
import { Button, Input, message, Tag } from 'antd'
import { useState, useEffect, useRef } from "react";
import useChat from './hooks/useChat';
import styled from 'styled-components';
import Title from '../components/Title';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

function App() {
  const { status, me, messages, sendMessage } = useChat()
  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')  // textBody
  const bodyRef = useRef(null)

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const content = {
        content: msg, duration: 0.5 }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
  }}}
  useEffect(() => {
    displayStatus(status)}, [status])
  return (
    <Wrapper>
      <Title name={me}>
        <h1>Simple Chat</h1>
        <Button type="primary" danger >
          Clear
        </Button>
      </Title>
      <div className="App-messages">
        {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}> No messages... </p>
        ):(
          messages.map(({ name, body }, i) => (
            <p className="App-message" key={i}>
              <Tag color="blue">{name}</Tag> {body}
            </p>
          ))
        )}
      </div>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus();
        }}}
        style={{ marginBottom: 10 }}
      ></Input>
      <Input.Search
        ref={bodyRef}
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
        }}
      ></Input.Search>
    </Wrapper>
  )
}

export default App
