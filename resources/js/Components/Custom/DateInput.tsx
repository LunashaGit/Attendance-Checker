import React, { useState, useEffect } from "react";
import axios from "axios";
import { Transition, Dialog } from "@headlessui/react";
type Props = {
    callBackDate: Function;
};
export default function DateInput(props: Props) {
    const [date, setDate] = useState<string>(
        new Date().toISOString().slice(0, 10)
    );

    return (
        <>
            <input
                type="date"
                value={date}
                className="dark:bg-gray-800 text-white rounded-lg"
                onChange={(e) => {
                    setDate(e.target.value);
                    props.callBackDate(e.target.value);
                }}
            />
        </>
    );
}
