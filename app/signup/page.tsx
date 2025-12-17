// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useAuth } from "@/contexts/auth-context"
// import { useRouter } from "next/navigation"
// import Link from "next/link"

// export default function SignupPage() {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [error, setError] = useState("")
//   const { signup, loginWithGoogle } = useAuth()
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     if (password !== confirmPassword) {
//       setError("Passwords do not match.")
//       return
//     }

//     if (password.length < 8) {
//       setError("Password must be at least 8 characters.")
//       return
//     }

//     try {
//       await signup(email, password, name)
//       router.push("/")
//     } catch (err) {
//       setError("Signup failed. Please try again.")
//     }
//   }

//   const handleGoogleSignup = async () => {
//     try {
//       await loginWithGoogle()
//       router.push("/")
//     } catch (err) {
//       setError("Google signup failed. Please try again.")
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 flex items-center justify-center px-4">
//       <div className="w-full max-w-md">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-4xl font-bold text-foreground mb-2">AI Career Copilot</h1>
//           <p className="text-muted-foreground">Join the revolution</p>
//         </div>

//         {/* Card */}
//         <div className="glass rounded-2xl p-8 mb-6">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Name */}
//             <div>
//               <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="John Doe"
//                 className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//                 className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-medium text-foreground mb-2">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
//                 required
//               />
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
//                 required
//               />
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
//                 {error}
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors glow"
//             >
//               Create Account
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="relative my-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-border"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-card text-muted-foreground">Or sign up with</span>
//             </div>
//           </div>

//           {/* Google Button */}
//           <button
//             type="button"
//             onClick={handleGoogleSignup}
//             className="w-full py-2 rounded-lg bg-card hover:bg-muted border border-border text-foreground font-medium transition-colors flex items-center justify-center gap-2"
//           >
//             <svg className="w-5 h-5" viewBox="0 0 24 24">
//               <path
//                 fill="currentColor"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               />
//             </svg>
//             Continue with Google
//           </button>
//         </div>

//         {/* Footer */}
//         <p className="text-center text-muted-foreground text-sm">
//           Already have an account?{" "}
//           <Link href="/login" className="text-primary hover:text-primary/80 font-medium">
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }







"use client";

import type React from "react";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      setError("Name and email are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);
      await signup(trimmedEmail, password, trimmedName);
      router.push("/");
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      router.push("/");
    } catch (err) {
      setError("Google signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            AI Career Copilot
          </h1>
          <p className="text-muted-foreground">Join the revolution</p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2 rounded-lg bg-input border border-border"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg bg-input border border-border"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg bg-input border border-border"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg bg-input border border-border"
                required
              />
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors flex justify-center items-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full py-2 rounded-lg bg-card hover:bg-muted border border-border flex justify-center items-center gap-2"
          >
            Continue with Google
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
