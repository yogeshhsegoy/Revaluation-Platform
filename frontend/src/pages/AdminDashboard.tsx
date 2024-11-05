import useVerify from "../hooks/useVerify.tsx";
import UserNavbar from "../components/UserNavbar.tsx";
import Block from "../components/Block.tsx";
import Footer from "../components/Footer";

import books from "../assets/books-book-svgrepo-com.svg"
import student from "../assets/student-svgrepo-com.svg"
import teacher from "../assets/teacher-svgrepo-com.svg"
import admin from "../assets/hacker-svgrepo-com.svg"
import exam from "../assets/exam-result-svgrepo-com.svg"
import question from "../assets/questions-help-svgrepo-com.svg"
import answer from "../assets/clipboard-document-result-svgrepo-com.svg"



function AdminDashboard(){
    const done:boolean = useVerify(2)
    return (
        done ? (
            <div>
                <UserNavbar />
                <div className={"py-4 flex items-center justify-center"}>
                    <p className={"text-2xl font-semibold"}>Administration Dashboard</p>
                </div>
                <div className={"grid grid-cols-12 gap-4 px-4 py-8"}>
                    <div className={"col-span-12 md:col-span-4 lg:col-span-3"}>
                        <Block title={"Add Admins"} route={"/admin/add-user"} svg={<div>
                            <img src={admin} alt={"Admins"}/>
                        </div>}
                               description={"Add admins from your organization"}/>
                    </div>
                    <div className={"col-span-12 md:col-span-4 lg:col-span-3"}>
                        <Block title={"Add Students"} route={"/admin/add-user"} svg={<div>
                            <img src={student} alt={"Students"}/>
                        </div>}
                               description={"Add students from your organization"}/>
                    </div>
                    <div className={"col-span-12 md:col-span-4 lg:col-span-3"}>
                        <Block title={"Add Teachers"} route={"/admin/add-user"} svg={<div>
                            <img src={teacher} alt={"Teachers"}/>
                        </div>}
                               description={"Add teachers from your organization"}/>
                    </div>
                    <div className={"col-span-12 md:col-span-4 lg:col-span-3"}>
                        <Block title={"Add Subjects"} route={"/admin/add-user"} svg={<div>
                            <img src={books} alt={"Subjects"}/>
                        </div>}
                               description={"Add your organization's subjects"}/>
                    </div>
                    <div className={"col-span-12 md:col-span-4 lg:col-span-3"}>
                        <Block title={"Add Exams"} route={"/admin/add-user"} svg={<div>
                            <img src={exam} alt={"Exams"}/>
                        </div>}
                               description={"Add your organization's Exams"}/>
                    </div>
                    <div className={"col-span-12 md:col-span-4 lg:col-span-3"}>
                        <Block title={"Add Question Paper"} route={"/admin/add-user"} svg={<div>
                            <img src={question} alt={"Question Paper"}/>
                        </div>}
                               description={"Add your organization's Question Paper"}/>
                    </div>
                    <div className={"col-span-12 md:col-span-4 lg:col-span-3"}>
                        <Block title={"Add Answer sheets"} route={"/admin/add-user"} svg={<div>
                            <img src={answer} alt={"Answer sheets"}/>
                        </div>}
                               description={"Add your organization's Answer sheets"}/>
                    </div>
                    <div className={"col-span-12 md:col-span-4 lg:col-span-3"}>
                        <Block title={"Remove Subjects"} route={"/admin/add-user"} svg={<div>
                            <img src={books} alt={"Subjects"}/>
                        </div>}
                               description={"Remove your organization's subjects"}/>
                    </div>


                    <div className={"col-span-12 md:col-span-4 lg:col-span-3"}>
                        <Block title={"Remove Admins"} route={"/admin/add-user"} svg={<div>
                            <img src={admin} alt={"Admins"}/>
                        </div>}
                               description={"Remove admins"}/>
                    </div>
                    <div className={"col-span-12 md:col-span-4 lg:col-span-3"}>
                        <Block title={"Remove Students"} route={"/admin/add-user"} svg={<div>
                            <img src={student} alt={"Students"}/>
                        </div>}
                               description={"Remove students"}/>
                    </div>
                    <div className={"col-span-12 md:col-span-4 lg:col-span-3"}>
                        <Block title={"Remove Teachers"} route={"/admin/add-user"} svg={<div>
                            <img src={teacher} alt={"Teachers"}/>
                        </div>}
                               description={"Remove teachers"}/>
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

export default AdminDashboard;