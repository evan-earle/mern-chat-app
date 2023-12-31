/* eslint-disable react/prop-types */

export const UserListItem = ({ user, handleFunction, margins }) => {
  return (
    <>
      <div
        onClick={handleFunction}
        className={` ${margins}  ml-4 mr-4  flex bg-gray-300 rounded-lg cursor-pointer hover:bg-slate-500`}
      >
        <img
          src={user.image}
          width={40}
          height={40}
          alt="profile-photo"
          className="rounded-full"
        />

        <div className="flex-col ml-4">
          <div>{user.name}</div>
          <div className="text-sm">
            <b>Email:</b> {user.email}
          </div>
        </div>
      </div>
    </>
  );
};
