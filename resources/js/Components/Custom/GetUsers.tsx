import React, { useState, useEffect } from "react";
import { Auth } from "@/Types/Auth";
import axios from "axios";

type Props = {
    auth: Auth;
    users: Object[];
};
type User = {
    name: string;
    is_coach: boolean;
    section: {
        name: string;
    };
};

export default function GetUsers(props: Props) {
    const [users, setUsers] = useState(props.users);
    const [search, setSearch] = useState<string>("");
    console.log(users);
    useEffect(() => {
        setTimeout(() => {
            axios
                .get("/api/users", {
                    params: {
                        search: search,
                    },
                })
                .then((res) => {
                    setUsers(res.data.users);
                });
        }, 1000);
    }, [search]);

    return (
        <div className="w-5/6 mx-auto my-4">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-3xl font-semibold text-white">Who's who</h1>
                <form
                    onChange={(e) => {
                        e.preventDefault();
                        setSearch(e.target.value);
                    }}
                >
                    <input
                        className="rounded-lg bg-[#373f50] text-white"
                        type="text"
                        name="search"
                    />
                </form>
            </div>
            {users && (
                <table className="w-full my-8 border-red-500 border-2 text-white">
                    <thead className="border-red-500 border-2">
                        <tr className="text-left">
                            <th className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                Name
                            </th>
                            <th className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                Type
                            </th>
                            <th className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                Section
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: User) => {
                            return (
                                <tr className="text-left">
                                    <td className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                        {user.name}
                                    </td>
                                    <td className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                        {user.is_coach ? "Coach" : "Junior"}
                                    </td>
                                    <td className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                        {user.section.name}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}
