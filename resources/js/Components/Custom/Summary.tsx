import React, { useState, useEffect } from "react";
type Users = {
    emaill: string;
    first_name: string;
    last_name: string;
    percentage: number;
};
export default function Summary(props) {
    const [users, setUsers] = useState<Users[]>([]);

    useEffect(() => {
        setUsers(props.infos);
    }, [props.infos]);

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
                            >
                                <td className=" bg-[#373f50] border-[#202c34] border-2 p-2">
                                    {index + 1}
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
        </div>
    );
}
