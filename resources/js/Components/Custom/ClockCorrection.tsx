import React, { useState, useEffect } from "react";
import axios from "axios";
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
        <div className="flex flex-col gap-2">
            {data.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="flex flex-row gap-2 items-center"
                    >
                        <p className="truncate w-32 text-center">
                            {item.user.first_name + " " + item.user.last_name}
                        </p>
                        <form className="flex flex-row gap-4 justify-center items-center">
                            <input
                                type="time"
                                name="beginning"
                                id="beginning"
                                defaultValue={item.beginning}
                                className="text-center"
                                onChange={(e) =>
                                    handleChange(e, item.id, "beginning")
                                }
                            />
                            <input
                                type="time"
                                name="lunch"
                                defaultValue={item.lunch}
                                className="text-center"
                                onChange={(e) =>
                                    handleChange(e, item.id, "lunch")
                                }
                            />
                            <input
                                type="time"
                                name="return"
                                defaultValue={item.return}
                                className="text-center"
                                onChange={(e) =>
                                    handleChange(e, item.id, "return")
                                }
                            />
                            <input
                                type="time"
                                name="end"
                                defaultValue={item.end}
                                className="text-center"
                                onChange={(e) =>
                                    handleChange(e, item.id, "end")
                                }
                            />
                            {item.location === "Campus" ? (
                                <div className="flex flex-row gap-2">
                                    <button disabled>Campus</button>
                                    <button
                                        value={"Remote"}
                                        onClick={(e) =>
                                            handleChange(e, item.id, "location")
                                        }
                                    >
                                        Remote
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-row gap-2">
                                    <button
                                        value={"Campus"}
                                        onClick={(e) =>
                                            handleChange(e, item.id, "location")
                                        }
                                    >
                                        Campus
                                    </button>
                                    <button disabled>Remote</button>
                                </div>
                            )}
                        </form>
                    </div>
                );
            })}
        </div>
    );
}
