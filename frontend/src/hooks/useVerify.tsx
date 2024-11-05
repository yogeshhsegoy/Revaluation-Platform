import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";

import {USerType} from "../stores/atoms/UserType.tsx";
enum User{
    student,
    teacher,
    admin,
    unknow
}

interface WhoAmIResponse {
    msg: string;
    type: User;
}


function useVerify(){
    const navigate = useNavigate();
    const UserType : User = useRecoilValue(USerType);
    useEffect(() => {
        const token = localStorage.getItem("easyRevalToken");
        if(token === null){
            return;
        }
        axios.get<WhoAmIResponse>("http://localhost:3000/whoami", {
            headers : {
                Authorization: token
            }
        })
            .then((response:any) => {
                if(response.data.msg === "success"){
                    if(response.data.type !== UserType){
                        localStorage.removeItem("easyRevalToken");
                        navigate("/signin");
                    }
                }
            })
            .catch((error:any) => {
                console.log(error);
                localStorage.removeItem("easyRevalToken");
                navigate("/signin");
            })
    },[])
}

export default useVerify;