import React, { useState, useEffect, Fragment } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Spinner from "./Spinner";
import GithubPicture from "./GithubPicture";
import { Transition, Dialog } from "@headlessui/react";
type Props = {
    section: string;
    searchValue: string;
    apiCallValue: string;
    call: string[];
};
type AbsenceType = {
    id: number;
    absence_id?: number;
    dateBegin?: string;
    dateEnd?: string;
    status: string;
    beginning?: string;
    end?: string;
    lunch?: string;
    return?: string;
    date?: string;
    location?: string;
    attendances?: string;
    circumstance?: string;
    description?: string;
    timeBegin?: string;
    timeEnd?: string;
    file?: string;
    user_id?: number;
    user: {
        id: number;
        first_name: string;
        last_name: string;
        github_id: number;
    };
};

export default function AbsencesAPI(props: Props) {
    const [absences, setAbsences] = useState<Array<AbsenceType>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [itemOffset, setItemOffset] = useState<number>(0);
    const [absenceClicked, setAbsenceClicked] = useState<boolean>(false);
    const [absenceValue, setAbsenceValue] = useState<AbsenceType>(
        {} as AbsenceType
    );
    const [update, setUpdate] = useState<boolean>(false);
    let x;
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
    console.log(absenceValue);
    if (absenceValue.hasOwnProperty("attendances")) {
        x = JSON.parse(absenceValue.attendances);
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        axios
            .put(`/api/absences`, {
                id: absenceValue.id,
                status: e.target.value,
            })
            .then((res) => {
                console.log(res.data.absence);
                setAbsences(
                    absences.map((ele) => {
                        if (ele.id == res.data.absence.id) {
                            ele.status = res.data.absence.status;
                        }
                        return ele;
                    })
                );
                setAbsenceValue({
                    ...absenceValue,
                    status: res.data.absence.status,
                });
                setUpdate(!update);
            });
    };

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
                                    {currentItems
                                        .map((ele, index) => {
                                            return (
                                                <tr className="text-left hover:bg-[#202c34]">
                                                    <td className=" bg-[#373f50] border-[#202c34] border-2">
                                                        <GithubPicture
                                                            className="h-16 w-16"
                                                            user={
                                                                ele.user
                                                                    .github_id
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
                                                        <button
                                                            onClick={() => {
                                                                setAbsenceValue(
                                                                    ele
                                                                ),
                                                                    setAbsenceClicked(
                                                                        true
                                                                    );
                                                            }}
                                                        >
                                                            Show
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                        .reverse()}
                                </tbody>
                            </table>
                            <Transition
                                appear
                                show={absenceClicked}
                                as={Fragment}
                            >
                                <Dialog
                                    as="div"
                                    className="fixed inset-0 z-10 overflow-y-auto"
                                    onClose={() => setAbsenceClicked(false)}
                                >
                                    <div className="min-h-screen px-4 text-center bg-black bg-opacity-40">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Dialog.Overlay className="fixed inset-0" />
                                        </Transition.Child>

                                        <span
                                            className="inline-block h-screen align-middle"
                                            aria-hidden="true"
                                        >
                                            &#8203;
                                        </span>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            {absenceValue != null && (
                                                <div className=" inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#373f50] shadow-xl rounded-2xl h-[24rem]">
                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-lg font-medium leading-6 text-white"
                                                    >
                                                        More Informations
                                                    </Dialog.Title>
                                                    <div className="flex flex-row overflow-hidden gap-2">
                                                        <div className="flex flex-col overflow-y-auto gap-2 w-full text-white">
                                                            <h1 className="text-xl text-center">
                                                                Absence of{" "}
                                                                {
                                                                    absenceValue.dateBegin
                                                                }{" "}
                                                                to{" "}
                                                                {
                                                                    absenceValue.dateEnd
                                                                }
                                                            </h1>
                                                            <p
                                                                className={
                                                                    (absenceValue.status ===
                                                                    "Accepted"
                                                                        ? "bg-green-500"
                                                                        : absenceValue.status ===
                                                                          "Refused"
                                                                        ? "bg-red-500"
                                                                        : "bg-blue-500") +
                                                                    " px-2 rounded-lg mx-auto"
                                                                }
                                                            >
                                                                {
                                                                    absenceValue.status
                                                                }
                                                            </p>
                                                            <div className="flex flex-col gap-2">
                                                                <h3 className="font-semibold">
                                                                    Attendances
                                                                    :{" "}
                                                                </h3>
                                                                {x &&
                                                                    x.map(
                                                                        (
                                                                            attendance
                                                                        ) => {
                                                                            return (
                                                                                <div>
                                                                                    <p>
                                                                                        {
                                                                                            attendance.date
                                                                                        }{" "}
                                                                                    </p>
                                                                                    <p>
                                                                                        {" "}
                                                                                        <b>
                                                                                            Hours
                                                                                        </b>{" "}
                                                                                        :{" "}
                                                                                        {attendance.beginning !=
                                                                                        null
                                                                                            ? attendance.beginning.slice(
                                                                                                  0,
                                                                                                  5
                                                                                              )
                                                                                            : "--:--"}{" "}
                                                                                        |{" "}
                                                                                        {attendance.lunch !=
                                                                                        null
                                                                                            ? attendance.lunch.slice(
                                                                                                  0,
                                                                                                  5
                                                                                              )
                                                                                            : "--:--"}{" "}
                                                                                        |{" "}
                                                                                        {attendance.lunchEnd !=
                                                                                        null
                                                                                            ? attendance.lunchEnd.slice(
                                                                                                  0,
                                                                                                  5
                                                                                              )
                                                                                            : "--:--"}{" "}
                                                                                        |{" "}
                                                                                        {attendance.end !=
                                                                                        null
                                                                                            ? attendance.end.slice(
                                                                                                  0,
                                                                                                  5
                                                                                              )
                                                                                            : "--:--"}
                                                                                    </p>
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                                <div className="flex flex-row gap-2">
                                                                    <h3 className="font-semibold">
                                                                        Circumstance
                                                                        :{" "}
                                                                    </h3>
                                                                    <p>
                                                                        {
                                                                            absenceValue.circumstance
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="flex flex-row gap-2">
                                                                    <h3 className="font-semibold">
                                                                        Evidence
                                                                        :{" "}
                                                                    </h3>
                                                                    {absenceValue.file !=
                                                                    null ? (
                                                                        <a
                                                                            className="text-green-500"
                                                                            href={
                                                                                "/images/" +
                                                                                absenceValue.file
                                                                            }
                                                                        >
                                                                            Link
                                                                        </a>
                                                                    ) : (
                                                                        <p>
                                                                            No
                                                                            Evidence
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                <div className="flex flex-row gap-2">
                                                                    <h3 className="font-semibold">
                                                                        Description
                                                                        :{" "}
                                                                    </h3>
                                                                    <p>
                                                                        {absenceValue.description !=
                                                                        null
                                                                            ? absenceValue.description
                                                                            : "No description"}
                                                                    </p>
                                                                </div>
                                                                <button
                                                                    className="bg-blue-500 rounded-lg px-2 py-1 mx-auto"
                                                                    onClick={() => {
                                                                        setAbsenceClicked(
                                                                            false
                                                                        );
                                                                        setTimeout(
                                                                            () => {
                                                                                setUpdate(
                                                                                    true
                                                                                );
                                                                            },
                                                                            500
                                                                        );
                                                                    }}
                                                                >
                                                                    Update
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Transition.Child>
                                    </div>
                                </Dialog>
                            </Transition>
                            <Transition appear show={update} as={Fragment}>
                                <Dialog
                                    as="div"
                                    className="fixed inset-0 z-10 overflow-y-auto"
                                    onClose={() => setUpdate(false)}
                                >
                                    <div className="min-h-screen px-4 text-center bg-black bg-opacity-40">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Dialog.Overlay className="fixed inset-0" />
                                        </Transition.Child>

                                        <span
                                            className="inline-block h-screen align-middle"
                                            aria-hidden="true"
                                        >
                                            &#8203;
                                        </span>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            {absenceValue != null && (
                                                <div className=" inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#373f50] shadow-xl rounded-2xl">
                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-lg font-medium leading-6 text-white"
                                                    >
                                                        More Informations
                                                    </Dialog.Title>
                                                    <div className="flex flex-row overflow-hidden gap-2">
                                                        <div className="flex flex-col overflow-y-auto gap-2 w-full text-white">
                                                            <h1 className="text-xl text-center">
                                                                Update of{" "}
                                                                {absenceValue.dateBegin +
                                                                    " " +
                                                                    absenceValue.dateEnd}
                                                            </h1>
                                                            <select
                                                                className="bg-gray-800 text-white rounded-lg"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    handleUpdate(
                                                                        e
                                                                    );
                                                                }}
                                                            >
                                                                <option
                                                                    selected="true"
                                                                    disabled
                                                                >
                                                                    Select
                                                                </option>
                                                                {props.call
                                                                    .slice(1, 5)
                                                                    .map(
                                                                        (
                                                                            value,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <option
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    value={
                                                                                        value
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        value
                                                                                    }
                                                                                </option>
                                                                            );
                                                                        }
                                                                    )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Transition.Child>
                                    </div>
                                </Dialog>
                            </Transition>
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
                                    {currentItems
                                        .map((ele, index) => {
                                            return (
                                                <tr className="text-left hover:bg-[#202c34]">
                                                    <td className=" bg-[#373f50] border-[#202c34] border-2">
                                                        <GithubPicture
                                                            className="h-16 w-16"
                                                            user={
                                                                ele.user
                                                                    .github_id
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
                                                        <button
                                                            onClick={() => {
                                                                setAbsenceValue(
                                                                    ele
                                                                ),
                                                                    setAbsenceClicked(
                                                                        true
                                                                    );
                                                            }}
                                                        >
                                                            Show
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                        .reverse()}
                                </tbody>
                            </table>
                            <Transition
                                appear
                                show={absenceClicked}
                                as={Fragment}
                            >
                                <Dialog
                                    as="div"
                                    className="fixed inset-0 z-10 overflow-y-auto"
                                    onClose={() => setAbsenceClicked(false)}
                                >
                                    <div className="min-h-screen px-4 text-center bg-black bg-opacity-40">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Dialog.Overlay className="fixed inset-0" />
                                        </Transition.Child>

                                        <span
                                            className="inline-block h-screen align-middle"
                                            aria-hidden="true"
                                        >
                                            &#8203;
                                        </span>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            {absenceValue != null && (
                                                <div className=" inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#373f50] shadow-xl rounded-2xl h-96">
                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-lg font-medium leading-6 text-white"
                                                    >
                                                        More Informations
                                                    </Dialog.Title>
                                                    <div className="flex flex-row overflow-hidden gap-2">
                                                        <div className="flex flex-col overflow-y-auto h-80 gap-2 w-full text-white">
                                                            <h1 className="text-xl text-center">
                                                                Absence of{" "}
                                                                {
                                                                    absenceValue.date
                                                                }
                                                            </h1>
                                                            <p
                                                                className={
                                                                    "bg-red-500 px-2 rounded-lg mx-auto"
                                                                }
                                                            >
                                                                Unjustified
                                                            </p>
                                                            <div className="flex flex-col gap-2">
                                                                <h3 className="font-semibold">
                                                                    Attendances
                                                                    :{" "}
                                                                </h3>
                                                                <div>
                                                                    <p>
                                                                        {" "}
                                                                        <b>
                                                                            Hours
                                                                        </b>{" "}
                                                                        :{" "}
                                                                        {absenceValue.beginning !=
                                                                        null
                                                                            ? absenceValue.beginning.slice(
                                                                                  0,
                                                                                  5
                                                                              )
                                                                            : "--:--"}{" "}
                                                                        |{" "}
                                                                        {absenceValue.lunch !=
                                                                        null
                                                                            ? absenceValue.lunch.slice(
                                                                                  0,
                                                                                  5
                                                                              )
                                                                            : "--:--"}{" "}
                                                                        |{" "}
                                                                        {absenceValue.return !=
                                                                        null
                                                                            ? absenceValue.lunch.slice(
                                                                                  0,
                                                                                  5
                                                                              )
                                                                            : "--:--"}{" "}
                                                                        |{" "}
                                                                        {absenceValue.end !=
                                                                        null
                                                                            ? absenceValue.end.slice(
                                                                                  0,
                                                                                  5
                                                                              )
                                                                            : "--:--"}
                                                                    </p>
                                                                </div>
                                                                <div className="flex flex-row gap-2">
                                                                    <h3 className="font-semibold">
                                                                        Location
                                                                        :{" "}
                                                                    </h3>
                                                                    <p>
                                                                        {
                                                                            absenceValue.location
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Transition.Child>
                                    </div>
                                </Dialog>
                            </Transition>
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
