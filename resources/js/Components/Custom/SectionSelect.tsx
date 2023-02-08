import React from "react";
type Props = {
    sections: Object[];
    callBackSection: Function;
};

type Section = {
    id: number;
    name: string;
};

export default function SectionSelect(props: Props) {
    return (
        <>
            <select
                onChange={(e) => {
                    props.callBackSection(e.target.value);
                }}
                className="dark:bg-gray-800 text-white rounded-lg"
            >
                {props.sections.map((section: Section, index: number) => {
                    return (
                        <option key={index} value={section.id}>
                            {section.name}
                        </option>
                    );
                })}
            </select>
        </>
    );
}
