import { ChatState } from "../context/ChatProvider";
import { SideDrawer } from "../components/misc/SideDrawer";
import { MyChats } from "../components/MyChats";
import { ChatBox } from "../components/ChatBox";
import Night from "../assets/night.jpg";
import { useState } from "react";

export const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <>
      <div
        className="bg-no-repeat bg-cover bg-center flex flex-col h-screen "
        style={{ backgroundImage: `url(${Night})` }}
      >
        {user && <SideDrawer />}
        <div className="flex overflow-hidden h-full mb-4 ">
          {user && <MyChats fetchAgain={fetchAgain} />}
          {user && (
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </div>
      </div>
    </>
  );
};
