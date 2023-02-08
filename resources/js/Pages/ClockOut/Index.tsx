import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import ClockCorrection from "@/Components/Custom/ClockCorrection";
import DateInput from "@/Components/Custom/DateInput";
import SectionSelect from "@/Components/Custom/SectionSelect";
import { Auth } from "@/Types/Auth";
import { Head } from "@inertiajs/react";
type Props = {
    auth: Auth;
    errors: Object;
    sections: Object[];
};
export default function ClockOut(props: Props) {
    const [date, setDate] = useState<string>(
        new Date().toISOString().slice(0, 10)
    );
    const [section, setSection] = useState<string>("1");

    const callBackSection = (section) => {
        setSection(section);
    };

    const callBackDate = (date) => {
        setDate(date);
    };
    return (
        <>
            <Head title="Clock Correction" />
            <AuthenticatedLayout auth={props.auth} errors={props.errors}>
                <div className="w-8/12 mx-auto my-4 flex flex-col">
                    <div className="flex flex-row justify-between">
                        <DateInput callBackDate={callBackDate} />
                        <SectionSelect
                            sections={props.sections}
                            callBackSection={callBackSection}
                        />
                    </div>
                    <ClockCorrection date={date} section={section} />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
