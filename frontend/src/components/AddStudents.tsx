import Input from "./Input.tsx";
import {useState} from "react";

function AddStudents({onClick} : {onClick:()=>void}) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="z-20 fixed top-0 left-0 backdrop-blur w-full h-screen flex flex-col items-center justify-center">
            <div className={"fixed top-2 left-2"} onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                </svg>
            </div>
            <div className={"shadow-2xl p-8 bg-white"}>
                <div className={"flex items-center justify-center"}>
                    <p className={"text-xl font-semibold"}>Add Student</p>
                </div>
                <Input label={"name"} placeholder={"Student Name"} onChange={(e) => {
                    setName(e.target.value);
                }}/>
                <Input label={"user-name"} placeholder={"Student user-name"} onChange={(e) => {
                    setUsername(e.target.value);
                }}/>
                <Input label={"password"} placeholder={"password"} onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
                <button
                    className="w-full bg-[#133E87] text-white font-semibold py-2 px-4 rounded hover:bg-[#0f2f66] transition duration-200"

                >
                    Add
                </button>
            </div>
        </div>
    )
}

export default AddStudents;