import React, { useState } from "react";
import ClockButton from "@/Components/Custom/ClockButton";
import axios from "axios";

export default function Testing(props) {
    const [column] = useState<Array<string>>([
        "beginning",
        "lunch",
        "return",
        "end",
    ]);

    return (
        <div>
            {column.map((col, index) => {
                return (
                    <ClockButton key={index} column={col} auth={props.auth} />
                );
            })}
        </div>
    );
}
