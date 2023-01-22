import React, { useState, useEffect } from "react";
import axios from "axios";

type Time = {
    startTime: string;
    endTime: string;
};

export default function ClockButton(props) {
    const [isDisabled, setIsDisabled] = useState(true);
    const [hours, setHours] = useState("");
    const [time, setTime] = useState<Time>({ startTime: "", endTime: "" });
    const [isClicked, setIsClicked] = useState(false);

    const timeTable = {
        beginning: { startTime: "8:45", endTime: "9:00" },
        lunch: { startTime: "12:20", endTime: "13:20" },
        return: { startTime: "13:20", endTime: "13:30" },
        end: { startTime: "17:00", endTime: "21:00" },
    };

    useEffect(() => {
        setTime(timeTable[props.column]);
        setHours(timeTable[props.column].startTime);
    }, [props.column]);

    useEffect(() => {
        axios.get("/api/attendance/" + props.auth.user.id).then((res) => {
            let data = res.data;
            if (data[props.column] !== null) {
                setIsClicked(true);
            }
        });
    }, []);

    const checkTime = () => {
        const currentHour = props.time.split(":")[0];
        const currentMinute = props.time.split(":")[1];
        const [startHour, startMinute] = time.startTime.split(":").map(Number);
        const [endHour, endMinute] = time.endTime.split(":").map(Number);

        if (
            (Number(currentHour) === startHour &&
                Number(currentMinute) >= startMinute) ||
            (Number(currentHour) === endHour &&
                Number(currentMinute) <= endMinute)
        ) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            checkTime();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
            disabled={isDisabled || isClicked}
            onClick={() => {
                setIsClicked(true);
                axios.put("/api/attendance", {
                    user_id: props.auth.user.id,
                    column: props.column,
                    value:
                        new Date().getHours() +
                        ":" +
                        new Date().getMinutes() +
                        ":" +
                        new Date().getSeconds(),
                });
            }}
        >
            {hours}
        </button>
    );
}
