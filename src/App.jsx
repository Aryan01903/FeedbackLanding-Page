import { useState } from "react";
import FeedbackForm from "./Components/FeedbackForm/FeedbackForm";
import AdminView from "./Components/AdminView/AdminView";
import DarkModeToggle from "./Components/DarkToggle/darkToggle";
function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white py-10 px-4">
        <header className="flex justify-end p-4">
            <DarkModeToggle />
      </header>
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowAdmin(!showAdmin)}
          className="px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          {showAdmin ? "Back to Feedback Form" : "View Submitted Feedback"}
        </button>
      </div>
      {showAdmin ? <AdminView /> : <FeedbackForm />}
    </div>
  );
}

export default App;
