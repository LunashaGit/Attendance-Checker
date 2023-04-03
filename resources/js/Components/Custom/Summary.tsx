import React, { useState, useEffect, Fragment } from "react";
import GithubPicture from "./GithubPicture";
import { Transition, Dialog } from "@headlessui/react";
type Users = {
    email: string;
    first_name: string;
    last_name: string;
    percentage: number;
    github_id: number;
};
export default function Summary(props) {
    const [users, setUsers] = useState<Users[]>([]);
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [clickedUser, setClickedUser] = useState<Users>({
        email: "",
        first_name: "",
        last_name: "",
        percentage: 0,
        github_id: 0,
    });

    useEffect(() => {
        setUsers(props.infos);
    }, [props.infos]);

    console.log(isClicked);
    console.log(clickedUser);
    return (
        <div>
            {users && (
                <table className="w-full my-8 border-red-500 border-2 text-white">
                    <thead className="border-red-500 border-2">
                        <tr className="text-left">
                            <th className="w-16 p-2 bg-[#373f50] border-[#202c34] border-2">
                                {" "}
                            </th>
                            <th className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                Firstname
                            </th>
                            <th className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                Lastname
                            </th>
                            <th className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                Average
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={index}
                                className="text-left hover:bg-[#202c34] cursor-pointer p-2"
                                onClick={() => {
                                    setIsClicked(true);
                                    setClickedUser(user);
                                }}
                            >
                                <td className=" bg-[#373f50] border-[#202c34] border-2">
                                    <GithubPicture
                                        className="h-16 w-16"
                                        user={user.github_id}
                                    />
                                </td>
                                <td className=" bg-[#373f50] border-[#202c34] border-2 p-2">
                                    {user.first_name}
                                </td>
                                <td className=" bg-[#373f50] border-[#202c34] border-2 p-2">
                                    {user.last_name}
                                </td>
                                <td className=" bg-[#373f50] border-[#202c34] border-2 p-2">
                                    <div className="bg-gray-800 rounded-lg">
                                        <div
                                            role="progressbar"
                                            aria-valuenow={100}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            className="h-4 bg-gray-200 rounded-lg text-center font-semibold text-xs text-white"
                                            style={{
                                                width: `${
                                                    (user.percentage &&
                                                        user.percentage) ||
                                                    0
                                                }%`,
                                            }}
                                        >
                                            {(user.percentage &&
                                                user.percentage
                                                    .toString()
                                                    .slice(0, 5)) ||
                                                0}
                                            %
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* <Transition
                show={isClicked}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#373f50] w-1/2 h-1/2 rounded-lg flex flex-col justify-center items-center">
                        <GithubPicture
                            className="h-16 w-16"
                            user={clickedUser.github_id}
                        />
                        <p className="text-white text-2xl">
                            {clickedUser.first_name} {clickedUser.last_name}
                        </p>
                        <p className="text-white text-2xl">
                            {clickedUser.percentage}%
                        </p>
                        <button
                            className="bg-red-500 text-white rounded-lg p-2"
                            onClick={() => {
                                setIsClicked(false);
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Transition> */}

            <Transition appear show={isClicked} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => {
                        setIsClicked(false);
                    }}
                >
                    <div className="min-h-screen px-4 text-center bg-black bg-opacity-40">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}

                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#373f50] shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-white"
                                >
                                    {clickedUser.first_name}{" "}
                                    {clickedUser.last_name}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <GithubPicture
                                        className="h-16 w-16 rounded-lg"
                                        user={clickedUser.github_id}
                                    />
                                    <p className="text-sm text-white">
                                        {clickedUser.percentage}%
                                    </p>

                                    <div className="bg-gray-800 rounded-lg">
                                        <div
                                            role="progressbar"
                                            aria-valuenow={100}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            className="h-4 bg-gray-200 rounded-lg text-center font-semibold text-xs text-white"
                                            style={{
                                                width: `${
                                                    (clickedUser.percentage &&
                                                        clickedUser.percentage) ||
                                                    0
                                                }%`,
                                            }}
                                        >
                                            {(clickedUser.percentage &&
                                                clickedUser.percentage
                                                    .toString()
                                                    .slice(0, 5)) ||
                                                0}
                                            %
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
