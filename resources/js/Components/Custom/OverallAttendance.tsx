import React from "react";
import { Auth } from "@/Types/Auth";
type Props = {
    auth: Auth;
};

export default function OverallAttendance(props: Props) {
    return (
        <div className="flex flex-col gap-4 h-64">
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
        </div>
    );
}
