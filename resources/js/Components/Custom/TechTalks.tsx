import React, { useState, useEffect } from "react";
import { Auth } from "@/Types/Auth";
import { Link } from "@inertiajs/react";

type dayTalksType = {
    time: string;
    title: string;
    length: number;
}[];

type Props = {
    auth: Auth;
    techTalksToday: dayTalksType;
};

export default function TechTalks(props: Props) {
    const [dayTalks, setDayTalks] = useState<dayTalksType>(
        props.techTalksToday
    );
    return (
        <div className="flex flex-col gap-4 text-xl text-left text-white font-semibold h-64 w-2/6">
            <h2 className="text-center">Communication</h2>
            <div>
                <div className="dark:bg-[#39435a] p-2 rounded-sm">
                    <p>Tech Talks</p>
                    <div className="flex flex-col justify-center items-center gap-4 dark:bg-gray-800 p-2 rounded-sm">
                        {dayTalks &&
                            dayTalks.map((ele) => {
                                return (
                                    <div className="text-center text-base flex flex-row gap-4">
                                        <p>{ele.time.slice(0, 5)}</p>
                                        <p>{ele.title}</p>
                                    </div>
                                );
                            })}
                        {dayTalks.length === 0 && (
                            <div className="text-center text-sm">
                                No TechTalks for Today
                            </div>
                        )}
                        <hr className="border-2 border-white w-5/6 rounded-md mx-auto" />
                        <Link href="/tech-talks/" className="text-white">
                            <p className="text-sm text-center">
                                {props.auth.user.section != null
                                    ? "Open"
                                    : "Wait for your section to be assigned"}
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
