import useVerify from "../hooks/useVerify.tsx";
import UserNavbar from "../components/UserNavbar.tsx";
import Block from "../components/Block.tsx";


import books from "../assets/books-book-svgrepo-com.svg"

import answer from "../assets/clipboard-document-result-svgrepo-com.svg";
import reval from "../assets/questions-help-svgrepo-com.svg";
import Footer from "../components/Footer.tsx";
function TeacherDashboard() {
    const done:boolean = useVerify(1)
    return (
        done ? (
            <div>
                <UserNavbar/>
                <div className={"py-4 flex items-center justify-center"}>
                    <p className={"text-2xl font-semibold"}>Teacher Dashboard</p>
                </div>
                <div className={"min-h-screen grid grid-cols-12 gap-4 px-4 py-8"}>
                    <div className={"col-span-12 md:col-span-4 lg:col-span-3"}>
                        <Block title={"Add Subjects"} route={"/admin/add-user"} svg={<div>
                            <img src={books} alt={"Subjects"}/>
                        </div>}
                               description={"Add subjects that you teach"}/>
                    </div>
                    <div className={"col-span-12 md:col-span-4 lg:col-span-3"}>
                        <Block title={"Remove Subjects"} route={"/admin/add-user"} svg={<div>
                            <img src={answer} alt={"Photocopy"}/>
                        </div>}
                               description={"Remove subjects taught "}/>
                    </div>
                    <div className={"col-span-12 md:col-span-4 lg:col-span-3"}>
                        <Block title={"Correct Reval Papers"} route={"/admin/add-user"} svg={<div>
                            <img src={reval} alt={"Reval"}/>
                        </div>}
                               description={"Correct papers within your speciality"}/>
                    </div>
                </div>
                <Footer />
            </div>
        ) : (
            <div>
                Loading...
            </div>
        )
    );
}

export default TeacherDashboard;