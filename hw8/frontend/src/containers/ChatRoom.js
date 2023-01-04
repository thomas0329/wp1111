import {useState, useEffect, useRef} from 'react';
import {Tabs, Input, Tag} from 'antd';
import styled from 'styled-components';
import {useChat} from './hooks/useChat';
import Title from '../components/Title.js';
import Message from '../components/Message';
import ChatModal from '../components/ChatModal';
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION,
    MESSAGE_SUBSCRIPTION } from "../graphql";

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
`;

const ChatBoxWrapper = styled.div`
    height: calc(240px - 36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const FootRef = styled.div`
    height: 20px;
    background-color:blue;
`;

const ChatRoom = () => {
    const {me, friend, setFriend, messages, sendMessage, startChat,
			chatBoxQuery, subscribeToMore, displayStatus} = useChat();
    const [chatBoxes, setChatBoxes] = useState([]);
    const [activeKey, setActiveKey] = useState('');
    const [msg, setMsg] = useState('');
    const [msgSent, setMsgSent] = useState(false);  // set to true to update scroll
    const [modalOpen, setModalOpen] = useState(false);


    const msgRef = useRef(null);
    const msgFooter = useRef(null);

    // input:  array of strings
    // output: html
    const displayChat = (chat) => {
        console.log('chat');
        console.log(chat);
        
        return (chat.length === 0) ? (
            <p style={{color: '#ccc'}}> No messages... </p>
        ) : (
            <ChatBoxWrapper>{
                chat.map (({sender, body},i) => 
                (   
                    <Message isMe={sender === me} message={body} key={i}/>
                ))}
                <FootRef ref={msgFooter}/>        
            </ChatBoxWrapper>
        )
};
    
    const extractChat = (friend) => {
        console.log('messages in extract chat');
        console.log(messages);
        return displayChat(messages
            .filter (({sender, body}) => (((sender === friend) || (sender === me)))));
    }

    const createChatBox = (friend) => {
        // some function: returns true if an element fits the description
        if (chatBoxes.some(({key}) => key === friend)) {
            throw new Error(friend + "'s chat box has already opened.");
        }
        const chat = extractChat(friend);
        setChatBoxes([...chatBoxes,
        {label: friend, children: chat, key: friend}]);

        // startChat(me, friend);
        setMsgSent(true);
        return friend;
    };

    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({key}) => key === activeKey);
        const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
        setChatBoxes(newChatBoxes);
    }

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView();
        // msgFooter.current?.scrollIntoView({behavior: "smooth", block: "start"});
    };

		
    useEffect(() => {
        scrollToBottom();
        setMsgSent(false);
    }, [msgSent]);

    useEffect(() => {
        let newChatBoxes = chatBoxes;
        for(let i=0; i<chatBoxes.length; i++){
            const filtered_messages = messages.filter (({sender, body}) => 
                (((sender === chatBoxes[i].key) || (sender === me))));
            let res = filtered_messages.map(({name, body}) => {
                return( <Message isMe={name === me} name={name} message={body} />);
            })
            newChatBoxes[i].children = [res]
        }
        setMsgSent(true);
        setChatBoxes(newChatBoxes);
    }, [messages])

    return(
        <div>
            <Title name={me}/>
            <div>
                <ChatBoxesWrapper
                    tabBarStyle={{height: '36px'}}
                    type='editable-card'
                    activeKey={activeKey}
                    onChange={(key) => {    // change active chatbox, update messages
                        setActiveKey(key);
                        extractChat(key);
                        // startChat(me,key);
                    }}
                    onEdit={(targetKey, action) => {
                        if (action === 'add') setModalOpen(true);
                        else if (action === 'remove') {
                            setActiveKey(removeChatBox(targetKey, activeKey));
                        }
                    }}
                    items={chatBoxes}
                />
                <ChatModal
                    open={modalOpen}
                    // onCreate={({name}) => {
                    //     setActiveKey(createChatBox(name));
                    //     extractChat(name);
                    //     setModalOpen(false);
                    // }}
                    onCreate={async ({ name }) => {
                        // setFriend(name);
                        await startChat({
                        variables: { name1: me, name2: name }
                        });
						setActiveKey(createChatBox(name));
                    	await chatBoxQuery({
							variables: { name1: me, name2: name }
						});
                        
                        // try {
                        //     subscribeToMore({
                        //         document: MESSAGE_SUBSCRIPTION,
                        //         variables: { from: me, to: name },
                        //         updateQuery: (prev, { subscriptionData }) => {
                        //             // console.log(subscriptionData);
                        //             if (!subscriptionData.data) return prev;
                        //             const newMessage = subscriptionData.data.message.message;
                        //             return {
                        //                 chatBox: {
                        //                     messages: [...prev.chatBox.messages, newMessage],
                        //                 }};
                        //         }});
                        // } catch (e) { 
                        //     console.log('error occured');
                        //     console.error(e); 
                        // }
                        extractChat(name);
                        setModalOpen(false);
                    }}
                    onCancel={() => {
                        setModalOpen(false);
                    }}
                />
            </div>
            <Input.Search
                value = {msg}
                onChange={(e) => setMsg(e.target.value)}
                enterButton= 'Send'
                placeholder = 'Type a message here...'
                onSearch={(msg) => {
                    if(!msg){
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter message.'
                        })
                        return;
                    }else if (activeKey === ''){
                        displayStatus({
                            type: 'error',
                            msg: 'Please add a chatbox first.',
                        });
                        setMsg('');
                        return;
                    }
                    sendMessage({name: me, to: activeKey, body: msg})
                    setMsg('')
                    setMsgSent(true);
                }}
            />
        </div>
    );

}

export default ChatRoom;