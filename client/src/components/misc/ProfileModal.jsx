import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ChatState } from "../../context/ChatProvider";

export const ProfileModal = ({ isOpen, toggleModal }) => {
  const cancelButtonRef = useRef(null);
  const { user } = ChatState();

  return (
    <Transition.Root show={isOpen} as={Fragment} appear={true}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {}}
      >
        <Transition.Child
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              appear={true}
              show={isOpen}
              enter="transition-opacity ease-in duration-250"
              enterFrom="transform opacity-0"
              enterTo="transform opacity-100"
              leave="transition-opacity ease-out duration-250"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="">
                      <img
                        src={user.image}
                        alt="profile-photo"
                        className="w-40 h-40"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left ">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-semibold leading-6 text-gray-900 "
                      >
                        {user.name}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-1xl text-gray-500">
                          Email: {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md items-center bg-gray-200 hover:bg-slate-300  h-12  duration-300  px-3 py-2 text-sm font-semibold shadow-sm  sm:ml-3 sm:w-auto"
                    onClick={toggleModal}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
