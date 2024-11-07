import { useState } from "react";

function AddExam({ onClick }: { onClick: () => void }) {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [papers, setPapers] = useState([
        { maxMarks: "", questionPaperFile: null, subjectId: "" }
    ]);

    // Handle adding a new paper
    const handleAddPaper = () => {
        setPapers([...papers, { maxMarks: "", questionPaperFile: null, subjectId: "" }]);
    };

    // Handle changes in paper fields
    const handlePaperChange = (index: number, field: string, value: string) => {
        const updatedPapers = [...papers]; // Create a copy of the current papers array
        updatedPapers[index][field] = value; // Update the specific field for the paper
        setPapers(updatedPapers); // Set the updated papers array as the new state
    };

    // Handle file input change
    const handleFileChange = (index: number, file: File | null) => {
        const updatedPapers = [...papers]; // Copy the papers array
        updatedPapers[index].questionPaperFile = file; // Assign the selected file to the specific paper
        setPapers(updatedPapers); // Set the updated papers array as the new state
    };

    // Handle form submission
    const handleSubmit = async () => {
        const formData = new FormData();

        // Append exam details (start and end time)
        formData.append("startTime", startTime);
        formData.append("endTime", endTime);

        // Append papers details
        papers.forEach((paper, index) => {
            formData.append(`papers[${index}][maxMarks]`, paper.maxMarks);
            formData.append(`papers[${index}][subjectId]`, paper.subjectId);
            if (paper.questionPaperFile) {
                formData.append(`papers[${index}][questionPaper]`, paper.questionPaperFile);
            }
        });

        try {
            const response = await fetch("/api/exams", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                // Handle success, maybe show a success message or clear the form
                console.log("Exam added successfully");
            } else {
                // Handle failure
                console.error("Failed to add exam");
            }
        } catch (error) {
            console.error("Error submitting exam:", error);
        }
    };

    return (
        <div className="z-20 fixed top-0 left-0 backdrop-blur w-full h-screen flex flex-col items-center justify-center">
            <div className={"fixed top-2 left-2"} onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                </svg>
            </div>
            <div className={"shadow-2xl p-8 bg-white max-h-screen overflow-scroll"}>
                <div className={"flex items-center justify-center"}>
                    <p className={"text-xl font-semibold"}>Add Exam</p>
                </div>

                {/* Exam start and end time */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">Start Time</label>
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">End Time</label>
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Papers Section */}
                <div className="mt-4">
                    <p className="text-lg font-semibold">Papers</p>
                    {papers.map((paper, index) => (
                        <div key={index} className="border p-4 mt-4">
                            {/* Max Marks */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Max Marks (Paper {index + 1})
                                </label>
                                <input
                                    type="number"
                                    value={paper.maxMarks}
                                    onChange={(e) => handlePaperChange(index, "maxMarks", e.target.value)}
                                    placeholder="Enter Max Marks"
                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Question Paper File (PDF) */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Question Paper (PDF)
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => handleFileChange(index, e.target.files?.[0] ?? null)}
                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Subject ID */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Subject ID (Paper {index + 1})
                                </label>
                                <input
                                    type="text"
                                    value={paper.subjectId}
                                    onChange={(e) => handlePaperChange(index, "subjectId", e.target.value)}
                                    placeholder="Enter Subject ID"
                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={handleAddPaper}
                        className="mt-4 bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-400 transition duration-200"
                    >
                        Add Paper
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-[#133E87] text-white font-semibold py-2 px-4 rounded hover:bg-[#0f2f66] transition duration-200 mt-4"
                >
                    Add Exam
                </button>
            </div>
        </div>
    );
}

export default AddExam;
