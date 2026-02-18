import AuthForm from "../components/auth/AuthForm";
import { EnvelopeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import SocialAuth from "../components/auth/SocialAuth";
import { AuthLayout, AuthLeft, AuthRight } from "../components/auth/AuthLayout";
import { FooterDetails } from "../components/auth/AuthForm";

export default function Login() {
  return (
  <AuthLayout>
      {/* LEFT SIDE */}
      <AuthLeft>
        <AuthForm
          title="Welcome Back! 🚀"
          subtitle="Pick up right where you left your DSA journey"
          buttonText="Login"
          fields={[
            {name: "email",label: "Email Address",type: "email",placeholder: "student@university.edu",icon: EnvelopeIcon},
            {name: "password",label: "Password",type: "password",placeholder: "Enter your password",rightIcon: EyeSlashIcon  ,extra: (
                <span className="pl-2 text-sm text-gray-600 cursor-pointer hover:underline hover:decoration-[#FFEA00]">
                  Forgot Password?
                </span>)},
          ]}
        />
        <SocialAuth />
        <FooterDetails footerText="New here?" footerAction="Create an account" />
      </AuthLeft>

      {/* RIGHT SIDE */}
      <AuthRight>
        <div className="relative rotate-[-3deg]">
          <span className="absolute top-0 right-10 text-[#44403c] text-7xl font-mono font-semibold select-none">
            {"<>"}
          </span>

          <div className="relative z-10 mt-16 bg-[#44403c] rounded-2xl p-8 font-mono text-sm leading-relaxed shadow-lg max-w-md">
            <div className="flex gap-2 pb-3">
              <span className="w-3 h-3 bg-red-400 rounded-full" />
              <span className="w-3 h-3 bg-yellow-400 rounded-full" />
              <span className="w-3 h-3 bg-green-400 rounded-full" />
            </div>

            <p>
              <span className="text-[#FFEA00]">while</span> (
              <span className="text-blue-400">!isSolved</span>) {"{"}
            </p>

            <p className="pl-4 text-gray-300">
              <span className="text-[#FFEA00]">this.think();</span>
              <br />
              <span className="text-[#FFEA00]">this.code();</span>
              <br />
              <span className="text-gray-400">// consistency is key</span>
            </p>

            <p>{"}"}</p>
          </div>
        </div>

        {/* TEXT */}
        <div className="pl-16 space-y-2">
          <p className="text-2xl font-bold">Welcome Back, Coder!</p>
          <p className="text-gray-400">
            Ready to tackle new algorithms? Your Dashboard is updated with today's top challenges tailored just for you.
          </p>
        </div>

        {/* FOOTER AVATARS */}
        <div className="space-y-1">
          <div className="flex -space-x-2 pl-42">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full bg-gray-400 border-2 border-[#0E1324]"
              />
            ))}
          </div>
          <p className="text-gray-300 text-sm pl-26">
            Continue your progress with 2000+ others
          </p>
        </div>
      </AuthRight>
    </AuthLayout>
  );
}

