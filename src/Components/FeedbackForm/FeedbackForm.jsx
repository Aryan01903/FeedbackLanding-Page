import {useState} from "react";

const FeedbackForm=({onSubmit})=>{
    const [formData,setFormData]=useState({
        fullName : "",
        email : "",
        feedback : ""
    });

    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    const [success,setSuccess]=useState(false);
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError("");
        setSuccess(false);
        if(!formData.fullName || !formData.email || !formData.feedback){
            setError("All fields are required. ");
            return;
        }
        console.log("Submitting formData:", formData);
        setLoading(true);
        try{
            const res = await fetch("https://feedbackhub-m5pn.onrender.com/api/submit-feedback", {
                method : "POST",
                headers : {
                    "Content-Type":"application/json"
                },
                body : JSON.stringify(formData)
                
            })
            if(!res.ok){
                throw new Error("API Error");
            }
            setFormData({
                fullName : "",
                email : "",
                feedback : ""
            })
            setSuccess(true);
        }catch(err){
            setError("Something went wrong.")
        }finally{
            setLoading(false);
        }
    }
    return (
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto mt-12 p-8 bg-white/10 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl border border-gray-300 dark:border-gray-700 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
            🚀 Share Your Feedback
          </h2>
    
          <div className="space-y-5">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full p-3 rounded-xl bg-white/70 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.fullName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-3 rounded-xl bg-white/70 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              name="feedback"
              placeholder="Your Feedback"
              rows="4"
              className="w-full p-3 rounded-xl bg-white/70 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.feedback}
              onChange={handleChange}
            />
    
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">Thank you! Feedback submitted.</p>}
    
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:scale-105 transition-transform duration-300 disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      );
}

export default FeedbackForm;
