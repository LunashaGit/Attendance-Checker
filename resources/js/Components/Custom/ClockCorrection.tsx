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
    console.log(data);
    return (
        <div className="flex flex-col gap-2">
            {data.map((item, index) => {
                return (
                    <div key={index}>
                        <div className="flex flex-row gap-2">
                            <p>{item.user.id}</p>
                            <p>{item.user.first_name}</p>
                            <p>{item.user.last_name}</p>
                        </div>
                        <form>
                            <input
                                type="time"
                                name="beginning"
                                id="beginning"
                                defaultValue={item.beginning}
                                onChange={(e) =>
                                    handleChange(e, item.id, "beginning")
                                }
                            />
                            <input
                                type="time"
                                name="lunch"
                                defaultValue={item.lunch}
                                onChange={(e) =>
                                    handleChange(e, item.id, "lunch")
                                }
                            />
                            <input
                                type="time"
                                name="return"
                                defaultValue={item.return}
                                onChange={(e) =>
                                    handleChange(e, item.id, "return")
                                }
                            />
                            <input
                                type="time"
                                name="end"
                                defaultValue={item.end}
                                onChange={(e) =>
                                    handleChange(e, item.id, "end")
                                }
                            />
                        </form>
                    </div>
                );
            })}
        </div>
    );
}
