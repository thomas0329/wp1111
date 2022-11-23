import { useState } from "react";
import {message} from 'antd';

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [me, setMe] = useState('');
    const [signedIn, setSignedIn] = useState(false);

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

    const client = new WebSocket ('ws://localhost:4000');
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
    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };
    const sendMessage = (payload) => {
        // update messages and status (fake)
        // setMessages([...messages, payload]);
        // setStatus({
        //     type: "success",
        //     msg: "Message sent." });
        console.log(payload);
        sendData(['input', payload]);
    }
    return {
        status, messages, sendMessage, 
        displayStatus, setMe, setSignedIn, signedIn
    };
};
export default useChat;