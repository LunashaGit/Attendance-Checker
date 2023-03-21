import React, { useState, useEffect } from "react";
import SectionSelect from "@/Components/Custom/SectionSelect";
import axios from "axios";
import GetInfos from "@/Components/Custom/GetInfos";
import Summary from "@/Components/Custom/Summary";
export default function Section(props) {
    const [section, setSection] = useState<string>("1");
    const [infos, setInfos] = useState<Array<Object>>([]);

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
                setInfos(response.data.informations.users);
            });
    }, [section]);

    return (
        <div>
            <SectionSelect
                sections={props.sections}
                callBackSection={callBackSection}
            />
            <Summary infos={infos} />
        </div>
    );
}
