import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ProfileModal } from "./ProfileModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ChatState } from "../../context/ChatProvider";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, setUser, setSelectedChat } = ChatState();

  const navigate = useNavigate();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      setSelectedChat();
      localStorage.removeItem("userInfo");
      toast.success("Logged out");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ProfileModal toggleModal={toggleModal} isOpen={isOpen} user={user} />
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="hover:bg-slate-200  bg-slate-100 duration-300 inline-flex w-full justify-center gap-x-1.5 rounded-md  p-1  text-sm font-semibold text-black ">
            <ChevronDownIcon
              className="flex h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
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
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={toggleModal}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 cursor-pointer"
                        : "text-gray-700",
                      "block px-4 py-2 text-sm cursor-pointer"
                    )}
                  >
                    My Profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    onClick={handleLogout}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 cursor-pointer"
                        : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm cursor-pointer"
                    )}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
