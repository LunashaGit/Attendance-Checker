import React, { useState, Fragment } from "react";
import { Auth } from "@/Types/Auth";
import { Transition, Dialog } from "@headlessui/react";
import axios from "axios";
type Props = {
    auth: Auth;
    attendancesBefore: Object[];
};

type TypeAttendance = {
    date: string;
    beginning: string;
    end: string;
    return: string;
    lunch: string;
};

type TypeValueAttendance = {
    dateBegin: string;
    dateEnd: string;
    timeBegin?: string;
    timeEnd?: string;
    beginning: string;
    end: string;
    return: string;
    lunch: string;
};

export default function OverallAttendance(props: Props) {
    const [attendances, setAttendances] = useState<Object[]>(
        props.attendancesBefore
    );
    const [open, setOpen] = useState<boolean>(false);
    const [valueAttendance, setValueAttendance] = useState<TypeValueAttendance>(
        {
            dateBegin: null,
            dateEnd: null,
            timeBegin: "09:00",
            timeEnd: "17:00",
            beginning: null,
            lunch: null,
            return: null,
            end: null,
        }
    );
    const circumstanceList = [
        "Health",
        "Family issues",
        "Mobility issues",
        "Administrative matters",
        "Private matters",
        "Event attending",
        "Unspecfied",
    ];
    const fileInput = React.useRef();

    const handleClick = () => {
        fileInput.current.click();
    };

    const handleFileChange = (e) => {
        const fileUploaded = e.target.files[0];
    };

    function handleSubmit(e) {
        e.preventDefault();
        axios
            .post(
                "/api/absences",
                {
                    user_id: props.auth.user.id,
                    circumstance: e.target.circumstance.value,
                    dateBegin: valueAttendance.dateBegin,
                    dateEnd: valueAttendance.dateEnd,
                    timeBegin: valueAttendance.timeBegin,
                    timeEnd: valueAttendance.timeEnd,
                    file: fileInput.current.files[0],
                    description: e.target.description.value,
                },
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            )
            .then((response) => {
                console.log(response);
                setOpen(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    console.log(open);
    console.log(valueAttendance);
    return (
        <div className="flex flex-col gap-4 w-2/6">
            <h2 className="text-center text-white font-semibold">
                Absences to Justify
            </h2>
            <p className="text-xl text-white font-semibold text-left">
                Overall Attendance: NULL%
            </p>
            <div className="bg-gray-700 rounded-lg">
                <div
                    role="progressbar"
                    aria-valuenow={100}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    className="w-5/6 h-4 bg-gray-200 rounded-lg text-center font-semibold text-xs text-gray-700"
                >
                    NULL
                </div>
            </div>
            <p className="text-xs text-white">
                OAR must stay above 80% or contract can be terminated.
            </p>
            {attendances &&
                attendances
                    .map((attendance: TypeAttendance, index: number) => {
                        return (
                            <div
                                key={index}
                                className="dark:bg-[#39435a] p-2 rounded-sm"
                            >
                                <p className="text-white text-left">
                                    {index + 1}. <b>{attendance.date}</b>
                                </p>
                                <div className="flex flex-col justify-center text-white gap-4 dark:bg-gray-800 p-2 rounded-sm">
                                    <div className="flex flex-row gap-2 items-center justify-center">
                                        <p className="text-left text-base flex flex-row gap-4">
                                            {attendance.beginning === null
                                                ? "N/A"
                                                : attendance.beginning.slice(
                                                      0,
                                                      5
                                                  )}
                                        </p>
                                        <p className="text-left text-base flex flex-row gap-4">
                                            {attendance.lunch === null
                                                ? "--:--"
                                                : attendance.lunch.slice(0, 5)}
                                        </p>
                                        <p className="text-left text-base flex flex-row gap-4">
                                            {attendance.return === null
                                                ? "--:--"
                                                : attendance.return.slice(0, 5)}
                                        </p>
                                        <p className="text-left text-base flex flex-row gap-4">
                                            {attendance.end === null
                                                ? "--:--"
                                                : attendance.end.slice(0, 5)}
                                        </p>
                                    </div>
                                    <hr className="border-2 border-white w-5/6 rounded-md mx-auto" />
                                    <button
                                        className="text-sm text-center text-white"
                                        onClick={() => {
                                            setValueAttendance({
                                                dateBegin: attendance.date,
                                                dateEnd: attendance.date,
                                                timeBegin: "09:00",
                                                timeEnd: "17:00",
                                                beginning: attendance.beginning,
                                                lunch: attendance.lunch,
                                                return: attendance.return,
                                                end: attendance.end,
                                            });
                                            setOpen(true);
                                        }}
                                    >
                                        Open
                                    </button>
                                </div>
                            </div>
                        );
                    })
                    .reverse()}
            <Transition appear show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={setOpen}
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
                            <div className=" inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#373f50] shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-white"
                                >
                                    Record an Absence
                                </Dialog.Title>
                                <div className="mt-2">
                                    <form
                                        onSubmit={(e) => {
                                            handleSubmit(e);
                                        }}
                                        className="flex flex-col justify-center items-center gap-4"
                                    >
                                        <div className="w-full">
                                            <label
                                                className="text-white text-sm"
                                                htmlFor="circumstance"
                                            >
                                                Circumstance
                                            </label>
                                            <select
                                                name="circumstance"
                                                className="w-full dark:bg-gray-900 text-[#979ea3]"
                                                defaultValue={0}
                                            >
                                                <option disabled>
                                                    (Choose a circumstance)
                                                </option>
                                                {circumstanceList.map(
                                                    (ele, index) => (
                                                        <option key={index}>
                                                            {ele}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                        <div className="w-full flex flex-row gap-2">
                                            <div className="w-1/2">
                                                <label
                                                    className="text-white text-sm"
                                                    htmlFor="dateBegin"
                                                >
                                                    Start Date
                                                </label>
                                                <input
                                                    className="w-full dark:bg-gray-900 text-[#979ea3]"
                                                    type="date"
                                                    name="dateBegin"
                                                    placeholder="Date"
                                                    onChange={(e) => {
                                                        setValueAttendance({
                                                            ...valueAttendance,
                                                            dateBegin:
                                                                e.target.value,
                                                        });
                                                    }}
                                                    value={
                                                        valueAttendance.dateBegin
                                                    }
                                                />
                                            </div>
                                            <div className="w-1/2">
                                                <label
                                                    className="text-white text-sm"
                                                    htmlFor="dateEnd"
                                                >
                                                    End Date
                                                </label>
                                                <input
                                                    className="w-full dark:bg-gray-900 text-[#979ea3]"
                                                    type="date"
                                                    name="dateEnd"
                                                    placeholder="Date"
                                                    onChange={(e) => {
                                                        setValueAttendance({
                                                            ...valueAttendance,
                                                            dateEnd:
                                                                e.target.value,
                                                        });
                                                    }}
                                                    value={
                                                        valueAttendance.dateEnd
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-row gap-2">
                                            <div className="w-1/2">
                                                <label
                                                    className="text-white text-sm"
                                                    htmlFor="timeBegin"
                                                >
                                                    Start time
                                                </label>
                                                <input
                                                    className="w-full dark:bg-gray-900 text-[#979ea3]"
                                                    type="time"
                                                    name="timeBegin"
                                                    placeholder="Time"
                                                    onChange={(e) => {
                                                        setValueAttendance({
                                                            ...valueAttendance,
                                                            timeBegin:
                                                                e.target.value,
                                                        });
                                                    }}
                                                    value={
                                                        valueAttendance.timeBegin
                                                    }
                                                />
                                            </div>
                                            <div className="w-1/2">
                                                <label
                                                    className="text-white text-sm"
                                                    htmlFor="timeEnd"
                                                >
                                                    End Date
                                                </label>
                                                <input
                                                    className="w-full dark:bg-gray-900 text-[#979ea3]"
                                                    type="time"
                                                    name="timeEnd"
                                                    placeholder="Date"
                                                    onChange={(e) => {
                                                        setValueAttendance({
                                                            ...valueAttendance,
                                                            timeEnd:
                                                                e.target.value,
                                                        });
                                                    }}
                                                    value={
                                                        valueAttendance.timeEnd
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <label
                                                className="text-white text-sm"
                                                htmlFor="docs"
                                            >
                                                Upload evidence (optional)
                                            </label>
                                            <div className="uploader">
                                                <input
                                                    type="file"
                                                    name="file"
                                                    ref={fileInput}
                                                    accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
                                                    className="opacity-0 w-[1px] h-[1px]"
                                                />
                                                <div
                                                    className="dropZone cursor-pointer text-white flex flex-col text-center justify-center items-center py-4 border-2 border-white border-dashed rounded-lg"
                                                    onClick={handleClick}
                                                >
                                                    <svg
                                                        aria-hidden="true"
                                                        focusable="false"
                                                        data-prefix="far"
                                                        data-icon="arrow-square-down"
                                                        className="svg-inline--fa fa-arrow-square-down fa-w-14 dropIcon w-14"
                                                        role="img"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 448 512"
                                                    >
                                                        <path
                                                            fill="currentColor"
                                                            d="M353.9 266.9L232.5 388.3c-4.7 4.7-12.3 4.7-17 0L94.1 266.9c-4.7-4.7-4.7-12.3 0-17l19.6-19.6c4.8-4.8 12.5-4.7 17.2.2l67.1 70.3V140c0-6.6 5.4-12 12-12h28c6.6 0 12 5.4 12 12v160.8l67.1-70.3c4.7-4.9 12.4-5 17.2-.2l19.6 19.6c4.7 4.7 4.7 12.3 0 17zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"
                                                        ></path>
                                                    </svg>
                                                    <span className="dropLabel">
                                                        <strong>
                                                            Choose a file
                                                        </strong>
                                                        <br />
                                                        <small>
                                                            Photo or Screen
                                                            capture of
                                                            certificate, proof
                                                            document…
                                                        </small>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <label
                                                className="text-white text-sm"
                                                htmlFor="description"
                                            >
                                                Description (optional)
                                            </label>
                                            <textarea
                                                className="w-full dark:bg-gray-900 text-[#979ea3]"
                                                name="description"
                                                placeholder="Add more details, ..."
                                                rows={4}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
