import { useState, useEffect, createContext, useContext} from "react";
import {message} from 'antd';

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const client = new WebSocket ('ws://localhost:4000');

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    sendMessage: () => {},
    clearMessages: () => {},
});

const ChatProvider = (props) => {
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "init": {
                setMessages(payload);
                break;
            }
            case "output": {
                setMessages(() =>
                [...messages, ...payload]);
                break; 
            }
            case "status": {
                setStatus(payload); 
                break;
            }
            default: break;
        }
    }

    useEffect(() => {
        if (signedIn) {
          localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [me, signedIn]);
    
    const displayStatus = (s) => {
        console.log(s);
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

    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };
    const sendMessage = (payload) => {
        sendData(['input', payload]);
    }
    const clearMessages = () => {
        sendData(['clear']);
    }
       
    return (
      <ChatContext.Provider
        value={{
          status, me, signedIn, messages, setMe, setSignedIn,
          sendMessage, clearMessages, displayStatus
        }}
        {...props}
      />
    ); 
};
const useChat = () => (
    useContext(ChatContext)
)
export { useChat, ChatProvider }