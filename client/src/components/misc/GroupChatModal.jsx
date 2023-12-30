/* eslint-disable react/prop-types */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ChatState } from "../../context/ChatProvider";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { UserListItem } from "../userItems/UserListItem";
import { useEffect } from "react";
import { UserBadgeItem } from "../userItems/UserBadgeItem";

export const GroupChatModal = ({ isOpen, toggleModal }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const cancelButtonRef = useRef(null);
  const { user, chats, setChats } = ChatState();

  useEffect(() => {
    setSearchResult([]);
    setSelectedUsers([]);
  }, [toggleModal]);

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      setSearchResult([]);
    }
    try {
      if (query) {
        setLoading(true);
        const { data } = await axios.get(`/api/users?search=${query}`);
        setLoading(false);
        setSearchResult(data);
      }
    } catch (error) {
      toast.error("Failed to load search results");
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const { data } = await axios.post(`/api/chat/group`, {
        name: groupChatName,
        users: selectedUsers.map((user) => user._id),
      });
      setChats([data, ...chats]);
      toggleModal();
      toast.success("New group chat created");
    } catch (error) {
      toast.error("User already added");
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.error("User already added");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (deletedUser) => {
    setSelectedUsers(
      selectedUsers.filter((user) => user._id !== deletedUser._id)
    );
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {}}
      >
        <Transition.Child
          show={isOpen}
          as={Fragment}
          enter="transition-opacity ease-in duration-250"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition-opacity ease-out duration-250"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen h-screen">
          <div className="flex h-full items-center overflow-hidden justify-center p-4 text-center sm:items-center sm:p-0  ">
            <Transition.Child
              as={Fragment}
              show={isOpen}
              enter="transition-opacity ease-in duration-250"
              enterFrom="transform opacity-0"
              enterTo="transform opacity-100"
              leave="transition-opacity ease-out duration-250"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="flex h-3/5 flex-col w-1/4 overflow-hidden rounded-lg bg-white text-left ">
                <div className="flex ">
                  <div className="flex w-full justify-center items-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                    <h3 className="text-2xl items-center font-semibold leading-6 text-gray-900 ">
                      Create Group Chat
                    </h3>
                  </div>
                  <div className="p-4">
                    <button onClick={toggleModal}>
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="cursor-pointer "
                      />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col ml-4 mr-4 pt-1">
                  <input
                    type="text"
                    placeholder="Chat name"
                    className="border-2 w-full rounded p-2 mb-3 focus:outline-none focus:border-blue-400"
                    onChange={(e) => setGroupChatName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Add users"
                    className="border-2 w-full rounded p-2 focus:outline-none focus:border-blue-400"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
                <div className="flex cursor-pointer flex-wrap  justify-center w-full pl-2 pr-2 mt-1">
                  {selectedUsers.map((user) => (
                    <UserBadgeItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleDelete(user)}
                    />
                  ))}
                </div>
                <div className="flex flex-col h-full overflow-y-scroll pt-1 mt-2">
                  {loading ? (
                    <Oval
                      visible={true}
                      height="30"
                      width="30"
                      color="white"
                      secondaryColor="grey"
                      ariaLabel="oval-loading"
                      wrapperStyle={{ justifyContent: "center" }}
                    />
                  ) : (
                    searchResult.map((user) => (
                      <UserListItem
                        margins="p-1 mt-1"
                        key={user._id}
                        user={user}
                        handleFunction={() => handleGroup(user)}
                      />
                    ))
                  )}
                </div>
                <div className=" px-4 py-1 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-1 mb-2 rounded p-1 pl-3 pr-3 text-center bg-blue-500 text-white"
                    onClick={handleSubmit}
                  >
                    Create chat
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
