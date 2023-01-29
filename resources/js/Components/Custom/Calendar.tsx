import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import GithubPicture from "./GithubPicture";

type TypeDayValue = {
    day: number;
    month: number;
    year: number;
};

type TypeTechTalks = {
    map?(arg0: (techTalk: TypeTechTalks) => JSX.Element): React.ReactNode;
    id?: number;
    user_id?: number;
    title?: string;
    date?: string;
    time?: string;
    is_over?: boolean;
    commentary?: string;
    created_at?: string;
    updated_at?: string;
    user?: {
        id?: number;
        name?: string;
        github_id?: number;
        section?: {
            id?: number;
            name?: string;
        };
    };
};

export default function Calendar(props) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dayClicked, setDayClicked] = useState<boolean>(false);
    const [dayValue, setDayValue] = useState<TypeDayValue>({
        day: null,
        month: null,
        year: null,
    });
    const [hour, setHour] = useState<string>("13:30");
    const [techTalks, setTechTalks] = useState<TypeTechTalks>(props.techTalks);
    const [valueTechTalks, setValueTechTalks] = useState<TypeTechTalks>({
        id: null,
        title: null,
        date: null,
        time: null,
        commentary: null,
        is_over: null,
        user: {
            id: null,
            name: null,
            section: {
                name: null,
            },
        },
    });
    const [campus, setCampus] = useState<number>(
        props.auth.user.section.campus_id
    );
    const nextMonth = () => {
        setCurrentDate(
            new Date(currentDate.setMonth(currentDate.getMonth() + 1))
        );
    };
    const [techTalkClicked, setTechTalkClicked] = useState<boolean>(false);

    const prevMonth = () => {
        setCurrentDate(
            new Date(currentDate.setMonth(currentDate.getMonth() - 1))
        );
    };

    const daysInMonth = () => {
        return new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        ).getDate();
    };

    const days = [];
    for (let i = 1; i <= daysInMonth(); i++) {
        days.push(i);
    }

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const monthName = monthNames[currentDate.getMonth()];
    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            user_id: props.auth.user.id,
            title: e.target.title.value,
            date: e.target.date.value,
            time: e.target.time.value,
            commentary: e.target.commentary.value,
            campus_id: props.auth.user.section.campus_id,
            month:
                currentDate.getMonth().toString().length == 1
                    ? "0" + (currentDate.getMonth() + 1)
                    : currentDate.getMonth() + 1,
        };
        axios
            .post("/api/techtalks", data)
            .then((res) => {
                setTechTalks(res.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
        setDayClicked(false);
    }

    const daysOfWeek = days.filter((day) => {
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );
        return date.getDay() !== 0 && date.getDay() !== 6;
    });

    useEffect(() => {
        if (techTalkClicked) {
            setDayClicked(false);
        } else if (dayClicked) {
            setTechTalkClicked(false);
        }
    }, [dayClicked, techTalkClicked]);

    useEffect(() => {
        axios
            .get("/api/techtalks", {
                params: {
                    campus_id: campus,
                    month:
                        currentDate.getMonth().toString().length == 1
                            ? "0" + (currentDate.getMonth() + 1)
                            : currentDate.getMonth() + 1,
                },
            })
            .then((res) => {
                setTechTalks(res.data[0]);
            });
    }, [campus, currentDate]);
    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex flex-row justify-between w-full my-4">
                <div className="flex flex-row gap-4">
                    <button
                        className="
                    bg-[#66a2e2] text-white rounded-lg w-24 py-2
                    "
                        onClick={prevMonth}
                    >
                        Previous
                    </button>
                    <button
                        className="
                    bg-[#66a2e2] text-white rounded-lg w-24 py-2
                    "
                        onClick={nextMonth}
                    >
                        Next
                    </button>
                </div>
                <div className="flex flex-row gap-4">
                    <select
                        className="bg-[#1f2937] text-white rounded-lg w-24 py-2"
                        onChange={(e) => {
                            setCampus(Number(e.target.value));
                        }}
                        defaultValue={0}
                    >
                        <option
                            value={0}
                            disabled
                            className="bg-[#1f2937] text-white"
                        >
                            ----
                        </option>
                        {props.campuses.map((campus) => (
                            <option
                                key={campus.id}
                                value={campus.id}
                                className="bg-[#1f2937] text-white"
                            >
                                {campus.name}
                            </option>
                        ))}
                    </select>
                </div>
                <h1>
                    {monthName} {currentDate.getFullYear()}
                </h1>
            </div>

            <div className="grid grid-cols-5 gap-4">
                {daysOfWeek.map((day, index) => (
                    <div
                        className={
                            (day === new Date().getDate() &&
                            currentDate.getMonth() === new Date().getMonth() &&
                            currentDate.getFullYear() ===
                                new Date().getFullYear()
                                ? "border-[#66a2e2]"
                                : "border-[#dee2e6]") +
                            " w-full border-2 cursor-pointer rounded-lg mx-auto bg-[#1f2937] min-h-[4rem] relative z-0"
                        }
                        key={index}
                        defaultValue={day}
                        onClick={() => {
                            setDayValue({
                                day: day,
                                month: currentDate.getMonth() + 1,
                                year: currentDate.getFullYear(),
                            });
                            setDayClicked(true);
                        }}
                    >
                        <div className="flex gap-2 items-center justify-center">
                            <h4 className="text-sm text-gray-400">
                                {new Date(
                                    currentDate.getFullYear(),
                                    currentDate.getMonth(),
                                    day
                                )
                                    .toLocaleString("en-us", {
                                        weekday: "long",
                                    })
                                    .slice(0, 3)}
                            </h4>
                            <h1 className="text-lg font-semibold">{day}</h1>
                            <h4 className="text-sm text-gray-400">
                                {currentDate.getFullYear()}
                            </h4>
                        </div>
                        <hr
                            className={
                                (day === new Date().getDate() &&
                                currentDate.getMonth() ===
                                    new Date().getMonth() &&
                                currentDate.getFullYear() ===
                                    new Date().getFullYear()
                                    ? "border-[#66a2e2]"
                                    : "border-[#dee2e6]") +
                                " border-1 w-4/5 mx-auto"
                            }
                        />
                        {techTalks.map((techTalk) => {
                            if (
                                techTalk.date ===
                                `${currentDate.getFullYear()}-${
                                    currentDate.getMonth().toString().length ==
                                    1
                                        ? "0" + (currentDate.getMonth() + 1)
                                        : currentDate.getMonth()
                                }-${
                                    day.toString().length == 1 ? "0" + day : day
                                }`
                            ) {
                                return (
                                    <div
                                        className="flex flex-row gap-2 items-center w-[90%] z-100 h-20 relative bg-[#1b212c] mx-auto my-2 rounded-md"
                                        key={techTalk.id}
                                        onClick={() => {
                                            setTechTalkClicked(true),
                                                setValueTechTalks({
                                                    id: techTalk.id,
                                                    title: techTalk.title,
                                                    date: techTalk.date,
                                                    time: techTalk.time,
                                                    is_over: techTalk.is_over,
                                                    commentary:
                                                        techTalk.commentary,
                                                    user: {
                                                        id: techTalk.user.id,
                                                        name: techTalk.user
                                                            .name,
                                                        github_id:
                                                            techTalk.user
                                                                .github_id,
                                                        section: {
                                                            name: techTalk.user
                                                                .section.name,
                                                        },
                                                    },
                                                });
                                        }}
                                    >
                                        <small className="rotate-moins90">
                                            {techTalk.time.slice(0, 5)}
                                        </small>

                                        <div className="text-left">
                                            <h4 className="text-sm">
                                                {techTalk.title}
                                            </h4>
                                            <h6 className="text-sm text-gray-400">
                                                {techTalk.user.name}
                                            </h6>
                                            <h6 className="text-sm text-gray-400">
                                                {techTalk.user.section.name}
                                            </h6>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                ))}
            </div>
            <Transition appear show={dayClicked} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={setDayClicked}
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
                                    Create a tech-talk
                                </Dialog.Title>
                                <div className="mt-2">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="flex flex-col justify-center items-center gap-4"
                                    >
                                        <div className="w-full">
                                            <label
                                                className="text-white text-sm"
                                                htmlFor="title"
                                            >
                                                Title
                                            </label>
                                            <input
                                                className="w-full dark:bg-gray-900 text-[#979ea3]"
                                                type="text"
                                                name="title"
                                                placeholder="Title"
                                            />
                                        </div>
                                        <div className="w-full flex flex-row gap-2">
                                            <div className="w-full">
                                                <label
                                                    className="text-white text-sm"
                                                    htmlFor="date"
                                                >
                                                    Date
                                                </label>
                                                <input
                                                    className="w-full dark:bg-gray-900 text-[#979ea3]"
                                                    type="date"
                                                    name="date"
                                                    placeholder="Date"
                                                    readOnly
                                                    value={
                                                        (dayValue.day &&
                                                            dayValue.month &&
                                                            dayValue.year) ==
                                                        undefined
                                                            ? ""
                                                            : `${
                                                                  dayValue.year
                                                              }-${
                                                                  dayValue.month.toString()
                                                                      .length ==
                                                                  1
                                                                      ? "0" +
                                                                        dayValue.month
                                                                      : dayValue.month
                                                              }-${
                                                                  dayValue.day.toString()
                                                                      .length ==
                                                                  1
                                                                      ? "0" +
                                                                        dayValue.day
                                                                      : dayValue.day
                                                              }`
                                                    }
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label
                                                    className="text-white text-sm"
                                                    htmlFor="time"
                                                >
                                                    Time
                                                </label>
                                                <input
                                                    className="w-full dark:bg-gray-900 text-[#979ea3]"
                                                    type="time"
                                                    name="time"
                                                    placeholder="Time"
                                                    value={hour}
                                                    onChange={(e) => {
                                                        setHour(e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <label
                                                className="text-white text-sm"
                                                htmlFor="commentary"
                                            >
                                                Abstract
                                            </label>
                                            <textarea
                                                className="w-full dark:bg-gray-900 text-[#979ea3]"
                                                name="commentary"
                                                placeholder="Optional abstract of the Tech Talk (small description of your topic)"
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
            <Transition appear show={techTalkClicked} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => {
                        setTechTalkClicked(false), setDayClicked(false);
                    }}
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
                                    Tech Talk
                                </Dialog.Title>
                                <hr className="my-2" />
                                <div className="flex flex-col justify-center">
                                    <div className="flex flex-row justify-between">
                                        <div>
                                            <h1 className="text-white text-xl">
                                                {valueTechTalks.title}
                                            </h1>
                                            <p className="text-white text-sm">
                                                {valueTechTalks.date +
                                                    ", " +
                                                    valueTechTalks.time}
                                            </p>
                                        </div>
                                        {valueTechTalks.is_over == true && (
                                            <div>
                                                <p className="px-2 text-white bg-green-500 rounded-lg">
                                                    Done
                                                </p>
                                            </div>
                                        )}
                                        {valueTechTalks.is_over == false &&
                                            (props.auth.user.id ==
                                                valueTechTalks.user.id ||
                                                (props.auth.user.is_admin ||
                                                    props.auth.user.is_coach) ==
                                                    true) && (
                                                <div>
                                                    <button
                                                        className="px-2 mr-2 text-white bg-red-500 rounded-lg"
                                                        onClick={() => {
                                                            setTechTalkClicked(
                                                                false
                                                            ),
                                                                axios
                                                                    .delete(
                                                                        "/api/techtalks",
                                                                        {
                                                                            data: {
                                                                                id: valueTechTalks.id,
                                                                                campus_id:
                                                                                    props
                                                                                        .auth
                                                                                        .user
                                                                                        .section
                                                                                        .campus_id,
                                                                                month:
                                                                                    currentDate
                                                                                        .getMonth()
                                                                                        .toString()
                                                                                        .length ==
                                                                                    1
                                                                                        ? "0" +
                                                                                          (currentDate.getMonth() +
                                                                                              1)
                                                                                        : currentDate.getMonth() +
                                                                                          1,
                                                                            },
                                                                        }
                                                                    )
                                                                    .then(
                                                                        (
                                                                            res
                                                                        ) => {
                                                                            setTechTalks(
                                                                                res
                                                                                    .data[0]
                                                                            ),
                                                                                setValueTechTalks(
                                                                                    {
                                                                                        id: null,
                                                                                        title: null,
                                                                                        date: null,
                                                                                        time: null,
                                                                                        commentary:
                                                                                            null,
                                                                                        is_over:
                                                                                            null,
                                                                                        user: {
                                                                                            id: null,
                                                                                            name: null,
                                                                                            section:
                                                                                                {
                                                                                                    id: null,
                                                                                                    name: null,
                                                                                                },
                                                                                        },
                                                                                    }
                                                                                );
                                                                        }
                                                                    );
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="px-2 ml-2 text-white bg-blue-500 rounded-lg"
                                                        onClick={() => {
                                                            setTechTalkClicked(
                                                                false
                                                            ),
                                                                axios
                                                                    .put(
                                                                        "/api/techtalks",
                                                                        {
                                                                            id: valueTechTalks.id,
                                                                            is_over:
                                                                                true,
                                                                            campus_id:
                                                                                props
                                                                                    .auth
                                                                                    .user
                                                                                    .section
                                                                                    .campus_id,
                                                                            month:
                                                                                currentDate
                                                                                    .getMonth()
                                                                                    .toString()
                                                                                    .length ==
                                                                                1
                                                                                    ? "0" +
                                                                                      (currentDate.getMonth() +
                                                                                          1)
                                                                                    : currentDate.getMonth() +
                                                                                      1,
                                                                        }
                                                                    )
                                                                    .then(
                                                                        (
                                                                            res
                                                                        ) => {
                                                                            setTechTalks(
                                                                                res
                                                                                    .data[0]
                                                                            ),
                                                                                setValueTechTalks(
                                                                                    {
                                                                                        id: valueTechTalks.id,
                                                                                        title: valueTechTalks.title,
                                                                                        date: valueTechTalks.date,
                                                                                        time: valueTechTalks.time,
                                                                                        commentary:
                                                                                            valueTechTalks.commentary,
                                                                                        is_over:
                                                                                            true,
                                                                                        user: {
                                                                                            id: valueTechTalks
                                                                                                .user
                                                                                                .id,
                                                                                            name: valueTechTalks
                                                                                                .user
                                                                                                .name,
                                                                                            section:
                                                                                                {
                                                                                                    id: valueTechTalks
                                                                                                        .user
                                                                                                        .section
                                                                                                        .id,
                                                                                                    name: valueTechTalks
                                                                                                        .user
                                                                                                        .section
                                                                                                        .name,
                                                                                                },
                                                                                        },
                                                                                    }
                                                                                );
                                                                        }
                                                                    );
                                                        }}
                                                    >
                                                        Done?
                                                    </button>
                                                </div>
                                            )}
                                    </div>

                                    <div className="mt-2">
                                        <p className="text-white text-base">
                                            Author
                                        </p>
                                        <div className="flex flex-row">
                                            <GithubPicture
                                                className="w-16 h-16 rounded-l-md"
                                                user={
                                                    valueTechTalks.user
                                                        .github_id
                                                }
                                            />
                                            <div className="bg-[#181c24] p-2 rounded-r-md">
                                                <p className="text-white text-base">
                                                    {valueTechTalks.user.name}
                                                </p>
                                                <small className="text-white text-sm">
                                                    {
                                                        valueTechTalks.user
                                                            .section.name
                                                    }
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-white text-base">
                                        {valueTechTalks.commentary}
                                    </p>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
