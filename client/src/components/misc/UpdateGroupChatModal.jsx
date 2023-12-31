/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ChatState } from "../../context/ChatProvider";
import toast from "react-hot-toast";
import { UserBadgeItem } from "../userItems/UserBadgeItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const UpdateGroupChatModal = ({
  fetchAgain,
  setFetchAgain,
  isGroupOpen,
  toggleGroupModal,
}) => {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const cancelButtonRef = useRef(null);
  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleRemove = () => {};

  const handleRename = () => {};

  const handleSearch = () => {};

  return (
    <Transition.Root show={isGroupOpen} as={Fragment} appear={true}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {}}
      >
        <Transition.Child
          appear={true}
          show={isGroupOpen}
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex h-full items-center overflow-hidden justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              show={isGroupOpen}
              enter="transition-opacity ease-in duration-250"
              enterFrom="transform opacity-0"
              enterTo="transform opacity-100"
              leave="transition-opacity ease-out duration-250"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="flex h-3/5 flex-col w-1/4 overflow-hidden rounded-lg bg-white text-left ">
                <div className="flex">
                  <div className="flex w-full justify-center items-center bg-white px-4 pb-4 pt-5 ">
                    <h3 className="text-2xl items-center font-semibold leading-6 text-gray-900 ">
                      {selectedChat.chatName}
                    </h3>
                  </div>
                  <div className="p-4">
                    <button onClick={toggleGroupModal}>
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="cursor-pointer"
                      />
                    </button>
                  </div>
                </div>
                <div className="flex cursor-pointer flex-wrap justify-center w-full mt-1">
                  {selectedChat.users.map((user) => (
                    <UserBadgeItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleRemove(user)}
                    />
                  ))}
                </div>

                <div className="w-full flex justify-center mt-4 items-center">
                  <div className="w-4/6">
                    <input
                      type="text"
                      placeholder="Chat name"
                      className="border-2 w-full rounded p-2 mb-3 focus:outline-none focus:border-blue-400"
                      onChange={(e) => setGroupChatName(e.target.value)}
                    />
                  </div>
                  <div className="ml-4">
                    <button
                      type="button"
                      className=" mb-3 rounded p-2 px-3 text-center bg-green-800 text-white"
                      onClick={handleRename}
                    >
                      Update
                    </button>
                  </div>
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Add user to group"
                    className="border-2 w-full rounded p-2 mb-3 focus:outline-none focus:border-blue-400"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
                <div className=" px-4 py-1 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-1 mb-2 rounded p-1 pl-3 pr-3 text-center bg-red-500 text-white"
                    onClick={() => handleRemove(user)}
                  >
                    Leave Group
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
