import '../App.css'
import { Button, Input, message, Tag, Tabs } from 'antd'
import { useState, useEffect, useRef } from "react";
import { useChat } from './hooks/useChat';
import styled from 'styled-components';
import Title from '../components/Title';
import Message from '../components/Message';
import ChatModal from '../components/ChatModal';

const ChatBoxesWrapper = styled(Tabs)`
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
  // const [username, setUsername] = useState('')
  const [body, setBody] = useState('')  // textBody
  const [msgSent, setMsgSent] = useState(false)
  const [activeKey, setActiveKey] = useState(''); // selected chatbox
  const [chatBoxes, setChatBoxes] = useState([]); // each chat box: { label: , children: , key: }
  const [modalOpen, setModalOpen] = useState(false);
  const msgRef = useRef(null)
  const msgFooter = useRef(null)

  const createChatBox = (friend) => {
    if (chatBoxes.some
        (({key}) => key === friend)) {
          throw new Error(friend +
    "'s chat box has already opened.");
    }
    const chat = extractChat(friend);
    setChatBoxes([...chatBoxes,
      { label: friend, children: chat,
        key: friend }]);
    setMsgSent(true);
    return friend;
  };

  const removeChatBox =
    (targetKey, activeKey) => {
      const index = chatBoxes.findIndex
        (({key}) => key === activeKey);
      const newChatBoxes = chatBoxes
        .filter(({key}) =>
                     key !== targetKey);
      setChatBoxes(newChatBoxes);
      return(
        activeKey?
          activeKey === targetKey?
            index === 0?
            '' : chatBoxes[index - 1].key
          : activeKey
        : ''
      );
    };

  const renderChat = (chat) => {  // 產生 chat 的 DOM nodes
    console.log('renderchat called');
    return(
      null
    )
  };
  const extractChat = (friend) => {
    return renderChat
      (messages.filter
        (({name, body}) => ((name === friend) || (name === me))));
  }


  const displayMessages = () => (
    messages.length === 0 ? (
      <p style={{ color: '#ccc' }}> No messages... </p>
    ):(
      messages.map(({ name, body }, i) => (
        // <p className="App-message" key={i}>
        //   <Tag color="blue">{name}</Tag> {body}
        // </p>
        <Message name={name} message={body} isMe={(name === me)}/>
      ))
    )
  )

  // useEffect(() => {
  //   displayStatus(status)}, [status])

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
      <Title name={me} />
      <ChatBoxesWrapper
        onChange={(key) => {
          setActiveKey(key);
          extractChat(key); // from backend
        }}
        onEdit={(targetKey, action) => {
          if (action === 'add') setModalOpen(true);
          else if (action === 'remove') {
            setActiveKey(removeChatBox(targetKey, activeKey));
          }
        }}
        items={chatBoxes}
      >
        {displayMessages()}
        <FootRef ref={msgFooter}/>
      </ChatBoxesWrapper>
      <ChatModal
        open={modalOpen}
        onCreate={({ name }) => {
          setActiveKey(createChatBox(name));
          extractChat(name);
          setModalOpen(false);
        }}
        onCancel={() => { setModalOpen(false);}}
      />
      {/* <Input
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
      ></Input.Search> */}
    </>
  )
}

export default ChatRoom;
