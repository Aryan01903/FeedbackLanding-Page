import { useEffect, useState } from "react";

const AdminView = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://feedbackhub-m5pn.onrender.com/api/admin/feedbacks");
        const data = await res.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        📋 Submitted Feedbacks
      </h2>
      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {feedbacks.map((fb, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-indigo-600">{fb.fullName}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{fb.email}</p>
              <p className="mt-2 text-gray-800 dark:text-white">{fb.feedback}</p>
              <p className="mt-2 text-xs text-gray-400">
                {new Date(fb.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminView;
