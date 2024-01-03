/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { getSender } from "../../config/ChatLogics";
import { ChatState } from "../../context/ChatProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);

  const { user, setUser, setSelectedChat, notification, setNotification } =
    ChatState();

  useEffect(() => {
    setCount(notification.length);
  }, [notification.length]);

  return (
    <>
      <Menu as="div" className="relative h-full inline-block text-left">
        <div className="flex h-full  ">
          <Menu.Button>
            <div>
              <FontAwesomeIcon
                icon={faBell}
                className="cursor-pointer text-2xl"
              />
              {count > 0 && (
                <div className="absolute w-full mb-3 top-0 left-2 border-2 border-black rounded-full bg-red-500 text-sm font-semibold">
                  {count}
                </div>
              )}
            </div>
          </Menu.Button>
        </div>
        <Transition
          appear={true}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute  right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-1 items-center flex flex-col cursor-pointer hover:bg-gray-100">
              <Menu.Item>
                <div className="flex flex-col justify-center pl-3">
                  {!notification.length && "No new messages"}
                  {notification.map((notif) => (
                    <div
                      key={notif._id}
                      onClick={() => {
                        setSelectedChat(notif.chat);
                        setNotification(
                          notification.filter((n) => n !== notif)
                        );
                      }}
                    >
                      {notif.chat.isGroupChat
                        ? `New message in ${notif.chat.chatName}`
                        : `New message from ${getSender(
                            user,
                            notif.chat.users
                          )}`}
                    </div>
                  ))}
                </div>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
