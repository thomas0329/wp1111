// import uuidv4 from 'uuid/v4';
import {v4 as uuidv4} from 'uuid';
import ChatBoxModel from '../models/chatbox'

const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

const checkOutChatBox = async (name1, name2) => {
  
  const chatBoxName = makeName(name1, name2);
  let box = await ChatBoxModel.findOne({name: chatBoxName});
  if (!box)
    box = await new ChatBoxModel({name: chatBoxName}).save();
  return box;
}

const Mutation = {

  createChatBox: (parent, { name1, name2 }, { ChatBoxModel } ) => {
    return checkOutChatBox(name1, name2);
  },
  createMessage: async (parent, { name, to, body }, { pubsub } ) => {
    console.log("createMessage called");
    console.log(name);
    console.log(to);
    console.log(body);
    const chatBox = await checkOutChatBox(name, to);
    const newMsg = { sender: name, body };
    chatBox.messages.push(newMsg);
    await chatBox.save();
    const chatBoxName = makeName(name, to);
    pubsub.publish(`chatBox ${chatBoxName}`, {
      message: newMsg,
    });
    return newMsg;
  }
};

export { Mutation as default };
