import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


enum User{
    student,
    teacher,
    admin
}

interface WhoAmIResponse {
    msg: string;
    type: string;
}


function useRedirect(){
    const navigate = useNavigate();
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
                        navigate("/admin");
                    }
                    else if(response.data.type == User.teacher){
                        navigate("/teacher");
                    }
                    else if(response.data.type == User.student){
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