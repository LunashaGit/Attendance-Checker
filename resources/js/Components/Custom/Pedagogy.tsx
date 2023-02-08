import React from "react";
import { Auth } from "@/Types/Auth";
type Props = {
    auth: Auth;
    techTalks: Object[];
};

export default function Pedagogy(props: Props) {
    return (
        <div className="flex flex-col gap-4 text-xl text-left text-white font-semibold h-64 w-2/6">
            <h2 className="text-center">Pedagogy</h2>
            <div className="flex flex-col gap-2">
                <p>Your events</p>
                <p className="text-sm">
                    You have given {props.techTalks.length} <b>tech-talks</b> so
                    far:
                </p>
                <p className="text-sm p-4">
                    {props.techTalks.map((techTalk: any, index: number) => {
                        return (
                            <div key={index}>
                                <p>
                                    {index + 1}. <b>{techTalk.title}</b>
                                </p>
                            </div>
                        );
                    })}
                </p>
            </div>
        </div>
    );
}
