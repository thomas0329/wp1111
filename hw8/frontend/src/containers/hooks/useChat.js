import {createContext, useContext, useEffect, useState} from 'react';
import {message} from 'antd';
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION,
           MESSAGE_SUBSCRIPTION } from "../../graphql";


const LOCALSTORAGE_KEY = 'save-me';
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    friend: '',
    setFriend: () => {},
    startChat: () => {},
    chatBoxQuery: () => {},
    subscribeToMore: () => {},
    displayStatus: () => {},
});

const ChatProvider = (props) => {
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || '');
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);
    const [friend, setFriend] = useState('');

    const [ chatBoxQuery, { data, loading, subscribeToMore }]
        = useLazyQuery(CHATBOX_QUERY, { // returns callback func
        // variables: {
        //     name1: me,
        //     name2: friend,
        // }
    });
    
    useEffect(() => {
        console.log("Data update")
        console.log(data)
        if (data)
            setMessages(data.chatbox.messages)
    }, [data]);

    useEffect(() => {
        console.log("Message update")
        console.log(messages)
    }, [messages]);
    // useEffect(() => {
    //     console.log('useEffect subscribeToMore called!');
    //     try {
    //         subscribeToMore({
    //             document: MESSAGE_SUBSCRIPTION,
    //             variables: { from: me, to: friend },
    //             updateQuery: (prev, { subscriptionData }) => {
    //                 if (!subscriptionData.data) return prev;
    //                 const newMessage = subscriptionData.data.message.message;
    //                 return {
    //                     chatBox: {
    //                         messages: [...prev.chatBox.messages, newMessage],
    //                     }};
    //             }});
    //     } catch (e) { console.error(e); }
    // }, [subscribeToMore, friend]);

    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);

    
    // what should be done if client recieves message

    // const startChat = (name, to) => {
    //     if(!name || !to) throw new Error('Name or to required.');
    //     sendData(['chat',{name,to}])
    // }

    // const sendMessage = ({name, to, body}) => {
    //     if (!name || !to || !body)
    //         throw new Error('name or to or body required');
    //     sendData(['message',{name, to, body}]);
    // };
    
    // const sendData = async(data) => {
    //     await client.send(JSON.stringify(data));
    // };

    // const clearMessages = () => {
    //     sendData(['clear',null])
    // };

    const displayStatus = (s) => {
        if (s.msg) {
          const {type, msg} = s;
          const content = {
            content: msg, duratoin: 0.5
          }
          switch (type) {
            case 'success':
              message.success(content)
              break
            case 'error':
            default:
              message.error(content)
              break
          }
        }
    }

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [signedIn]);

    return(
        <ChatContext.Provider
            value = {{
                status,
                me,
                friend,
                setFriend,
                signedIn,
                messages,
                setMe,
                setSignedIn,
                startChat,
                chatBoxQuery,
                subscribeToMore,
                // sendMessage,
                // clearMessages,
                displayStatus
            }}
            {...props}
        />
    );
};

const useChat = () => useContext(ChatContext);
export {ChatProvider, useChat}