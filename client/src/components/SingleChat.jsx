import { ChatState } from "../context/ChatProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  getSender,
  getSenderFull,
  isSameSender,
  isLastMessage,
  isSameSenderJustify,
  isSameUser,
} from "../config/ChatLogics";
import { ProfileModal } from "./misc/ProfileModal";
import { UpdateGroupChatModal } from "./misc/updateGroupChatModal";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";

export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [isOpen, setIsOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);

  const messagesEndRef = useRef(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const toggleGroupModal = () => {
    setIsGroupOpen(!isGroupOpen);
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/message/${selectedChat._id}`);
      setMessages(data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load messages");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        setNewMessage("");
        const { data } = await axios.post(`/api/message`, {
          content: newMessage,
          chatId: selectedChat._id,
        });

        setMessages([...messages, data]);
      } catch (error) {
        toast.error("Failed to send message");
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    //typing indicator logic
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
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            fetchMessages={fetchMessages}
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
              <div
                className={`flex flex-col h-full w-full overflow-y-hidden bg-slate-200 p-2 rounded justify-end  ${
                  loading ? "justify-between" : null
                }`}
              >
                {loading ? (
                  <>
                    <div></div>
                    <Oval
                      visible={true}
                      height="50"
                      width="50"
                      color="white"
                      secondaryColor="grey"
                      ariaLabel="oval-loading"
                      wrapperStyle={{
                        justifyContent: "center",
                      }}
                    />
                  </>
                ) : (
                  <div className={`flex flex-col  w-full overflow-y-auto`}>
                    {messages &&
                      messages.map((m, i) => (
                        <div
                          key={m._id}
                          className={`flex mt-${
                            isSameUser(messages, m, i, user._id) ? 1 : 4
                          }  justify-${isSameSenderJustify(
                            messages,
                            m,
                            i,
                            user._id
                          )} `}
                        >
                          <div className="flex ">
                            <div className="">
                              {isSameSender(messages, m, i, user._id) && (
                                // && isLastMessage(messages, i, user._id)
                                <img
                                  className="w-10 h-10 rounded-full mr-1 "
                                  src={m.sender.image}
                                  alt="sender-image"
                                />
                              )}
                            </div>
                            <div
                              ref={messagesEndRef}
                              className={`flex flex-col max-w-1/2 flex-wrap rounded-full p-2 px-4  ${
                                m.sender._id === user._id
                                  ? "bg-green-500"
                                  : `bg-blue-500 ${
                                      !isSameSender(messages, m, i, user._id)
                                        ? "ml-11"
                                        : null
                                    }`
                              }`}
                            >
                              {m.content}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                <div className="">
                  <input
                    className="border-2 w-full mt-4 rounded p-2 text-black bg-slate-300 focus:outline-none hover:bg-slate-100 duration-150 focus:border-blue-400"
                    onKeyDown={sendMessage}
                    onChange={typingHandler}
                    value={newMessage}
                    required
                    placeholder="Type a message..."
                  />
                </div>
              </div>
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
