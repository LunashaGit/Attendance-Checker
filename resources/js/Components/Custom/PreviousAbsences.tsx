import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Auth } from "@/Types/Auth";
import { Transition, Dialog } from "@headlessui/react";

type Props = {
    auth: Auth;
};
type TypeAbsence = {
    id: number;
    user_id: number;
    circumstance: string;
    dateBegin: string;
    dateEnd: string;
    timeBegin: string;
    timeEnd: string;
    file?: string;
    description?: string;
    attendances: string;
    status: string;
};

export default function PreviousAbsences(props: Props) {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [absences, setAbsences] = useState([]);
    const [absencesToShow, setAbsencesToShow] = useState<TypeAbsence>({
        id: null,
        user_id: null,
        circumstance: null,
        dateBegin: null,
        dateEnd: null,
        timeBegin: null,
        timeEnd: null,
        file: null,
        description: null,
        attendances: null,
        status: null,
    });

    useEffect(() => {
        axios
            .get("/api/absences/previous", {
                params: {
                    user_id: props.auth.user.id,
                },
            })
            .then((res) => {
                setAbsences(res.data.absences);
                if (res.data.absences.length > 0) {
                    setAbsencesToShow(
                        res.data.absences[res.data.absences.length - 1]
                    );
                }
            });
    }, [isClicked]);
    let x;
    if (absences.length != 0) {
        x = JSON.parse(absencesToShow.attendances);
    }
    return (
        <>
            <button
                className="text-white p-2 rounded-lg border-2 border-white hover:bg-white hover:text-black"
                onClick={() => setIsClicked(true)}
            >
                Show previous absences
            </button>
            <Transition appear show={isClicked} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={setIsClicked}
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
                            <div className=" inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#373f50] shadow-xl rounded-2xl h-96">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-white"
                                >
                                    Previous Absences
                                </Dialog.Title>
                                <div className="flex flex-row overflow-hidden gap-2">
                                    <div className="flex flex-col overflow-y-auto h-80 gap-2 w-4/12">
                                        {absences
                                            .map((absence, index) => {
                                                return (
                                                    <>
                                                        <button
                                                            className={
                                                                (absence.id ===
                                                                absencesToShow.id
                                                                    ? "dark:bg-gray-900"
                                                                    : "") +
                                                                " text-white p-2 rounded-lg hover:dark:bg-gray-900 text-sm"
                                                            }
                                                            onClick={() => {
                                                                setAbsencesToShow(
                                                                    absence
                                                                );
                                                            }}
                                                        >
                                                            {absence.dateBegin +
                                                                " - " +
                                                                absence.dateEnd}
                                                        </button>
                                                    </>
                                                );
                                            })
                                            .reverse()}
                                    </div>
                                    {absences.length != 0 && (
                                        <div className="flex flex-col w-8/12 text-white">
                                            <h1 className="text-xl text-center">
                                                Absence of{" "}
                                                {absencesToShow.dateBegin} to{" "}
                                                {absencesToShow.dateEnd}
                                            </h1>
                                            <p
                                                className={
                                                    (absencesToShow.status ===
                                                    "Accepted"
                                                        ? "bg-green-500"
                                                        : "bg-blue-500") +
                                                    " px-2 rounded-lg mx-auto"
                                                }
                                            >
                                                {absencesToShow.status}
                                            </p>
                                            <div className="flex flex-col gap-2 overflow-y-auto h-64">
                                                <h3 className="font-semibold">
                                                    Attendances :{" "}
                                                </h3>
                                                {x &&
                                                    x.map((attendance) => {
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
                                                                    {attendance.return !=
                                                                    null
                                                                        ? attendance.return.slice(
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
                                                    })}
                                                <div className="flex flex-row gap-2">
                                                    <h3 className="font-semibold">
                                                        Circumstance :{" "}
                                                    </h3>
                                                    <p>
                                                        {
                                                            absencesToShow.circumstance
                                                        }
                                                    </p>
                                                </div>
                                                <div className="flex flex-row gap-2">
                                                    <h3 className="font-semibold">
                                                        Evidence :{" "}
                                                    </h3>
                                                    <a
                                                        className="text-green-500"
                                                        href={
                                                            "/images/" +
                                                            absencesToShow.file
                                                        }
                                                    >
                                                        Link
                                                    </a>
                                                </div>
                                                <div className="flex flex-row gap-2">
                                                    <h3 className="font-semibold">
                                                        Description :{" "}
                                                    </h3>
                                                    <p>
                                                        {absencesToShow.description !=
                                                        null
                                                            ? absencesToShow.description
                                                            : "No description"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
