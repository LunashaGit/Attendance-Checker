import React, { useState, useEffect } from "react";
import axios from "axios";
import { Time, Value } from "@/Types/ClockButton";
import { TimeTable } from "@/Parameters/ClockButton";

export default function ClockButton(props) {
    const [isDisabled, setIsDisabled] = useState(true);
    const [hours, setHours] = useState(null);
    const [time, setTime] = useState<Time>({
        startTime: {
            hours: "",
            minutes: "",
        },
        endTime: {
            hours: "",
            minutes: "",
        },
        late: {
            hours: "",
            minutes: "",
        },
        before: {
            hours: "",
            minutes: "",
        },
        nextTimer: {
            hours: "",
            minutes: "",
        },
    });
    const [isClicked, setIsClicked] = useState(false);
    const [valueClicked, setValueClicked] = useState<Value>({
        hours: "",
        minutes: "",
    });

    console.log(valueClicked);

    useEffect(() => {
        setTime(TimeTable[props.column]);
        setHours(TimeTable[props.column].startTime);
    }, [props.column]);

    useEffect(() => {
        axios.get("/api/attendance/" + props.auth.user.id).then((res) => {
            let data = res.data;
            if (data[props.column] !== null) {
                setIsClicked(true);
                setValueClicked({
                    hours: data[props.column].split(":")[0],
                    minutes: data[props.column].split(":")[1],
                });
            } else {
                setIsClicked(false);
            }
        });
    }, []);

    const checkTime = () => {
        const current = {
            hours: props.time.split(":")[0],
            minutes: props.time.split(":")[1],
        };

        const start = {
            hours: time.startTime.hours,
            minutes: time.startTime.minutes,
        };

        const end = {
            hours: time.endTime.hours,
            minutes: time.endTime.minutes,
        };

        if (
            current.hours >= start.hours &&
            current.hours <= end.hours &&
            current.minutes >= start.minutes &&
            current.minutes <= end.minutes
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

    const handleClick = () => {
        axios
            .put("/api/attendance/", {
                user_id: props.auth.user.id,
                column: props.column,
                value:
                    new Date().getHours() +
                    ":" +
                    new Date().getMinutes() +
                    ":" +
                    new Date().getSeconds(),
            })
            .then((res) => {
                setIsClicked(true);
            });
    };

    if (
        (isClicked &&
            isDisabled &&
            valueClicked.hours === time.startTime.hours) ||
        valueClicked.hours === time.endTime.hours
    ) {
        let x: string = "";
        switch (time.startTime.hours) {
            case "8":
                x = "9:00";
                break;
            case "12":
                x = "12:30";
                break;
            case "13":
                x = "13:30";
                break;
            case "17":
                x = "17:00";
                break;
            default:
                break;
        }
        return (
            <button
                className="bg-green-500 text-white font-bold py-2 px-4 rounded opacity-50"
                disabled
            >
                {x}
            </button>
        );
    } else if (
        isClicked &&
        isDisabled &&
        valueClicked.hours < time.late?.hours
    ) {
        return (
            <button
                className="bg-red-500 text-white font-bold py-2 px-4 rounded opacity-50"
                disabled
            >
                {valueClicked.hours + ":" + valueClicked.minutes}
            </button>
        );
    } else if (
        isClicked &&
        isDisabled &&
        valueClicked.hours < time.before?.hours
    ) {
        return (
            <button
                className="bg-red-500 text-white font-bold py-2 px-4 rounded opacity-50"
                disabled
            >
                {time.before.hours + ":" + time.before.minutes}
            </button>
        );
    } else {
        return (
            <button
                className="bg-green-500 text-white font-bold py-2 px-4 rounded"
                onClick={handleClick}
            ></button>
        );
    }
}
