import React from "react";
import Calendar from "@/Components/Custom/Calendar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Auth } from "@/Types/Auth";
import { Head } from "@inertiajs/react";
type Props = {
    auth: Auth;
    errors: Object;
    techTalks: Object;
    campuses: Object;
};
export default function TechTalks(props: Props) {
    return (
        <>
            <Head title="Tech Talks" />
            <AuthenticatedLayout auth={props.auth} errors={props.errors}>
                <div className="text-white">
                    <Calendar
                        auth={props.auth}
                        techTalks={props.techTalks}
                        campuses={props.campuses}
                    />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
