import React from "react";

export default function GetInfos(props) {
    let x = props.infos.map((info) => {
        return Object.entries(info).map((value: [string, unknown]) => {
            return value[0];
        });
    })
    let y = props.infos.map((info) => {
        return Object.entries(info).map((value: [string, unknown]) => {
            return value[1];
        });
    })
    return (
        <table>
            <thead>
                <tr>
                {
                    x[0].map((info, index) => {
                        if (index < x[0].length - 2) {
                            return (
                                <th>{info}</th>
                            );
                        }
                    })
                }
                </tr>
            </thead>
            <tbody>
                {
                    y.map((info) => {
                        return (
                            <tr>
                                {
                                    Object.entries(info).map((value: unknown, index) => {
                                        if (index < Object.entries(info).length - 2) {
                                            return (
                                                <td>{value[1]}</td>
                                            );
                                        }
                                    })
                                }
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}
