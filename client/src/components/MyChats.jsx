/* eslint-disable react/prop-types */
import { ChatState } from "../context/ChatProvider";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { getSender } from "../config/ChatLogics.jsx";
import { GroupChatModal } from "./misc/GroupChatModal.jsx";

export const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const { data } = await axios.get(`/api/chat`);
      setChats(data);
    } catch (err) {
      toast.error("Failed to load chats");
      console.log(err);
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <>
      <GroupChatModal toggleModal={toggleModal} isOpen={isOpen} />
      <div
        className={`flex flex-col w-2/5 mt-4 ml-4  bg-white p-2 rounded pl-2 pr-2 items-center border-4
          ${selectedChat ? "max-lg:hidden" : "max-lg:w-full"}`}
      >
        <div className="flex justify-between h-12 w-full items-center mb-4 ">
          <h3 className="text-2xl ml-2">My Chats</h3>
          <button
            className="cursor-pointer bg-gray-200  hover:bg-slate-300 rounded h-12 w-40 duration-300"
            onClick={toggleModal}
          >
            New Group Chat +
          </button>
        </div>

        {chats ? (
          <div className="flex flex-col h-full w-full overflow-y-scroll overflow-x-hidden   bg-slate-200 p-2   pt-0 rounded ">
            {chats.map((chat) => (
              <div
                key={chat._id}
                className={`flex cursor-pointer w-full p-2 mt-3 rounded-lg  hover:bg-slate-400 duration-300  ${
                  selectedChat === chat
                    ? "bg-gray-600 text-white"
                    : "bg-slate-300"
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <img
                  src={chat.users[1].image}
                  alt="profile-photo"
                  className="rounded-full w-12 h-12"
                />
                <div className="flex-col ml-4">
                  <div>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Oval
            visible={true}
            height="30"
            width="30"
            color="white"
            secondaryColor="grey"
            ariaLabel="oval-loading"
            wrapperStyle={{ justifyContent: "center" }}
          />
        )}
      </div>
    </>
  );
};
