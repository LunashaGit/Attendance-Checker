import React, { useState, useEffect } from "react";
import ClockButton from "@/Components/Custom/ClockButton";
import Calendar from "@/Components/Custom/Calendar";
import axios from "axios";

export default function Testing(props) {
    const [time, setTime] = useState<string>("");
    const [column] = useState<Array<string>>([
        "beginning",
        "lunch",
        "return",
        "end",
    ]);

    axios.get("/api/time").then((res) => {
        setTime(res.data);
    });

    setInterval(() => {
        axios.get("/api/time").then((res) => {
            setTime(res.data);
        });
    }, 60000);

    console.log(time);
    return (
        <div>
            {column.map((col, index) => {
                return (
                    <ClockButton
                        key={index}
                        column={col}
                        auth={props.auth}
                        time={time}
                    />
                );
            })}
            <Calendar />
        </div>
    );
}
