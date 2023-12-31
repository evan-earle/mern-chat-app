import { ChatState } from "../context/ChatProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { ProfileModal } from "./misc/ProfileModal";
import { UpdateGroupChatModal } from "./misc/updateGroupChatModal";
import { useState } from "react";

export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [isOpen, setIsOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const toggleGroupModal = () => {
    setIsGroupOpen(!isGroupOpen);
  };

  return (
    <>
      {selectedChat && (
        <>
          <ProfileModal
            user={getSenderFull(user, selectedChat.users)}
            toggleModal={toggleModal}
            isOpen={isOpen}
          />
          <UpdateGroupChatModal
            toggleGroupModal={toggleGroupModal}
            isGroupOpen={isGroupOpen}
          />
        </>
      )}
      <div className="flex h-full w-full items-center justify-between ">
        {selectedChat ? (
          <>
            <div className="flex flex-col h-full w-full justify-between">
              <div className="flex justify-between h-12 mb-4">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className={`cursor-pointer bg-gray-200 hover:bg-slate-300 duration-300  justify-center  rounded-lg p-3 m-2  ${
                    selectedChat ? "lg:hidden" : null
                  }`}
                  onClick={() => setSelectedChat("")}
                />

                {!selectedChat.isGroupChat ? (
                  <>
                    <h3 className="text-3xl p-3 ">
                      {getSender(user, selectedChat.users)}
                    </h3>

                    <FontAwesomeIcon
                      onClick={toggleModal}
                      icon={faUser}
                      className={`cursor-pointer text-gray-500 bg-gray-200 hover:bg-slate-300 duration-300  justify-center  rounded-lg p-3 m-2  
                    }`}
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-3xl p-3">
                      {selectedChat.chatName.toUpperCase()}
                    </h3>
                    <FontAwesomeIcon
                      onClick={toggleGroupModal}
                      icon={faUser}
                      className={`cursor-pointer text-gray-500 bg-gray-200 hover:bg-slate-300 duration-300  justify-center  rounded-lg p-3 m-2  
                    }`}
                    />
                  </>
                )}
              </div>
              <div className="flex flex-col h-full w-full   bg-slate-200 p-2   pt-0 rounded "></div>
            </div>
          </>
        ) : (
          <div className="flex items-center w-full h-full justify-center  ">
            <h3 className="text-2xl">Click on a chat to start chatting</h3>
          </div>
        )}
      </div>
    </>
  );
};
