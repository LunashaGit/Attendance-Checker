import React, { useState } from "react";
import ClockCorrection from "@/Components/Custom/ClockCorrection";
import DateInput from "@/Components/Custom/DateInput";
import SectionSelect from "@/Components/Custom/SectionSelect";
type Props = {
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
        <div>
            <div>
                <DateInput callBackDate={callBackDate} />
                <SectionSelect
                    sections={props.sections}
                    callBackSection={callBackSection}
                />
            </div>
            <ClockCorrection date={date} section={section} />
        </div>
    );
}
