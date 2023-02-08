import React, { useState, useEffect } from "react";
import { Auth } from "@/Types/Auth";
import { Link } from "@inertiajs/react";
import axios from "axios";
type Props = {
    auth: Auth;
};

type dayTalksType = {
    map?(arg0: (dayTalk: dayTalksType) => JSX.Element): React.ReactNode;
    title: string;
    time: string;
}[];

export default function TechTalks(props: Props) {
    const [dayTalks, setDayTalks] = useState<dayTalksType>();

    useEffect(() => {
        axios
            .get("/api/techtalks/today", {
                params: {
                    section_id: props.auth.user.section_id,
                },
            })
            .then((res) => {
                setDayTalks(res.data.techTalks);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.auth]);
    console.log(dayTalks);
    return (
        <div className="flex flex-col gap-4 text-xl text-left text-white font-semibold h-64">
            <h2 className="text-center">Communication</h2>
            <div>
                <div className="dark:bg-[#39435a] p-2 rounded-sm">
                    <p>Tech Talks</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-4 dark:bg-gray-800 p-2 rounded-sm">
                    {dayTalks &&
                        dayTalks.map((ele) => {
                            return (
                                <div className="text-center text-sm flex flex-row gap-4">
                                    <p>{ele.time.slice(0, 5)}</p>
                                    <p>{ele.title}</p>
                                </div>
                            );
                        })}
                    {dayTalks === undefined && (
                        <div className="text-center text-sm">
                            No TechTalks for Today
                        </div>
                    )}
                    <hr className="border-2 border-white w-5/6 rounded-md mx-auto" />
                    <Link href="/tech-talks/" className="text-white">
                        <p className="text-sm text-center">Open</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
