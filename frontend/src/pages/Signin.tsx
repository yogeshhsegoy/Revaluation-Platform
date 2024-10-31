import Input from "../components/Input";
import {useState} from "react";

function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("student");
    return (
    <div className={"w-full h-screen flex justify-center items-center"}>
        <div className={"shadow-2xl p-8"}>
            <div className={"flex justify-center"}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="250" height="70">
                    <circle cx="50" cy="50" r="40" fill="#1E90FF"/>
                    <text x="50" y="65"
                          fontFamily="Arial, sans-serif"
                          fontSize="40"
                          fill="white"
                          textAnchor="middle"
                          fontWeight="bold">ER
                    </text>

                    <text x="120" y="60"
                          fontFamily="Arial, sans-serif"
                          fontSize="36"
                          fill="#1E90FF"
                          fontWeight="bold">easyReval
                    </text>
                </svg>
            </div>
            <h1 className={"text-2xl"}>Sign in to your account</h1>
            <Input label={"Username"} placeholder={"yogesh"} onChange={
                (e) => {
                    setUsername(e.target.value);
                }
            }></Input>
            <Input label={"password"} placeholder={"*******"} onChange={
                (e) => {
                    setPassword(e.target.value);
                }
            }></Input>
            <p>Choose the type of Login</p>
            <div className={"flex items-center justify-around py-2"}>
                <input type={"radio"} id={"admin"} value={"admin"} checked={type === "admin"} onChange={() => {
                    setType("admin");
                }}/>
                <label htmlFor={"admin"} className={"px-2"}>Admin</label>

                <input type={"radio"} id={"teacher"} value={"teacher"} checked={type === "teacher"} onChange={() => {
                    setType("teacher");
                }}/>
                <label htmlFor={"teacher"} className={"px-2"}>Teacher</label>

                <input type={"radio"} id={"student"} value={"student"} checked={type === "student"} onChange={() => {
                    setType("student");
                }}/>
                <label htmlFor={"student"} className={"px-2"}>Student</label>
            </div>
            <button
                className="w-full bg-[#133E87] text-white font-semibold py-2 px-4 rounded hover:bg-[#0f2f66] transition duration-200">
                Sign in
            </button>
        </div>
    </div>
    )
}

export default Signin;