import React, { useState, useEffect } from "react";
import GithubPicture from "./GithubPicture";
import { Transition } from "@headlessui/react";
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
    const [clickedUser, setClickedUser] = useState<Users>();

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
                                    {user.percentage}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Transition
                show={isClicked}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
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
            </Transition>
        </div>
    );
}
