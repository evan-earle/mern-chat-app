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
