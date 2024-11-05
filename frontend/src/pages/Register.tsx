import {ChangeEvent, useState} from "react";
import Input from "../components/Input";


function Register() {
    const [notifications, setNotifications] = useState("");
    const [view,setView] = useState(false);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [rootAdmin,setRootAdmin] = useState("");
    const [rootPassword, setRootPassword] = useState("");
    return (
        <div className={"w-full h-screen flex flex-col items-center justify-center"}>
            <div>
                {view?notifications+" !!!":""}
            </div>
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
                <h1 className={"text-2xl"}>Register Your Organization</h1>
                <Input label={'Organization Name'} placeholder={'PESU'} onChange={(e) => {
                    setName(e.target.value);
                }}></Input>
                <Input label={'Organization Code'} placeholder={'Unique 4 Characters'} onChange={(e) => {
                    setCode(e.target.value);
                }}></Input>
                <Input label={'Root Admin Username'} placeholder={'Should begin with Organization Code'}
                       onChange={(e) => {
                           setRootAdmin(e.target.value);
                       }}></Input>
                <Input label={'Root Admin Username'} placeholder={'Should begin with Organization Code'}
                       onChange={(e) => {
                           setRootAdmin(e.target.value);
                       }}></Input>
                <button
                    className="w-full bg-[#133E87] text-white font-semibold py-2 px-4 rounded hover:bg-[#0f2f66] transition duration-200"
                >
                    Register
                </button>
                <div className={"text-sm pt-1 text-red-600"}>
                    * Note the code for each organization should be unique
                </div>
            </div>
        </div>
    )
}

export default Register;