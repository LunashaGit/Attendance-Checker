import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Auth } from "@/Types/Auth";
import GetUsers from "@/Components/Custom/GetUsers";
import { Head } from "@inertiajs/react";
type Props = {
    sections: {
        id: number;
        name: string;
    }[];
    auth: Auth;
    errors: Object;
    users: Array<Object>;
};

export default function WhosWho(props: Props) {
    return (
        <>
            <Head title="Who's Who" />
            <AuthenticatedLayout auth={props.auth} errors={props.errors}>
                <GetUsers
                    auth={props.auth}
                    users={props.users}
                    sections={props.sections}
                />
            </AuthenticatedLayout>
        </>
    );
}
