import React, { Fragment, useState } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";

type TypeDayValue = {
    day: number;
    month: number;
    year: number;
};

const Calendar = (props) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dayClicked, setDayClicked] = useState<boolean>(false);
    const [dayValue, setDayValue] = useState<TypeDayValue>({
        day: null,
        month: null,
        year: null,
    });
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
        };
        axios.post("/api/techtalks", data).then((res) => {
            console.log(res.data);
        });
    }
    console.log(dayValue);
    return (
        <div>
            <button onClick={prevMonth}>Prev</button>
            <button onClick={nextMonth}>Next</button>
            <h1>
                {monthName} {currentDate.getFullYear()}
            </h1>
            <div className="flex flex-wrap w-4/6">
                {days.map((day) => (
                    <div
                        className="w-24 h-24 border-red-500 border-2 cursor-pointer"
                        key={day}
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
                        {day}
                    </div>
                ))}
            </div>
            <Transition appear show={dayClicked} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={setDayClicked}
                >
                    <div className="min-h-screen px-4 text-center">
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
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Create a tech-talk
                                </Dialog.Title>
                                <div className="mt-2">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="flex flex-col justify-center items-center"
                                    >
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Title"
                                        />
                                        <input
                                            type="text"
                                            name="description"
                                            placeholder="Description"
                                        />
                                        <input
                                            type="date"
                                            name="date"
                                            placeholder="Date"
                                            value={
                                                (dayValue.day &&
                                                    dayValue.month &&
                                                    dayValue.year) == undefined
                                                    ? ""
                                                    : `${dayValue.year}-${
                                                          dayValue.month.toString()
                                                              .length == 1
                                                              ? "0" +
                                                                dayValue.month
                                                              : dayValue.month
                                                      }-${
                                                          dayValue.day.toString()
                                                              .length == 1
                                                              ? "0" +
                                                                dayValue.day
                                                              : dayValue.day
                                                      }`
                                            }
                                        />
                                        <input
                                            type="time"
                                            name="time"
                                            placeholder="Time"
                                        />
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
