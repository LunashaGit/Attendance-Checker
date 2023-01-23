import React from "react";
import GetInfos from "@/Components/Custom/GetInfos";
export default function Section(props) {
    return (
        <div>
            <GetInfos infos={props.sections} />
            <GetInfos infos={props.users} />
        </div>
    );
}
