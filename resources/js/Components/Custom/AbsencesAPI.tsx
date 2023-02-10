import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Spinner from "./Spinner";
import GithubPicture from "./GithubPicture";
type Props = {
    section: string;
    searchValue: string;
    apiCallValue: string;
};

export default function AbsencesAPI(props: Props) {
    const [absences, setAbsences] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [itemOffset, setItemOffset] = useState<number>(0);

    const endOffset = itemOffset + 20;

    const currentItems = absences.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(absences.length / 20);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 20) % absences.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/api/absences/${props.apiCallValue.toLowerCase()}`, {
                params: {
                    section_id: Number(props.section),
                    search: props.searchValue,
                },
            })
            .then((res) => {
                setAbsences(res.data.absences);
                setLoading(false);
            });
    }, [props.apiCallValue, props.section, props.searchValue]);
    if (loading) {
        return <Spinner />;
    }
    console.log(absences);
    return (
        <>
            {absences.length > 0 ? (
                <>
                    {props.apiCallValue &&
                    props.apiCallValue != "Unjustified" ? (
                        <>
                            <table className="w-full my-8 border-red-500 border-2 text-white">
                                <thead className="border-red-500 border-2">
                                    <tr className="text-left">
                                        <th className="w-16 p-2 bg-[#373f50] border-[#202c34] border-2">
                                            {" "}
                                        </th>
                                        <th className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                            Firstname
                                        </th>
                                        <th className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                            Lastname
                                        </th>
                                        <th className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                            Start Date
                                        </th>
                                        <th className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                            End Date
                                        </th>
                                        <th className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                            Status
                                        </th>
                                        <th className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                            More
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((ele, index) => {
                                        return (
                                            <tr className="text-left hover:bg-[#202c34]">
                                                <td className=" bg-[#373f50] border-[#202c34] border-2">
                                                    <GithubPicture
                                                        className="h-16 w-16"
                                                        user={
                                                            ele.user.github_id
                                                        }
                                                    />
                                                </td>
                                                <td className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                                    {ele.user.first_name}
                                                </td>
                                                <td className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                                    {ele.user.last_name}
                                                </td>
                                                <td className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                                    {ele.dateBegin}
                                                </td>
                                                <td className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                                    {ele.dateEnd}
                                                </td>
                                                <td className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                                    {ele.status}
                                                </td>
                                                <td className="p-2 bg-[#373f50] text-green-600 border-[#202c34] border-2">
                                                    <button>Show</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <>
                            <table className="w-full my-8 border-red-500 border-2 text-white">
                                <thead className="border-red-500 border-2">
                                    <tr className="text-left">
                                        <th className="w-16 p-2 bg-[#373f50] border-[#202c34] border-2">
                                            {" "}
                                        </th>
                                        <th className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                            Firstname
                                        </th>
                                        <th className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                            Lastname
                                        </th>
                                        <th className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                            Date
                                        </th>
                                        <th className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                            Status
                                        </th>
                                        <th className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                            More
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((ele, index) => {
                                        return (
                                            <tr className="text-left hover:bg-[#202c34]">
                                                <td className=" bg-[#373f50] border-[#202c34] border-2">
                                                    <GithubPicture
                                                        className="h-16 w-16"
                                                        user={
                                                            ele.user.github_id
                                                        }
                                                    />
                                                </td>
                                                <td className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                                    {ele.user.first_name}
                                                </td>
                                                <td className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                                    {ele.user.last_name}
                                                </td>
                                                <td className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                                    {ele.date}
                                                </td>
                                                <td className="p-2 bg-[#373f50] text-[#953535] border-[#202c34] border-2">
                                                    Unjustified
                                                </td>
                                                <td className="p-2 bg-[#373f50] text-green-600 border-[#202c34] border-2">
                                                    <button>Show</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </>
                    )}
                    <ReactPaginate
                        className="flex justify-center gap-4 font-semibold text-white"
                        breakLabel="..."
                        nextLabel="next"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="previous"
                        renderOnZeroPageCount={null}
                    />
                </>
            ) : (
                <>
                    <h1 className="text-white text-4xl mx-auto">Not Found</h1>
                </>
            )}
        </>
    );
}
