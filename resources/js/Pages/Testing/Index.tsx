import React, { useState } from "react";
import ClockButton from "@/Components/Custom/ClockButton";
import axios from "axios";

export default function Testing(props) {
    const [time, setTime] = useState<string>("");
    const [column] = useState<Array<string>>([
        "beginning",
        "lunch",
        "return",
        "end",
    ]);
    return (
        <div>
            {column.map((col, index) => {
                setTimeout(() => {
                    axios.get("/api/time").then((res) => {
                        setTime(res.data);
                    });
                }, 120000);

                return (
                    <ClockButton
                        key={index}
                        column={col}
                        auth={props.auth}
                        time={time}
                    />
                );
            })}
        </div>
    );
}
