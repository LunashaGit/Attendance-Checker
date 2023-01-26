import React from "react";
import { Auth } from "@/Types/Auth";
type Props = {
    className?: string;
    auth: Auth;
};

export default function GithubPicture(props: Props) {
    return (
        <img
            src={`https://avatars.githubusercontent.com/u/${props.auth.user.github_id}?v=4`}
            alt="Github Profile Picture"
            className={props.className}
        />
    );
}
