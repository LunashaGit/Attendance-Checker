import React, { useState, useEffect } from "react";
type Props = {
    callBackSearch: Function;
};

export default function SearchInput(props: Props) {
    const [search, setSearch] = useState<string>("");
    useEffect(() => {
        props.callBackSearch(search);
    }, [search]);
    return (
        <>
            <input
                type="text"
                className="dark:bg-gray-800 text-white rounded-lg"
                placeholder="Firstname or Lastname"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
        </>
    );
}
