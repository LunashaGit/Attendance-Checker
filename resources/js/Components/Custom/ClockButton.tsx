import React, { useState, useEffect } from "react";
import axios from "axios";

type ClockButtonProps = {
    column: string;
    auth: any;
    time: string;
    valueClicked: string;
};

export default function ClockButton(props: ClockButtonProps) {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [valueClicked, setValueClicked] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    useEffect(() => {
        setLocation(props.valueClicked);
    }, [props.valueClicked]);
    useEffect(() => {
        axios
            .get("/api/attendance/", {
                params: {
                    user_id: props.auth.user.id,
                },
            })
            .then((res) => {
                let data = res.data;
                if (data[props.column] === null) {
                    setIsClicked(false);
                } else {
                    setIsClicked(true);
                    setValueClicked(data[props.column]);
                }
            });
    }, []);

    const handleClick = () => {
        let x = location;
        axios
            .put("/api/attendance/", {
                user_id: props.auth.user.id,
                column: props.column,
                location: x,
                value:
                    new Date().getHours() +
                    ":" +
                    new Date().getMinutes() +
                    ":" +
                    new Date().getSeconds(),
            })
            .then((res) => {
                setIsClicked(true);
                setValueClicked(res.data[props.column]);
            });
    };

    let buttonClass = "";
    let isDisabled = false;
    let buttonText = "";
    let server = new Date();
    server.setHours(
        Number(props.time.split(":")[0]),
        Number(props.time.split(":")[1])
    );
    let min = new Date();
    let max = new Date();
    let beforeOrAfter = new Date();
    let clickedTime = new Date();
    if (valueClicked != null) {
        clickedTime.setHours(
            Number(valueClicked.split(":")[0]),
            Number(valueClicked.split(":")[1])
        );
    }
    switch (props.column) {
        case "beginning":
            min.setHours(8, 45, 0);
            max.setHours(12, 29, 59);
            beforeOrAfter.setHours(9, 1, 0);
            if (isClicked) {
                if (clickedTime >= min && clickedTime <= beforeOrAfter) {
                    buttonClass = "bg-green-500 opacity-50";
                    isDisabled = true;
                    buttonText = "9:00";
                } else if (clickedTime > beforeOrAfter && clickedTime <= max) {
                    buttonClass = "bg-red-500 opacity-50";
                    isDisabled = true;
                    buttonText = `${clickedTime.getHours()}:${clickedTime
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}`;
                }
            } else {
                if (server < min) {
                    buttonClass = "bg-gray-500";
                    isDisabled = true;
                    buttonText = "8:45";
                } else if (server >= min && server <= beforeOrAfter) {
                    buttonClass = "bg-green-500";
                    isDisabled = false;
                    buttonText = "9:00";
                } else if (server > beforeOrAfter && server <= max) {
                    buttonClass = "bg-red-500";
                    isDisabled = false;
                    buttonText = "9:00";
                } else if (server > max) {
                    buttonClass = "bg-gray-500 opacity-50";
                    isDisabled = true;
                    buttonText = "--:--";
                }
            }

            break;
        case "lunch":
            min.setHours(12, 30, 0);
            max.setHours(13, 19, 59);
            if (isClicked) {
                if (clickedTime >= min && clickedTime <= max) {
                    buttonClass = "bg-green-500 opacity-50";
                    isDisabled = true;
                    buttonText = "12:30";
                }
            } else {
                if (server < min) {
                    buttonClass = "bg-gray-500";
                    isDisabled = true;
                    buttonText = "12:30";
                } else if (server >= min && server <= max) {
                    buttonClass = "bg-green-500";
                    isDisabled = false;
                    buttonText = "12:30";
                } else if (server > max) {
                    buttonClass = "bg-gray-500 opacity-50";
                    isDisabled = true;
                    buttonText = "--:--";
                }
            }
            break;
        case "return":
            min.setHours(13, 20, 0);
            max.setHours(13, 30, 0);
            if (isClicked) {
                if (clickedTime >= min && clickedTime <= max) {
                    buttonClass = "bg-green-500 opacity-50";
                    isDisabled = true;
                    buttonText = "13:30";
                }
            } else {
                if (server < min) {
                    buttonClass = "bg-gray-500";
                    isDisabled = true;
                    buttonText = "13:30";
                } else if (server >= min && server <= max) {
                    buttonClass = "bg-green-500";
                    isDisabled = false;
                    buttonText = "13:30";
                } else if (server > max) {
                    buttonClass = "bg-gray-500 opacity-50";
                    isDisabled = true;
                    buttonText = "--:--";
                }
            }
            break;
        case "end":
            min.setHours(17, 0, 0);
            max.setHours(20, 59, 59);
            beforeOrAfter.setHours(13, 31, 0);
            if (isClicked) {
                if (clickedTime >= beforeOrAfter && clickedTime <= min) {
                    buttonClass = "bg-red-500 opacity-50";
                    isDisabled = true;
                    buttonText = `${clickedTime.getHours()}:${clickedTime
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}`;
                } else if (clickedTime >= min && clickedTime <= max) {
                    buttonClass = "bg-green-500 opacity-50";
                    isDisabled = false;
                    buttonText = "17:00";
                }
            } else {
                if (server < beforeOrAfter) {
                    buttonClass = "bg-gray-500";
                    isDisabled = true;
                    buttonText = "17:00";
                } else if (server >= beforeOrAfter && server <= min) {
                    buttonClass = "bg-red-500";
                    isDisabled = false;
                    buttonText = "17:00";
                } else if (server >= min && server <= max) {
                    buttonClass = "bg-green-500";
                    isDisabled = false;
                    buttonText = "17:00";
                } else if (server > max) {
                    buttonClass = "bg-gray-500";
                    isDisabled = true;
                    buttonText = "--:--";
                }
            }
            break;
    }

    return (
        <button
            className={`w-16 h-8 rounded-lg ${buttonClass} text-white font-bold text-lg`}
            disabled={isDisabled}
            onClick={handleClick}
        >
            <span>{buttonText}</span>
        </button>
    );
}
