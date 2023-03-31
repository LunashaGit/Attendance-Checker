import React, { useState, useEffect } from "react";

export default function SwitchButtonCampus(props) {
    const [elements] = useState<Array<string>>(["Campus", "Remote"]);
    const [bgCampus, setBgCampus] = useState<string>("");
    const [bgRemote, setBgRemote] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const handleCallback = (childData) => {
        props.callBack(childData);
        setValue(childData);
    };

    useEffect(() => {
        if (value === "") {
            handleCallback("Campus");
        }
        value === "Campus"
            ? (setBgCampus("bg-[#39435a]"), setBgRemote("bg-gray-500"))
            : (setBgCampus("bg-gray-500"), setBgRemote("bg-[#39435a]"));
    }, [value]);
    return (
        <div className="flex flex-row gap-2 mx-8 w-2/6">
            {elements.map((element, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => {
                            handleCallback(element);
                        }}
                        className={
                            (element === "Campus" ? bgCampus : bgRemote) +
                            " text-white font-semibold rounded-lg px-4 py-2"
                        }
                    >
                        {element}
                    </button>
                );
            })}
        </div>
    );
}
