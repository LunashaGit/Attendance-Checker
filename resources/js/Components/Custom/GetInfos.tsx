import React, { useEffect, useState } from "react";
import { Auth } from "@/Types/Auth";
import axios from "axios";

type Props = {
    auth: Auth;
    infos: Object[];
    number: number;
    call: string;
};

export default function GetInfos(props: Props) {
    const [infos, setInfos] = useState(props.infos);
    const [search, setSearch] = useState<string>("");
    useEffect(() => {
        setTimeout(() => {
            axios
                .get("/api/users", {
                    params: {
                        search: search,
                    },
                })
                .then((res) => {
                    setInfos(res.data.users);
                });
        }, 1000);
    }, [search]);

    let x = infos.map((info) => {
        return Object.entries(info).map((value: [string, unknown]) => {
            return value[0];
        });
    });

    let y = infos.map((info) => {
        return Object.entries(info).map((value: [string, unknown]) => {
            return value[1];
        });
    });
    return (
        <div>
            <div>
                <h1>Who's who</h1>
                <form
                    onChange={(e) => {
                        e.preventDefault();
                        setSearch(e.target.value);
                    }}
                >
                    <input type="text" name="search" />
                </form>
            </div>
            {x.length != 0 && y && (
                <table>
                    <thead>
                        <tr>
                            {x[0].map((info, index) => {
                                switch (info) {
                                    case "name":
                                        info = "Name";
                                        break;
                                    case "section_id":
                                        info = "Section";
                                        break;
                                    case "is_coach":
                                        info = "Type";
                                        break;
                                    default:
                                        break;
                                }
                                if (index < x[0].length - props.number) {
                                    return <th>{info}</th>;
                                }
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {y.map((info) => {
                            return (
                                <tr>
                                    {Object.entries(info).map(
                                        (value: unknown, index) => {
                                            if (
                                                index <
                                                Object.entries(info).length -
                                                    props.number
                                            ) {
                                                return <td>{value[1]}</td>;
                                            }
                                        }
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
            {x.length === 0 && (
                <div>
                    <h1>No {props.call} found</h1>
                </div>
            )}
        </div>
    );
}
