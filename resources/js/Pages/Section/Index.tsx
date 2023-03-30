import React, { useState, useEffect } from "react";
import SectionSelect from "@/Components/Custom/SectionSelect";
import axios from "axios";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Summary from "@/Components/Custom/Summary";
import { Head } from "@inertiajs/react";
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
            <Head title="Summary of Users" />
            <Authenticated auth={props.auth} errors={props.errors}>
                <div className="max-w-7xl mx-auto my-4">
                    <SectionSelect
                        sections={props.sections}
                        callBackSection={callBackSection}
                    />
                    <Summary infos={infos} />
                </div>
            </Authenticated>
        </div>
    );
}
