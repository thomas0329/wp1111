import { makeName } from "./utilities";

const Query = {
  chatbox: async (parent, { name1, name2 }, { ChatBoxModel }) => {
    const chatBoxName = makeName(name1, name2);
    let box = await ChatBoxModel.findOne({ name: chatBoxName });
    if (!box)
      box = await new ChatBoxModel({ name: chatBoxName }).save();
    return box;
  }
};

export { Query as default };
