import React, { useState } from "react";
import { Auth } from "@/Types/Auth";
type Props = {
    auth: Auth;
    attendancesBefore: Object[];
};

type TypeAttendance = {
    date: string;
    beginning: string;
    end: string;
    return: string;
    lunch: string;
};

export default function OverallAttendance(props: Props) {
    const [attendances, setAttendances] = useState<Object[]>(
        props.attendancesBefore
    );
    console.log(attendances);
    return (
        <div className="flex flex-col gap-4 w-2/6">
            <h2 className="text-center text-white font-semibold">
                Absences to Justify
            </h2>
            <p className="text-xl text-white font-semibold text-left">
                Overall Attendance: NULL%
            </p>
            <div className="bg-gray-700 rounded-lg">
                <div
                    role="progressbar"
                    aria-valuenow={100}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    className="w-5/6 h-4 bg-gray-200 rounded-lg text-center font-semibold text-xs text-gray-700"
                >
                    NULL
                </div>
            </div>
            <p className="text-xs text-white">
                OAR must stay above 80% or contract can be terminated.
            </p>
            {attendances &&
                attendances.map((attendance: TypeAttendance, index: number) => {
                    return (
                        <div
                            key={index}
                            className="dark:bg-[#39435a] p-2 rounded-sm"
                        >
                            <p className="text-white text-left">
                                {index + 1}. <b>{attendance.date}</b>
                            </p>
                            <div className="flex flex-col justify-center text-white gap-4 dark:bg-gray-800 p-2 rounded-sm">
                                <div className="flex flex-row gap-2 items-center justify-center">
                                    <p className="text-left text-base flex flex-row gap-4">
                                        {attendance.beginning === null
                                            ? "N/A"
                                            : attendance.beginning.slice(0, 5)}
                                    </p>
                                    <p className="text-left text-base flex flex-row gap-4">
                                        {attendance.lunch === null
                                            ? "--:--"
                                            : attendance.lunch.slice(0, 5)}
                                    </p>
                                    <p className="text-left text-base flex flex-row gap-4">
                                        {attendance.return === null
                                            ? "--:--"
                                            : attendance.return.slice(0, 5)}
                                    </p>
                                    <p className="text-left text-base flex flex-row gap-4">
                                        {attendance.end === null
                                            ? "--:--"
                                            : attendance.end.slice(0, 5)}
                                    </p>
                                </div>
                                <hr className="border-2 border-white w-5/6 rounded-md mx-auto" />
                                <button
                                    className="text-sm text-center text-white"
                                    onClick={() => {
                                        console.log("Open");
                                    }}
                                >
                                    Open
                                </button>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
