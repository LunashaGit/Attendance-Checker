import React from "react";
import Calendar from "@/Components/Custom/Calendar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Auth } from "@/Types/Auth";
type Props = {
    auth: Auth;
    errors: Object;
    techTalks: Object;
};
export default function TechTalks(props: Props) {
    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="text-white">
                <Calendar auth={props.auth} techTalks={props.techTalks} />
            </div>
        </AuthenticatedLayout>
    );
}
