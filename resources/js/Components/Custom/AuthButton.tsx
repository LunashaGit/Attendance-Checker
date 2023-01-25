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
                    className="bg-gray-50 text-gray-500 
                        border border-gray-300 flex flex-row items-center justify-center gap-4 p-2 rounded-md shadow-lg hover:bg-gray-200 hover:text-gray-600 hover:border-gray-400 cursor-pointer
                    "
                >
                    <div className="flex flex-row items-center justify-center gap-4">
                        <img
                            className="w-6 h-6"
                            src={type == "Github" ? Github : Code}
                            alt={type}
                        />
                        <p className="text-base font-semibold">{type}</p>
                    </div>
                </div>
            </a>
        </>
    );
}
