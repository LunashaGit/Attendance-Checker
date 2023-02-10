import React from "react";
type Props = {
    call: string[];
    callBackApiCallValue: Function;
};
export default function AbsencesCall(props: Props) {
    return (
        <>
            <select
                className="dark:bg-gray-800 text-white rounded-lg"
                onChange={(e) => {
                    props.callBackApiCallValue(e.target.value);
                }}
            >
                {props.call.map((value, index) => {
                    return <option key={index}>{value}</option>;
                })}
            </select>
        </>
    );
}
