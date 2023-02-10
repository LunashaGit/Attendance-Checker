import React, { useState, useEffect } from "react";
import axios from "axios";
import GithubPicture from "@/Components/Custom/GithubPicture";
type Props = {
    date: string;
    section: string;
};
type Data = {
    id: number;
    location: string;
    beginning: string;
    lunch: string;
    return: string;
    end: string;
    date: string;
    user: {
        id: string;
        first_name: string;
        last_name: string;
        github_id: number;
    };
};

export default function ClockCorrection(props: Props) {
    const [data, setData] = useState<Array<Data>>([]);
    const [location] = useState<Array<string>>(["Campus", "Remote"]);
    useEffect(() => {
        axios
            .get("/api/attendance/check", {
                params: {
                    section_id: Number(props.section),
                    date: props.date,
                },
            })
            .then((res) => {
                setData(res.data);
            });
    }, [props.date, props.section]);
    function handleChange(e, id, column) {
        e.preventDefault();
        axios
            .put("/api/attendance/check", {
                id: id,
                column: column,
                value: e.target.value,
            })
            .then((res) => {
                setData(
                    data.map((item) => {
                        if (item.id === id) {
                            item[column] = e.target.value;
                        }
                        return item;
                    })
                );
            });
    }
    return (
        <div className="flex flex-col gap-2 text-white items-center justify-center dark:bg-gray-800 py-4 rounded-lg my-4">
            {data.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="flex flex-row gap-2 items-center justify-between w-10/12"
                    >
                        <div className="flex flex-row w-3/12 justify-center items-center gap-2">
                            <GithubPicture
                                className="h-16 w-16 rounded-lg"
                                user={item.user.github_id}
                            />
                            <p className="truncate w-32 text-left">
                                {item.user.first_name +
                                    " " +
                                    item.user.last_name}
                            </p>
                        </div>
                        <form className="w-9/12 flex flex-row gap-4 justify-center items-center text-black">
                            <div className=" flex flex-row justify-between items-center w-full">
                                <input
                                    type="time"
                                    name="beginning"
                                    id="beginning"
                                    defaultValue={item.beginning}
                                    className="text-center dark:bg-[#39435a] text-white rounded-lg text-base w-160"
                                    onChange={(e) =>
                                        handleChange(e, item.id, "beginning")
                                    }
                                />
                                <input
                                    type="time"
                                    name="lunch"
                                    defaultValue={item.lunch}
                                    className="text-center dark:bg-[#39435a] text-white rounded-lg text-base w-160"
                                    onChange={(e) =>
                                        handleChange(e, item.id, "lunch")
                                    }
                                />
                                <input
                                    type="time"
                                    name="return"
                                    defaultValue={item.return}
                                    className="text-center dark:bg-[#39435a] text-white rounded-lg w-160"
                                    onChange={(e) =>
                                        handleChange(e, item.id, "return")
                                    }
                                />
                                <input
                                    type="time"
                                    name="end"
                                    defaultValue={item.end}
                                    className="text-center dark:bg-[#39435a] text-white rounded-lg w-160"
                                    onChange={(e) =>
                                        handleChange(e, item.id, "end")
                                    }
                                />
                            </div>

                            <div className="flex flex-row gap-2 text-white">
                                {item.location === "Campus" ? (
                                    <>
                                        <button
                                            disabled
                                            className="text-white font-semibold rounded-lg px-4 py-2 dark:bg-[#39435a]"
                                        >
                                            Campus
                                        </button>
                                        <button
                                            className="text-white font-semibold rounded-lg px-4 py-2 bg-gray-500"
                                            value={"Remote"}
                                            onClick={(e) =>
                                                handleChange(
                                                    e,
                                                    item.id,
                                                    "location"
                                                )
                                            }
                                        >
                                            Remote
                                        </button>
                                    </>
                                ) : item.location === "Remote" ? (
                                    <>
                                        <button
                                            value={"Campus"}
                                            onClick={(e) =>
                                                handleChange(
                                                    e,
                                                    item.id,
                                                    "location"
                                                )
                                            }
                                            className="text-white font-semibold rounded-lg px-4 py-2 bg-gray-500"
                                        >
                                            Campus
                                        </button>
                                        <button
                                            disabled
                                            className="text-white font-semibold rounded-lg px-4 py-2 dark:bg-[#39435a]"
                                        >
                                            Remote
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            value={"Campus"}
                                            onClick={(e) =>
                                                handleChange(
                                                    e,
                                                    item.id,
                                                    "location"
                                                )
                                            }
                                            className="text-white font-semibold rounded-lg px-4 py-2 bg-red-500"
                                        >
                                            Campus
                                        </button>
                                        <button
                                            className="text-white font-semibold rounded-lg px-4 py-2 bg-red-500"
                                            value={"Remote"}
                                            onClick={(e) =>
                                                handleChange(
                                                    e,
                                                    item.id,
                                                    "location"
                                                )
                                            }
                                        >
                                            Remote
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                );
            })}
        </div>
    );
}
