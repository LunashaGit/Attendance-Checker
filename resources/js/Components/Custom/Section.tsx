import React from "react";
import { Auth } from "@/Types/Auth";
type Props = {
    auth: Auth;
};

export default function Section(props: Props) {
    return (
        <div className="text-xl text-left">
            <p className="text-white font-semibold">
                {props.auth.user.section != null
                    ? props.auth.user.section.name
                    : "No section"}
            </p>
        </div>
    );
}
