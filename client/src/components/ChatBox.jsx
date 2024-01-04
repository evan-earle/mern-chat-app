/* eslint-disable react/prop-types */
import { ChatState } from "../context/ChatProvider";
import { SingleChat } from "./SingleChat";

export const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div
      className={`${
        selectedChat ? "max-lg:ml-4" : "max-lg:hidden "
      } flex flex-col w-full mt-4 mr-4 bg-white p-2 rounded overflow-hidden pl-2 pr-2 items-center border-4`}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};
