import React, { useState, useEffect, Fragment } from "react";
import { Auth } from "@/Types/Auth";
import axios from "axios";
import GithubPicture from "./GithubPicture";
import { Transition, Dialog } from "@headlessui/react";
type Props = {
    auth: Auth;
    users: Object[];
    sections: {
        id: number;
        name: string;
    }[];
};

type User = {
    id: number;
    first_name: string;
    last_name: string;
    is_coach: boolean;
    github_id: number;
    personal_information_id: number;
    section_id: number;
    section: {
        id: number;
        name: string;
    };
    personal_information: {
        id: number;
        NISS: string;
        phone_number: string;
        birth_date: string;
        email_alias: string;
        github: string;
        github_link: string;
        linkedin: string;
    };
};

export default function GetUsers(props: Props) {
    const [users, setUsers] = useState(props.users);
    const [search, setSearch] = useState<string>("");
    const [valueUser, setValueUser] = useState<User>({} as User);
    console.log(valueUser);
    const [clickedUser, setClickedUser] = useState<boolean>(false);
    const [clickedInformations, setClickedInformations] =
        useState<boolean>(false);
    useEffect(() => {
        setTimeout(() => {
            axios
                .get("/api/users", {
                    params: {
                        search: search,
                    },
                })
                .then((res) => {
                    setUsers(res.data.users);
                });
        }, 1000);
    }, [search]);

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            user_id: valueUser.id,
            niss: e.target.NISS.value,
            phone: e.target.phone.value,
            birthday: e.target.birthday.value,
            email_alias: e.target.email_alias.value,
            github: e.target.github.value,
            github_link: e.target.github_link.value,
            linkedin: e.target.linkedin.value,
            section: e.target.section.value,
        };
        axios
            .post("/api/infos", data)
            .then((res) => {
                console.log(res.data);
                setUsers(
                    users.map((user: User) => {
                        if (user.id === valueUser.id) {
                            user = res.data.user;
                        }
                        return user;
                    })
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function handleSubmitPut(e) {
        e.preventDefault();
        const data = {
            user_id: valueUser.id,
            NISS: e.target.NISS.value,
            phone: e.target.phone.value,
            birthday: e.target.birthday.value,
            email_alias: e.target.email_alias.value,
            github: e.target.github.value,
            github_link: e.target.github_link.value,
            linkedin: e.target.linkedin.value,
            section: e.target.section.value,
        };
        axios.put("/api/infos", data).then((res) => {
            console.log(res);
        });
    }
    return (
        <div className="max-w-7xl mx-auto my-4">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-3xl font-semibold text-white">Who's who</h1>
                <form
                    onChange={(e: any) => {
                        e.preventDefault();
                        setSearch(e.target.value);
                    }}
                >
                    <input
                        className="rounded-lg bg-[#373f50] text-white"
                        type="text"
                        name="search"
                    />
                </form>
            </div>
            {users && (
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
                                Type
                            </th>
                            <th className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                Section
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: User) => {
                            return (
                                <tr
                                    className="text-left hover:bg-[#202c34] cursor-pointer"
                                    onClick={() => {
                                        setValueUser(user),
                                            setClickedUser(true);
                                    }}
                                >
                                    <td className=" bg-[#373f50] border-[#202c34] border-2">
                                        <GithubPicture
                                            className="h-16 w-16"
                                            user={user.github_id}
                                        />
                                    </td>
                                    <td className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                        {user.first_name}
                                    </td>
                                    <td className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                        {user.last_name}
                                    </td>
                                    <td className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                        {user.is_coach ? "Coach" : "Junior"}
                                    </td>
                                    <td className="p-2 bg-[#373f50] border-[#202c34] border-2">
                                        {user.section && user.section.name
                                            ? user.section.name
                                            : "No section"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            <Transition appear show={clickedUser} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => {
                        setClickedUser(false);
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
                                    Who is {valueUser.first_name} ?
                                </Dialog.Title>
                                <hr className="my-2" />
                                <div className="flex flex-col justify-center gap-4">
                                    <div className="flex flex-row justify-between">
                                        {(props.auth.user.is_admin ||
                                            props.auth.user.is_coach) ==
                                            true && (
                                            <>
                                                <p className="text-white">
                                                    Status :{" "}
                                                </p>
                                                {valueUser.personal_information_id !=
                                                null ? (
                                                    <button
                                                        className="px-2 ml-2 text-white bg-blue-500 rounded-lg"
                                                        onClick={() => {
                                                            setClickedUser(
                                                                false
                                                            ),
                                                                setTimeout(
                                                                    () => {
                                                                        setClickedInformations(
                                                                            true
                                                                        );
                                                                    },
                                                                    500
                                                                );
                                                        }}
                                                    >
                                                        View personals
                                                        informations
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="px-2 ml-2 text-white bg-red-500 rounded-lg"
                                                        onClick={() => {
                                                            setClickedUser(
                                                                false
                                                            ),
                                                                setTimeout(
                                                                    () => {
                                                                        setClickedInformations(
                                                                            true
                                                                        );
                                                                    },
                                                                    200
                                                                );
                                                        }}
                                                    >
                                                        Missing personals
                                                        informations
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <div className="flex flex-row justify-start">
                                        <p className="text-white">
                                            Name :
                                            {" " +
                                                valueUser.first_name +
                                                " " +
                                                valueUser.last_name}
                                        </p>
                                    </div>
                                    <div className="flex flex-row gap-4">
                                        <p className="text-white">Github : </p>
                                        <a
                                            className="text-green-300"
                                            href={
                                                valueUser.personal_information &&
                                                valueUser.personal_information
                                                    .github_link
                                            }
                                        >
                                            {valueUser.personal_information &&
                                                valueUser.personal_information
                                                    .github}
                                        </a>
                                    </div>
                                    <div className="flex flex-row gap-4">
                                        <p className="text-white">
                                            Linkedin :{" "}
                                        </p>
                                        <a
                                            className="text-green-300"
                                            href={
                                                valueUser.personal_information &&
                                                valueUser.personal_information
                                                    .linkedin
                                            }
                                        >
                                            {valueUser.personal_information &&
                                                valueUser.personal_information
                                                    .linkedin}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
            <Transition appear show={clickedInformations} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => {
                        setClickedInformations(false);
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
                                    Personal informations of{" "}
                                    {valueUser.first_name} {valueUser.last_name}
                                </Dialog.Title>
                                <hr className="my-2" />
                                <div className="flex flex-col justify-center gap-4">
                                    <div className="flex flex-row justify-center">
                                        {valueUser.personal_information_id !=
                                        null ? (
                                            <form
                                                className="flex flex-col justify-center items-center gap-4"
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="w-full">
                                                    <label
                                                        className="text-white text-sm"
                                                        htmlFor="NISS"
                                                    >
                                                        NISS
                                                    </label>
                                                    <input
                                                        className="w-full bg-gray-900 text-[#979ea3]"
                                                        type="text"
                                                        name="NISS"
                                                        placeholder="NISS"
                                                        autoComplete="off"
                                                        value={
                                                            valueUser
                                                                .personal_information
                                                                .NISS
                                                        }
                                                        onChange={(e) => {
                                                            setValueUser({
                                                                ...valueUser,
                                                                personal_information:
                                                                    {
                                                                        ...valueUser.personal_information,
                                                                        NISS: e
                                                                            .target
                                                                            .value,
                                                                    },
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="w-full">
                                                    <label
                                                        className="text-white text-sm"
                                                        htmlFor="phone"
                                                    >
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        className="w-full bg-gray-900 text-[#979ea3]"
                                                        type="text"
                                                        name="phone"
                                                        placeholder="Phone Number"
                                                        autoComplete="off"
                                                        value={
                                                            valueUser
                                                                .personal_information
                                                                .phone_number
                                                        }
                                                        onChange={(e) => {
                                                            setValueUser({
                                                                ...valueUser,
                                                                personal_information:
                                                                    {
                                                                        ...valueUser.personal_information,
                                                                        phone_number:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    },
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="w-full">
                                                    <label
                                                        className="text-white text-sm"
                                                        htmlFor="birthday"
                                                    >
                                                        Birthday Date
                                                    </label>
                                                    <input
                                                        className="w-full bg-gray-900 text-[#979ea3]"
                                                        type="date"
                                                        name="birthday"
                                                        autoComplete="off"
                                                        placeholder="Birthday Date"
                                                        value={
                                                            valueUser
                                                                .personal_information
                                                                .birth_date
                                                        }
                                                        onChange={(e) => {
                                                            setValueUser({
                                                                ...valueUser,
                                                                personal_information:
                                                                    {
                                                                        ...valueUser.personal_information,
                                                                        birth_date:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    },
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="w-full">
                                                    <label
                                                        className="text-white text-sm"
                                                        htmlFor="email_alias"
                                                    >
                                                        Email Alias
                                                    </label>
                                                    <input
                                                        className="w-full bg-gray-900 text-[#979ea3]"
                                                        type="email"
                                                        name="email_alias"
                                                        autoComplete="off"
                                                        placeholder="Email Alias"
                                                        value={
                                                            valueUser
                                                                .personal_information
                                                                .email_alias
                                                        }
                                                        onChange={(e) => {
                                                            setValueUser({
                                                                ...valueUser,
                                                                personal_information:
                                                                    {
                                                                        ...valueUser.personal_information,
                                                                        email_alias:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    },
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="w-full flex flex-row gap-2">
                                                    <div className="w-full">
                                                        <label
                                                            className="text-white text-sm"
                                                            htmlFor="Github"
                                                        >
                                                            Github
                                                        </label>
                                                        <input
                                                            className="w-full bg-gray-900 text-[#979ea3]"
                                                            type="text"
                                                            name="github"
                                                            autoComplete="off"
                                                            placeholder="Github"
                                                            value={
                                                                valueUser
                                                                    .personal_information
                                                                    .github
                                                            }
                                                            onChange={(e) => {
                                                                setValueUser({
                                                                    ...valueUser,
                                                                    personal_information:
                                                                        {
                                                                            ...valueUser.personal_information,
                                                                            github: e
                                                                                .target
                                                                                .value,
                                                                        },
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="w-full">
                                                        <label
                                                            className="text-white text-sm"
                                                            htmlFor="github_link"
                                                        >
                                                            Github Link
                                                        </label>
                                                        <input
                                                            className="w-full bg-gray-900 text-[#979ea3]"
                                                            type="text"
                                                            name="github_link"
                                                            autoComplete="off"
                                                            placeholder="Github_link"
                                                            value={
                                                                valueUser
                                                                    .personal_information
                                                                    .github_link
                                                            }
                                                            onChange={(e) => {
                                                                setValueUser({
                                                                    ...valueUser,
                                                                    personal_information:
                                                                        {
                                                                            ...valueUser.personal_information,
                                                                            github_link:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        },
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <label
                                                        className="text-white text-sm"
                                                        htmlFor="linkedin"
                                                    >
                                                        Linkedin Link
                                                    </label>
                                                    <input
                                                        className="w-full bg-gray-900 text-[#979ea3]"
                                                        type="text"
                                                        name="linkedin"
                                                        autoComplete="off"
                                                        placeholder="Linkedin"
                                                        value={
                                                            valueUser
                                                                .personal_information
                                                                .linkedin
                                                        }
                                                        onChange={(e) => {
                                                            setValueUser({
                                                                ...valueUser,
                                                                personal_information:
                                                                    {
                                                                        ...valueUser.personal_information,
                                                                        linkedin:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    },
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="w-full">
                                                    <label
                                                        className="text-white text-sm"
                                                        htmlFor="section"
                                                    >
                                                        Section
                                                    </label>
                                                    <select
                                                        className="bg-gray-900 text-white rounded-lg w-full py-2"
                                                        defaultValue={
                                                            valueUser.section.id
                                                        }
                                                        name="section"
                                                        onChange={(e) => {
                                                            setValueUser({
                                                                ...valueUser,
                                                                section_id:
                                                                    Number(
                                                                        e.target
                                                                            .value
                                                                    ),
                                                            });
                                                        }}
                                                    >
                                                        <option
                                                            value={0}
                                                            disabled
                                                            className="bg-[#1f2937] text-white"
                                                        >
                                                            ----
                                                        </option>
                                                        {props.sections.map(
                                                            (section) => (
                                                                <option
                                                                    key={
                                                                        section.id
                                                                    }
                                                                    value={
                                                                        section.id
                                                                    }
                                                                    className="bg-[#1f2937] text-white"
                                                                >
                                                                    {
                                                                        section.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Submit
                                                </button>
                                            </form>
                                        ) : (
                                            <form
                                                className="flex flex-col justify-center items-center gap-4"
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="w-full">
                                                    <label
                                                        className="text-white text-sm"
                                                        htmlFor="NISS"
                                                    >
                                                        NISS
                                                    </label>
                                                    <input
                                                        className="w-full bg-gray-900 text-[#979ea3]"
                                                        type="text"
                                                        name="NISS"
                                                        placeholder="NISS"
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="w-full">
                                                    <label
                                                        className="text-white text-sm"
                                                        htmlFor="phone"
                                                    >
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        className="w-full bg-gray-900 text-[#979ea3]"
                                                        type="text"
                                                        name="phone"
                                                        placeholder="Phone Number"
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className="w-full">
                                                    <label
                                                        className="text-white text-sm"
                                                        htmlFor="birthday"
                                                    >
                                                        Birthday Date
                                                    </label>
                                                    <input
                                                        className="w-full bg-gray-900 text-[#979ea3]"
                                                        type="date"
                                                        name="birthday"
                                                        autoComplete="off"
                                                        placeholder="Birthday Date"
                                                    />
                                                </div>
                                                <div className="w-full">
                                                    <label
                                                        className="text-white text-sm"
                                                        htmlFor="email_alias"
                                                    >
                                                        Email Alias
                                                    </label>
                                                    <input
                                                        className="w-full bg-gray-900 text-[#979ea3]"
                                                        type="email"
                                                        name="email_alias"
                                                        autoComplete="off"
                                                        placeholder="Email Alias"
                                                    />
                                                </div>
                                                <div className="w-full flex flex-row gap-2">
                                                    <div className="w-full">
                                                        <label
                                                            className="text-white text-sm"
                                                            htmlFor="Github"
                                                        >
                                                            Github
                                                        </label>
                                                        <input
                                                            className="w-full bg-gray-900 text-[#979ea3]"
                                                            type="text"
                                                            name="github"
                                                            autoComplete="off"
                                                            placeholder="Github"
                                                        />
                                                    </div>
                                                    <div className="w-full">
                                                        <label
                                                            className="text-white text-sm"
                                                            htmlFor="github_link"
                                                        >
                                                            Github Link
                                                        </label>
                                                        <input
                                                            className="w-full bg-gray-900 text-[#979ea3]"
                                                            type="text"
                                                            name="github_link"
                                                            autoComplete="off"
                                                            placeholder="Github_link"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <label
                                                        className="text-white text-sm"
                                                        htmlFor="linkedin"
                                                    >
                                                        Linkedin Link
                                                    </label>
                                                    <input
                                                        className="w-full bg-gray-900 text-[#979ea3]"
                                                        type="text"
                                                        name="linkedin"
                                                        autoComplete="off"
                                                        placeholder="Linkedin"
                                                    />
                                                </div>
                                                <div className="w-full">
                                                    <label
                                                        className="text-white text-sm"
                                                        htmlFor="section"
                                                    >
                                                        Section
                                                    </label>
                                                    <select
                                                        className="bg-gray-900 text-white rounded-lg w-full py-2"
                                                        defaultValue={0}
                                                        name="section"
                                                    >
                                                        <option
                                                            value={0}
                                                            disabled
                                                            className="bg-[#1f2937] text-white"
                                                        >
                                                            ----
                                                        </option>
                                                        {props.sections.map(
                                                            (section) => (
                                                                <option
                                                                    key={
                                                                        section.id
                                                                    }
                                                                    value={
                                                                        section.id
                                                                    }
                                                                    className="bg-[#1f2937] text-white"
                                                                >
                                                                    {
                                                                        section.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Submit
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
