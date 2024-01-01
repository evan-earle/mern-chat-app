export const getSender = (loggedUser, users) => {
  if (users && loggedUser) {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  } else {
    null;
  }
};

export const getSenderFull = (loggedUser, users) => {
  if (users && loggedUser) {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  } else {
    null;
  }
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender === undefined ||
      messages[i + 1].sender._id !== m.sender._id) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderJustify = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return "start";
  else
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId);
  return "end";
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
