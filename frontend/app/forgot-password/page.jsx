"use client";

import { useState } from "react";
import PasswordRecovery from "../pages/PasswordRecovery";

export default function ForgotPasswordPage() {
  return <PasswordRecovery mode="forgot" />;
}
// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setMessage("");
//     setError("");
//     setLoading(true);

//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/auth/forgot-password",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Something went wrong");
//       }

//       setMessage(data.message);
//       setEmail("");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white px-4">
//       <div className="w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center mb-2">
//           Forgot Password?
//         </h1>

//         <p className="text-center text-gray-500 mb-8">
//           Enter your email to reset your password.
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full border rounded-lg px-4 py-3 outline-none"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-black text-white rounded-lg py-3"
//           >
//             {loading ? "Sending..." : "Reset Password"}
//           </button>
//         </form>

//         {message && (
//           <p className="mt-5 text-center text-green-600">
//             {message}
//           </p>
//         )}

//         {error && (
//           <p className="mt-5 text-center text-red-600">
//             {error}
//           </p>
//         )}

//         <div className="text-center mt-6">
//           <a href="/login" className="text-blue-600 hover:underline">
//             Back to Login
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }