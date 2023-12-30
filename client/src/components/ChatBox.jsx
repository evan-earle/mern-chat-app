import { ChatState } from "../context/ChatProvider";

export const ChatBox = () => {
  const { selectedChat } = ChatState();

  return <div>ChatBox</div>;
};
