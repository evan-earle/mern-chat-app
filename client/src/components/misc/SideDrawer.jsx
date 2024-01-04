import { ChatState } from "../../context/ChatProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, Fragment } from "react";
import { Dropdown } from "../misc/Dropdown.jsx";
import { Notification } from "./Notification.jsx";
import { Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { UserListItem } from "../userItems/UserListItem.jsx";

export const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const { user, setSelectedChat, chats, setChats, notification } = ChatState();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setSearch("");
    setSearchResult([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (!search) {
      toast.error("Enter search");
    } else {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/users?search=${search}`);
        setLoading(false);
        setSearchResult(data);
      } catch (err) {
        toast.error("Failed to load search results");
        console.log(err);
      }
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const { data } = await axios.post(`/api/chat`, { userId });
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      setIsOpen(false);
    } catch (err) {
      toast.error("Error fetching the chat");
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-full  border-4 items-center flex justify-between bg-white  ">
        <button
          className="ml-2 p-2 rounded flex  justify-between items-center hover:bg-slate-200 duration-300 "
          onClick={toggleDrawer}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <h3 className="max-md:hidden ml-3">Search User</h3>
        </button>
        <div className="max-sm:mr-16">
          <h1 className="text-2xl">Skyward</h1>
        </div>
        <div className="flex h-full items-center w-80 justify-between mr-6 max-sm:justify-end max-sm:w-0 ">
          <h3 className="max-md:hidden ">{user.name}</h3>
          <div className="max-sm:mr-4">
            <Notification notification={notification} />
          </div>
          <button className="rounded h-12 flex items-center cursor-default">
            <img
              className="w-10 h-10 rounded-full max-md:hidden"
              src={user.image}
              alt="profile-photo"
            />
          </button>
          <div>
            <Dropdown />
          </div>
        </div>
      </div>

      <Transition
        appear={true}
        show={isOpen}
        as={Fragment}
        enter="transition-opacity ease-in duration-250"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition-opacity ease-out duration-250"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
          <div className="top-0 left-0 fixed w-3/12 bg-white  text-black  h-full overflow-y-scroll pb-4 max-lg:w-4/12 max-md:w-5/12 max-sm:w-full ">
            <div className="flex w-full justify-between p-4 border-b-2 pl-6 pr-6">
              <h3 className="text-2xl text-">Search Users</h3>
              <button onClick={toggleDrawer}>
                <FontAwesomeIcon icon={faXmark} className="cursor-pointer" />
              </button>
            </div>
            <div className="p-4 flex justify-between w-full  ">
              <input
                type="text"
                placeholder="Search by name or email"
                className="border-2 w-full rounded p-2 focus:outline-none focus:border-blue-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button
                onClick={handleSearch}
                className=" items-center text-black rounded bg-gray-300 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-gray-500 ml-3"
              >
                Go
              </button>
            </div>
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
                  margins={"p-4 mt-2"}
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat ? (
              <Oval
                visible={true}
                height="30"
                width="30"
                color="white"
                secondaryColor="grey"
                ariaLabel="oval-loading"
                wrapperStyle={{ justifyContent: "center", marginTop: "1rem" }}
              />
            ) : null}
          </div>
        </div>
      </Transition>
    </>
  );
};
