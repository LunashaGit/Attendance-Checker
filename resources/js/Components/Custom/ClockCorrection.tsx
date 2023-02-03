import React, { useState, useEffect } from "react";
import axios from "axios";
type Props = {
    date: string;
    section: string;
};
type Data = {
    id: number;
    location: string;
    beginning: string;
    lunch: string;
    return: string;
    end: string;
    date: string;
};

export default function ClockCorrection(props: Props) {
    const [data, setData] = useState<Array<Data>>([]);
    useEffect(() => {
        axios
            .get("/api/attendance/check", {
                params: {
                    section_id: Number(props.section),
                    date: props.date,
                },
            })
            .then((res) => {
                setData(res.data);
            });
    }, [props.date, props.section]);
    console.log(data);

    return (
        <div className="flex flex-col gap-2">
            {data.map((item, index) => {
                return item.id;
            })}
        </div>
    );
}
