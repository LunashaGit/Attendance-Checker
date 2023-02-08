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
import SwitchButtonCampus from "@/Components/Custom/SwitchButtonCampus";
import { Head } from "@inertiajs/react";
type Props = {
    auth: Auth;
    errors: Object;
    techTalks: Object[];
    techTalksToday: {
        time: string;
        title: string;
        length: number;
    }[];
    attendancesBefore: Object[];
};

export default function Dashboard(props: Props) {
    const [time, setTime] = useState<string>("");
    const [column] = useState<Array<string>>([
        "beginning",
        "lunch",
        "return",
        "end",
    ]);
    const [valueClicked, setValueClicked] = useState<string>("");
    const callBack = (element) => {
        setValueClicked(element);
    };
    axios.get("/api/time").then((res) => {
        setTime(res.data);
    });
    return (
        <>
            <Head title="Dashboard" />
            <AuthenticatedLayout auth={props.auth} errors={props.errors}>
                <div className="w-8/12 mx-auto py-4 flex flex-col gap-16">
                    <div className="flex row gap-4 items-center justify-left">
                        <GithubPicture
                            className="h-16 w-16 rounded-lg"
                            user={props.auth.user.github_id}
                        />
                        <div className="flex flex-col justify-between gap-2">
                            <HiMessage auth={props.auth} />
                            <Section auth={props.auth} />
                        </div>
                    </div>
                    {props.auth.user.is_admin != true &&
                        props.auth.user.is_coach != true && (
                            <div className="flex flex-row items-center dark:bg-gray-800 h-48 rounded-lg bg-opacity-60">
                                <SwitchButtonCampus
                                    auth={props.auth}
                                    callBack={callBack}
                                />
                                <div className="flex flex-row gap-8 w-4/6">
                                    {column.map((col, index) => {
                                        return (
                                            <ClockButton
                                                key={index}
                                                column={col}
                                                auth={props.auth}
                                                time={time}
                                                valueClicked={valueClicked}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    <div className="flex flex-row justify-between items-center gap-12">
                        <OverallAttendance
                            auth={props.auth}
                            attendancesBefore={props.attendancesBefore}
                        />
                        <Pedagogy
                            auth={props.auth}
                            techTalks={props.techTalks}
                        />
                        <TechTalks
                            auth={props.auth}
                            techTalksToday={props.techTalksToday}
                        />
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
