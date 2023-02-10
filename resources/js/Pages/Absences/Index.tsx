import React, { useState } from "react";
import SectionSelect from "@/Components/Custom/SectionSelect";
import { Auth } from "@/Types/Auth";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AbsencesCall from "@/Components/Custom/AbsencesCall";
import AbsencesAPI from "@/Components/Custom/AbsencesAPI";
import SearchInput from "@/Components/Custom/SearchInput";
type Props = {
    auth: Auth;
    sections: {
        id: string;
    }[];
    errors: Object;
};
export default function Absences(props: Props) {
    const [section, setSection] = useState<string>(props.sections[0].id);
    const [apiCallValue, setApiCallValue] = useState<string>("All");
    const [searchValue, setSearchValue] = useState<string>("");
    function callBackSection(section) {
        setSection(section);
    }
    function callBackApiCallValue(value) {
        setApiCallValue(value);
    }
    function callBackSearch(value) {
        setSearchValue(value);
    }

    let call = ["All", "Accepted", "Unjustified", "Pending", "Refused"];
    return (
        <>
            <Head title="Absences" />
            <AuthenticatedLayout auth={props.auth} errors={props.errors}>
                <div className="w-8/12 mx-auto py-4 flex flex-col gap-8">
                    <div className="w-full flex flex-row justify-between items-center">
                        <AbsencesCall
                            call={call}
                            callBackApiCallValue={callBackApiCallValue}
                        />
                        <SearchInput callBackSearch={callBackSearch} />
                        <SectionSelect
                            callBackSection={callBackSection}
                            sections={props.sections}
                        />
                    </div>
                    <AbsencesAPI
                        section={section}
                        apiCallValue={apiCallValue}
                        searchValue={searchValue}
                        call={call}
                    />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
