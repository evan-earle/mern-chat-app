/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <>
      <div className="flex items-center bg-blue-500 text-white p-1 m-1 pl-2 pr-2 rounded-lg  ">
        <div className="mr-1 ">{user.name}</div>
        <div onClick={handleFunction}>
          <FontAwesomeIcon icon={faXmark} className="cursor-pointer flex" />
        </div>
      </div>
    </>
  );
};
