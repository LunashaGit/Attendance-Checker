import React, { useState, useEffect } from "react";
import axios from "axios";
import { Time, Value } from "@/Types/ClockButton";
import { TimeTable } from "@/Parameters/ClockButton";

export default function ClockButton(props) {
    const [isDisabled, setIsDisabled] = useState(true);
    const [hours, setHours] = useState(null);
    const [time, setTime] = useState<Time>({
        startTime: {
            hours: null,
            minutes: null,
        },
        endTime: {
            hours: null,
            minutes: null,
        },
        late: {
            hours: null,
            minutes: null,
        },
        before: {
            hours: null,
            minutes: null,
        },
        nextTimer: {
            hours: null,
            minutes: null,
        },
    });
    const [isClicked, setIsClicked] = useState(false);
    const [valueClicked, setValueClicked] = useState<Value>({
        hours: null,
        minutes: null,
    });

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
                    hours: Number(data[props.column].split(":")[0]),
                    minutes: Number(data[props.column].split(":")[1]),
                });
            } else {
                setIsClicked(false);
            }
        });
    }, []);

    const checkTime = () => {
        const current = {
            hours: Number(props.time.split(":")[0]),
            minutes: Number(props.time.split(":")[1]),
        };

        const start = {
            hours: Number(time.startTime.hours),
            minutes: Number(time.startTime.minutes),
        };

        const end = {
            hours: Number(time.endTime.hours),
            minutes: Number(time.endTime.minutes),
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
        isClicked &&
        isDisabled &&
        (valueClicked.hours > time.startTime.hours ||
            (valueClicked.hours === time.startTime.hours &&
                valueClicked.minutes >= time.startTime.minutes)) &&
        (valueClicked.hours < time.endTime.hours ||
            (valueClicked.hours === time.endTime.hours &&
                valueClicked.minutes <= time.endTime.minutes))
    ) {
        let x: string = "";
        switch (time.startTime.hours) {
            case 8:
                x = "9:00";
                break;
            case 12:
                x = "12:30";
                break;
            case 13:
                x = "13:30";
                break;
            case 17:
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
        (valueClicked.hours > time.late?.hours ||
            (valueClicked.hours === time.late?.hours &&
                valueClicked.minutes >= time.late?.minutes))
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
        (valueClicked.hours < time.before?.hours ||
            (valueClicked.hours === time.before?.hours &&
                valueClicked.minutes <= time.before?.minutes))
    ) {
        return (
            <button
                className="bg-orange-500 text-white font-bold py-2 px-4 rounded opacity-50"
                disabled
            >
                {valueClicked.hours + ":" + valueClicked.minutes}
            </button>
        );
    } else if (
        !isClicked &&
        isDisabled &&
        (props.time.split(":")[0] > time.nextTimer?.hours ||
            (props.time.split(":")[0] === time.nextTimer?.hours &&
                props.time.split(":")[1] >= time.nextTimer?.minutes))
    ) {
        return (
            <button
                className="bg-gray-700 text-white font-bold py-2 px-4 rounded opacity-50"
                disabled
            >
                {"--" + ":" + "--"}
            </button>
        );
    } else {
        return (
            <button
                className="bg-green-500 text-white font-bold py-2 px-4 rounded"
                onClick={handleClick}
            >
                {time.endTime.hours + ":" + time.endTime.minutes}
            </button>
        );
    }
}
