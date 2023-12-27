import { useEffect, useState } from "react";
// import axios from "axios";

export const ChatPage = () => {
  const [chats, setChats] = useState([]);

  // const fetchChats = async () => {
  //   const { data } = await axios.get("/api/chat");
  //   setChats(data);
  // };

  // useEffect(() => {
  //   fetchChats();
  // }, []);

  return (
    <div>
      Chats
      <p className=" w-full h-50 rounded-md text-center flex p-5 justify-center leading-7 font-montserrat bg-red-800 sm:max-w-sm">
        Get skates for the upcoming season at your nearest CCM store. Find your
        perfect size in store.
      </p>
    </div>
  );
};
