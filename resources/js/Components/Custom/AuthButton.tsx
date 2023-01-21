import Code from "@/Images/code.svg";
import Github from "@/Images/github.svg";
import React from "react";
export default function AuthButton(props) {
    const { type } = props;
    return (
        <>
            <a href={route(type.toLocaleLowerCase())}>
                <div
                    key={type}
                    className={
                        (type == "Github"
                            ? " bg-gray-50 text-gray-500 "
                            : " bg-gray-700 text-gray-50 ") +
                        " border border-gray-300 shadow-sm flex flex-row items-center justify-center gap-4 p-2 rounded-md"
                    }
                >
                    <div className="flex flex-row items-center justify-center gap-4">
                        <img
                            className="w-6 h-6"
                            src={type == "Github" ? Github : Code}
                            alt={type}
                        />
                        <p className="text-base">{type}</p>
                    </div>
                </div>
            </a>
        </>
    );
}
