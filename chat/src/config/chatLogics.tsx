interface User {
  _id: string;
  name: string;
  image: string;
  email: string;
  token?: string;
}

interface Message {
  _id: string;
  content: string;
  sender: User;
  chat: {
    _id: string;
    chatName: string;
    isGroupChat: boolean;
    users: User[];
    latestMessage: Message;
  };
}


export const getSender = (loggedUser: User, users: User[]): string => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};


export const isSameSender = (
  messages: Message[],
  m: Message,
  i: number,
  userId: string
): boolean => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};


export const isLastMessage = (
  messages: Message[],
  i: number,
  userId: string
): boolean => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    !!messages[messages.length - 1].sender._id
  );
};
