import React, { useState, useEffect } from "react";
import SectionSelect from "@/Components/Custom/SectionSelect";
import axios from "axios";
import GetInfos from "@/Components/Custom/GetInfos";
export default function Section(props) {
    const [section, setSection] = useState<string>("1");

    const callBackSection = (section) => {
        setSection(section);
    };

    useEffect(() => {
        const data = {
            section_id: section,
        };
        axios
            .get("/api/summary/", {
                params: data,
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [section]);

    return (
        <div>
            <SectionSelect
                sections={props.sections}
                callBackSection={callBackSection}
            />
        </div>
    );
}
