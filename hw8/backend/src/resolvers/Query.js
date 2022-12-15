const Query = {
  chatbox: async (parent, { name }, { ChatBoxModel }) => {
    console.log(name);
    console.log(ChatBoxModel);
    let box = await ChatBoxModel.findOne({ name });
    if (!box)
      box = await new ChatBoxModel({ name }).save();
    return box;
  }
};

export { Query as default };
