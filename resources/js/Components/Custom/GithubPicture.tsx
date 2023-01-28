import React from "react";
import { Auth } from "@/Types/Auth";
type Props = {
    className?: string;
    auth?: Auth;
    user: number;
};

export default function GithubPicture(props: Props) {
    return (
        <img
            src={`https://avatars.githubusercontent.com/u/${props.user}?v=4`}
            alt="Github Profile Picture"
            className={props.className}
        />
    );
}
