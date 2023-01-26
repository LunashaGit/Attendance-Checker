import React from "react";
import { Auth } from "@/Types/Auth";
import { Link } from "@inertiajs/react";
type Props = {
    auth: Auth;
};

export default function TechTalks(props: Props) {
    return (
        <div className="flex flex-col gap-4 text-xl text-left text-white font-semibold h-64">
            <h2 className="text-center">Communication</h2>
            <div>
                <div className="dark:bg-[#39435a] p-2 rounded-sm">
                    <p>Tech Talks</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-4 dark:bg-gray-800 p-2 rounded-sm">
                    <p className="text-sm text-center">
                        No tech-talks have been given yet.
                    </p>
                    <hr className="border-2 border-white w-5/6 rounded-md mx-auto" />
                    <Link href="/tech-talks/" className="text-white">
                        <p className="text-sm text-center">Open</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
