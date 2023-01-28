import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { Auth } from "@/Types/Auth";
import GithubPicture from "@/Components/Custom/GithubPicture";
import HiMessage from "@/Components/Custom/HiMessage";
import Section from "@/Components/Custom/Section";
import ClockButton from "@/Components/Custom/ClockButton";
import axios from "axios";
import OverallAttendance from "@/Components/Custom/OverallAttendance";
import Pedagogy from "@/Components/Custom/Pedagogy";
import TechTalks from "@/Components/Custom/TechTalks";
type Props = {
    auth: Auth;
    errors: Object;
    techTalks: Object;
};

export default function Dashboard(props: Props) {
    console.log(props);
    const [time, setTime] = useState<string>("");
    const [column] = useState<Array<string>>([
        "beginning",
        "lunch",
        "return",
        "end",
    ]);

    axios.get("/api/time").then((res) => {
        setTime(res.data);
    });

    setInterval(() => {
        axios.get("/api/time").then((res) => {
            setTime(res.data);
        });
    }, 60000);
    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="w-8/12 mx-auto my-4 flex flex-col gap-16">
                <div className="flex row gap-4 items-center justify-left">
                    <GithubPicture
                        className="h-16 w-16 rounded-lg"
                        auth={props.auth}
                    />
                    <div className="flex flex-col justify-between gap-2">
                        <HiMessage auth={props.auth} />
                        <Section auth={props.auth} />
                    </div>
                </div>
                <div className="flex flex-row gap-8 justify-center items-center dark:bg-gray-800 h-48 rounded-lg bg-opacity-60">
                    {column.map((col, index) => {
                        return (
                            <ClockButton
                                key={index}
                                column={col}
                                auth={props.auth}
                                time={time}
                            />
                        );
                    })}
                </div>
                <div className="flex flex-row justify-center items-center gap-44">
                    <OverallAttendance auth={props.auth} />
                    <Pedagogy auth={props.auth} techTalks={props.techTalks} />
                    <TechTalks auth={props.auth} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
