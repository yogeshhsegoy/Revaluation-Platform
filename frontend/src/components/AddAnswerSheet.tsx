import { useState } from "react";

function AddAnswerSheet({ onClick }: { onClick: () => void }) {
    const [marksScored, setMarksScored] = useState<number | "">("");
    const [answerSheetFile, setAnswerSheetFile] = useState<File | null>(null);
    const [paperId, setPaperId] = useState<number | "">("");
    const [studentId, setStudentId] = useState<number | "">("");

    // Handle file change for answer sheet
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setAnswerSheetFile(file);
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!marksScored || !answerSheetFile || !paperId || !studentId) {
            alert("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("marksScored", marksScored.toString());
        formData.append("answerSheet", answerSheetFile);
        formData.append("paperId", paperId.toString());
        formData.append("studentId", studentId.toString());

        try {
            const response = await fetch("/api/answerSheets", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                // Handle success, maybe show a success message or clear the form
                console.log("Answer Sheet added successfully");
            } else {
                // Handle failure
                console.error("Failed to add answer sheet");
            }
        } catch (error) {
            console.error("Error submitting answer sheet:", error);
        }
    };

    return (
        <div className="z-20 fixed top-0 left-0 backdrop-blur w-full h-screen flex flex-col items-center justify-center">
            <div className="fixed top-2 left-2" onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                </svg>
            </div>
            <div className="shadow-2xl p-8 bg-white">
                <div className="flex items-center justify-center">
                    <p className="text-xl font-semibold">Add Answer Sheet</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Marks Scored */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Marks Scored</label>
                        <input
                            type="number"
                            value={marksScored}
                            onChange={(e) => setMarksScored(Number(e.target.value))}
                            placeholder="Enter Marks Scored"
                            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Answer Sheet File */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Answer Sheet (PDF)</label>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Paper ID */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Paper ID</label>
                        <input
                            type="number"
                            value={paperId}
                            onChange={(e) => setPaperId(Number(e.target.value))}
                            placeholder="Enter Paper ID"
                            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Student ID */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Student ID</label>
                        <input
                            type="number"
                            value={studentId}
                            onChange={(e) => setStudentId(Number(e.target.value))}
                            placeholder="Enter Student ID"
                            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#133E87] text-white font-semibold py-2 px-4 rounded hover:bg-[#0f2f66] transition duration-200"
                    >
                        Add Answer Sheet
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddAnswerSheet;
