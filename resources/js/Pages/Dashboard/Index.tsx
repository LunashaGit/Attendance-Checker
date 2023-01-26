import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Auth } from "@/Types/Auth";
type Props = {
    auth: Auth;
    errors: Object;
};

export default function Dashboard(props: Props) {
    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
