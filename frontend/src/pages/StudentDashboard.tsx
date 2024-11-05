import useVerify from "../hooks/useVerify.tsx";
import UserNavbar from "../components/UserNavbar.tsx";
import Block from "../components/Block.tsx";

import answer from "../assets/clipboard-document-result-svgrepo-com.svg"
import exam from "../assets/exam-result-svgrepo-com.svg"
import Footer from "../components/Footer.tsx";
import reval from "../assets/questions-help-svgrepo-com.svg"


function StudentDashboard() {
    const done:boolean = useVerify(0)
    return (
        done ? (
            <div>
                <UserNavbar/>
                <div className={"py-4 flex items-center justify-center"}>
                    <p className={"text-2xl font-semibold"}>Student Dashboard</p>
                </div>
                <div className={"min-h-screen grid grid-cols-12 gap-4 px-4 py-8"}>
                    <div className={"col-span-12 md:col-span-4 lg:col-span-3"}>
                        <Block title={"View Result"} route={"/admin/add-user"} svg={<div>
                            <img src={exam} alt={"Result"}/>
                        </div>}
                               description={"Look at your Previous Scores"}/>
                    </div>
                    <div className={"col-span-12 md:col-span-4 lg:col-span-3"}>
                        <Block title={"View PhotoCopy"} route={"/admin/add-user"} svg={<div>
                            <img src={answer} alt={"Photocopy"}/>
                        </div>}
                               description={"Look at your Answer sheets"}/>
                    </div>
                    <div className={"col-span-12 md:col-span-4 lg:col-span-3"}>
                        <Block title={"Apply Revaluation"} route={"/admin/add-user"} svg={<div>
                            <img src={reval} alt={"Reval"}/>
                        </div>}
                               description={"Apply for selective revaluation"}/>
                    </div>
                </div>
                <Footer/>
            </div>
        ) : (
            <div>
                Loading...
            </div>
        )
    );
}

export default StudentDashboard;