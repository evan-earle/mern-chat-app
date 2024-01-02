/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { getSender } from "../../config/ChatLogics";
import toast from "react-hot-toast";
import { ChatState } from "../../context/ChatProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, setUser, setSelectedChat, notification, setNotification } =
    ChatState();

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
            <FontAwesomeIcon icon={faBell} className="cursor-pointer" />
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
            <div className="p-1 items-center flex flex-col">
              <Menu.Item>
                <div>
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
                      {/* {({ active }) => (
                        <a
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900 cursor-pointer"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm cursor-pointer"
                          )}
                        ></a>
                      )} */}
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
