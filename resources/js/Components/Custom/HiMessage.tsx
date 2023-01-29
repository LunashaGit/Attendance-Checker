import React from "react";
import { Auth } from "@/Types/Auth";
type Props = {
    auth: Auth;
};

export default function HiMessage(props: Props) {
    return (
        <div className="text-xl text-left">
            <p className="text-white font-semibold">
                Hello {props.auth.user.first_name}!
            </p>
        </div>
    );
}
