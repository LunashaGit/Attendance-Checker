import Guest from "@/Layouts/GuestLayout";
import React from "react";
import { useState } from "react";
import AuthButton from "@/Components/Custom/AuthButton";

export default function Connect() {
    const [auth_type] = useState<Array<string>>(["Github", "Login"]);
    return (
        <Guest>
            <div className="flex flex-row justify-between items-center">
                {auth_type.map((type) => {
                    return <AuthButton type={type} />;
                })}
            </div>
        </Guest>
    );
}
