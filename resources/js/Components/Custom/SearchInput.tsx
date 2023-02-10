import React, { useState, useEffect } from "react";
type Props = {
    callBackSearch: Function;
};

export default function SearchInput(props: Props) {
    const [search, setSearch] = useState<string>("");
    const handleCallback = (e) => props.callBackSearch(e.target.value);
    return (
        <>
            <input
                type="text"
                className="dark:bg-gray-800 text-white rounded-lg"
                placeholder="Firstname or Lastname"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value),
                        setTimeout(() => {
                            handleCallback(e);
                        }, 1000);
                }}
            />
        </>
    );
}
