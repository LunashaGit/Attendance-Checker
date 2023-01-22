import React, { useState, useEffect } from "react";
import axios from "axios";

type Time = {
    firstHour: Number;
    secondHour: Number;
    firstPartOfMinutes: Number;
    secondPartOfMinutes: Number;
};
export default function ClockButton(props) {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [hours, setHours] = useState<string>("");
    const [time, setTime] = useState<Time>({
        firstHour: null,
        secondHour: null,
        firstPartOfMinutes: null,
        secondPartOfMinutes: null,
    });

    useEffect(() => {
        switch (props.column) {
            case "beginning":
                setTime({
                    firstHour: 8,
                    secondHour: 9,
                    firstPartOfMinutes: 45,
                    secondPartOfMinutes: 0,
                });
                setHours("9:00");
                break;
            case "lunch":
                setTime({
                    firstHour: 12,
                    secondHour: 13,
                    firstPartOfMinutes: 30,
                    secondPartOfMinutes: 20,
                });
                setHours("12:30");
                break;
            case "return":
                setTime({
                    firstHour: 13,
                    secondHour: 13,
                    firstPartOfMinutes: 20,
                    secondPartOfMinutes: 30,
                });
                setHours("13:30");
                break;
            case "end":
                setTime({
                    firstHour: 17,
                    secondHour: 21,
                    firstPartOfMinutes: 0,
                    secondPartOfMinutes: 0,
                });
                setHours("17:00");
                break;
        }
    }, [props.column]);

    const checkTime = () => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();

        if (
            ((currentHour === time.firstHour &&
                currentMinute >= time.firstPartOfMinutes) ||
                (currentHour === time.secondHour &&
                    currentMinute <= time.secondPartOfMinutes)) &&
            axios.get("/api/attendance/" + props.auth.user.id).then((res) => {
                res.data[props.column] === null;
            })
        ) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    };

    if (!isClicked) {
        setInterval(checkTime, 1000);
    }

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
                        ":00",
                });
            }}
        >
            {hours}
        </button>
    );
}
