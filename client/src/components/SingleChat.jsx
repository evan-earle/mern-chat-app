/* eslint-disable react/prop-types */
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
import { UpdateGroupChatModal } from "./misc/UpdateGroupChatModal";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import io from "socket.io-client";
import { Typing } from "../animations/typing";

const ENDPOINT = "https://mern-chat-2kmu.onrender.com";
//http://localhost:3001
//https://mern-chat-2kmu.onrender.com
let socket, selectedChatCompare;

export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
  const [isOpen, setIsOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(typing);

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
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast.error("Failed to load messages");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (
          !notification.includes(newMessageReceived) &&
          checkForDuplicates(
            newMessageReceived.sender._id,
            newMessageReceived.chat._id
          )
        ) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const checkForDuplicates = (senderId, chatId) => {
    let sender = notification.map((s) => s.sender._id);
    let chat = notification.map((c) => c.chat._id);

    if (sender.includes(senderId) && !chat.includes(chatId)) {
      return true;
    } else if (sender.includes(senderId) && chat.includes(chatId)) {
      return false;
    }
    return true;
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        setNewMessage("");
        const { data } = await axios.post(`/api/message`, {
          content: newMessage,
          chatId: selectedChat._id,
        });
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error("Failed to send message");
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    //typing indicator logic

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    // let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      // let timeNow = new Date().getTime();
      // let timeDiff = timeNow - lastTypingTime;

      if (typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const convertDate = (date) => {
    const s = new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    return s;
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
            <div className="flex flex-col h-full w-full justify-between ">
              <div className="flex h-14 justify-between mb-2">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className={`cursor-pointer bg-gray-200 hover:bg-slate-300 duration-300  justify-center  rounded-lg p-3 m-2  ${
                    selectedChat ? "lg:hidden" : null
                  }`}
                  onClick={() => setSelectedChat("")}
                />

                {!selectedChat.isGroupChat ? (
                  <>
                    <h3 className="text-3xl p-3 h-14 flex justify-center text-center  max-sm:text-xl max-sm:flex max-sm:flex-col ">
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
                    <h3 className="text-3xl p-3 h-14 flex justify-center text-center  max-sm:text-xl max-sm:flex max-sm:flex-col">
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
                  <div className={`flex flex-col w-full overflow-y-auto`}>
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
                            <div className="flex flex-col justify-end">
                              {isSameSender(messages, m, i, user._id) &&
                                isLastMessage(messages, m, i, user._id) && (
                                  <>
                                    <img
                                      className="w-10 h-10 rounded-full mr-1 max-sm:w-7 max-sm:h-7 "
                                      src={m.sender.image}
                                      alt="sender-image"
                                    />
                                  </>
                                )}
                            </div>
                            <div>
                              <div
                                ref={messagesEndRef}
                                className={`max-w-2xl rounded-lg p-2 px-4 min-w-40 max-sm:max-w-1 max-sm:px-2 max-sm:py-2  ${
                                  m.sender._id === user._id
                                    ? "bg-slate-500"
                                    : `bg-blue-500 ${
                                        isSameSender(
                                          messages,
                                          m,
                                          i,
                                          user._id
                                        ) &&
                                        isLastMessage(messages, i, user._id)
                                          ? null
                                          : "ml-11"
                                      }`
                                }`}
                              >
                                <div className="flex flex-col h-full ">
                                  {m.chat.isGroupChat ? (
                                    <div className="text-black font-semibold text-xs">
                                      {isSameSender(messages, m, i, user._id) &&
                                        m.sender.name}
                                    </div>
                                  ) : null}
                                  <div className="text-white text-base max-sm:text-sm">
                                    {m.content}
                                  </div>
                                  <div className="flex justify-end text-xs font-semibold ">
                                    {convertDate(m.createdAt)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                <div className="mt-4 w-full">
                  {isTyping ? (
                    <div className="w-full">
                      <Typing />
                    </div>
                  ) : (
                    <></>
                  )}
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
