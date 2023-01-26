import React, { Fragment, useState } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";

type TypeDayValue = {
    day: number;
    month: number;
    year: number;
};

const Calendar = (props) => {
    console.log(props);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dayClicked, setDayClicked] = useState<boolean>(false);
    const [dayValue, setDayValue] = useState<TypeDayValue>({
        day: null,
        month: null,
        year: null,
    });
    const [hour, setHour] = useState<string>("13:30");
    const nextMonth = () => {
        setCurrentDate(
            new Date(currentDate.setMonth(currentDate.getMonth() + 1))
        );
    };
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
            description: e.target.description.value,
            date: e.target.date.value,
            time: e.target.time.value,
            commentary: e.target.commentary.value,
        };
        axios.post("/api/techtalks", data).then((res) => {
            console.log(res.data);
        });
        setDayClicked(false);
    }
    // keep only monday to friday
    const daysOfWeek = days.filter((day) => {
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );
        return date.getDay() !== 0 && date.getDay() !== 6;
    });

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
                            " w-full h-32 border-2 cursor-pointer rounded-lg mx-auto bg-[#1f2937]"
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
                                day === new Date().getDate() &&
                                currentDate.getMonth() ===
                                    new Date().getMonth() &&
                                currentDate.getFullYear() ===
                                    new Date().getFullYear()
                                    ? "border-[#66a2e2] border-1 w-4/5 mx-auto"
                                    : "border-[#dee2e6] border-1 w-4/5 mx-auto"
                            }
                        />
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

                                        <div className="w-full">
                                            <label
                                                className="text-white text-sm"
                                                htmlFor="description"
                                            >
                                                Description
                                            </label>
                                            <input
                                                className="w-full dark:bg-gray-900 text-[#979ea3]"
                                                type="text"
                                                name="description"
                                                placeholder="Description"
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
        </div>
    );
};

export default Calendar;
