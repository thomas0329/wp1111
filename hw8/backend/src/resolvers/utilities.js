import ChatBoxModel from '../models/chatbox';

const makeName = (name, to) => {
    return [name, to].sort().join('_');
};
const checkOutChatBox = async (name1, name2) => {
    const chatBoxName = makeName(name1, name2);
    let box = await ChatBoxModel.findOne({name: chatBoxName});
    if (!box)
        box = await new ChatBoxModel({name: chatBoxName}).save();
    return box;
};
export { makeName, checkOutChatBox };