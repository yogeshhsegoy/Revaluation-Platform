import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {USerType} from "../stores/atoms/UserType.tsx";
import {useSetRecoilState} from "recoil";

enum User{
    student,
    teacher,
    admin
}

interface WhoAmIResponse {
    msg: string;
    type: User;
}


function useRedirect(){
    const navigate = useNavigate();
    const setUserType = useSetRecoilState(USerType);
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
                    if(response.data.type == User.admin){
                        setUserType(User.admin)
                        navigate("/admin");
                    }
                    else if(response.data.type == User.teacher){
                        setUserType(User.teacher)
                        navigate("/teacher");
                    }
                    else if(response.data.type == User.student){
                        setUserType(User.student)
                        navigate("/student");
                    }
                }
            })
            .catch((error:any) => {
                console.log(error);
            })
    },[])
}

export default useRedirect;