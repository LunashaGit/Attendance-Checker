import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Auth } from "@/Types/Auth";
import GetUsers from "@/Components/Custom/GetUsers";
import axios from "axios";

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
    console.log(props);
    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <GetUsers
                auth={props.auth}
                users={props.users}
                sections={props.sections}
            />
        </AuthenticatedLayout>
    );
}
