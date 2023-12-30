import { ChatState } from "../context/ChatProvider";
import { SideDrawer } from "../components/misc/SideDrawer";
import { MyChats } from "../components/MyChats";
import { ChatBox } from "../components/ChatBox";
import Night from "../assets/Night.jpg";
import { useState } from "react";

export const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div
      className="bg-no-repeat bg-cover bg-center flex flex-col h-screen"
      style={{ backgroundImage: `url(${Night})` }}
    >
      {user && <SideDrawer />}
      {user && <MyChats fetchAgain={fetchAgain} />}
      {/* <ChatBox /> */}
    </div>
  );
};
