import { useState } from "react";

function RemoveSubject({ onClick }: { onClick: () => void }) {
    const [username, setUsername] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username) {
            alert("Username is required!");
            return;
        }

        try {
            const response = await fetch(`/api/removeSubject/${username}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Subject removed successfully.");
            } else {
                alert("Failed to remove subject.");
            }
        } catch (error) {
            console.error("Error removing subject:", error);
            alert("An error occurred.");
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
                    <p className="text-xl font-semibold">Remove Subject</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Username Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Subject code</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter subjectCode"
                            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#133E87] text-white font-semibold py-2 px-4 rounded hover:bg-[#0f2f66] transition duration-200"
                    >
                        Remove Subject
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RemoveSubject;
