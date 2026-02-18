// "use client";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import AuthForm from "../components/auth/AuthForm";
import { FooterDetails } from "../components/auth/AuthForm";
import { AuthLayout, AuthLeft, AuthRight } from "../components/auth/AuthLayout";
import SocialAuth from "../components/auth/SocialAuth";

export default function Register() {
  return (
    <AuthLayout>
      {/* LEFT SIDE */}
      <AuthLeft>
        <AuthForm
          title="Start Your DSA Journey 🚀"
          subtitle="Join thousands of students mastering algorithms today."
          buttonText="Create Free Account"
          fields={[
          { name: "name", label: "Full Name", placeholder: "Enter your full name", icon: UserIcon },
          { name: "email", label: "Email Address", type: "email", placeholder: "student@university.edu", icon: EnvelopeIcon },
          { name: "password", label: "Password", type: "password", placeholder: "Create password", rightIcon: EyeSlashIcon, halfWidth: true },
          { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Confirm password", leftIcon:LockClosedIcon, halfWidth: true },
          ]}
        />
        {/* SOCIAL AUTH */}
        <SocialAuth />
        <FooterDetails footerText="Already a member?" footerAction="Log in" />
      </AuthLeft>

      {/* RIGHT SIDE */}
      <AuthRight>
        {/* CODE BLOCK */}
        <div className="relative rotate-[3deg]">
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
              <span className="text-[#FFEA00]">function</span>{" "}
              <span className="text-blue-400">MasterDSA</span>() {"{"}
            </p>

            <p className="pl-4 text-gray-300">
              <span className="text-[#FFEA00]">const</span> skills ={" "}
              <span className="text-green-300">
                ['Arrays', 'Trees', 'Graphs']
              </span>
              ;
              <br />
              return{" "}
              <span className="text-[#FFEA00]">"Dream Job Unlocked."</span>;
            </p>

            <p>{"}"}</p>
          </div>
        </div>

        {/* TEXT */}
        <div className="pl-16">
          <p className="text-2xl font-bold pb-2">Level Up Your Coding Skills</p>
          <p className="text-gray-400 pr-10">
            Master Data Structures and Algorithms with our interactive
            visualizer and community-driven challenges.
          </p>
        </div>

        {/* FOOTER */}
        <div>
          <div className="flex -space-x-2 pl-42">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full bg-gray-400 border-2 border-[#0E1324]"
              />
            ))}
          </div>
          <p className="text-gray-300 text-sm pl-26">
            Joined by various developers this week
          </p>
        </div>
      </AuthRight>
    </AuthLayout>
  );
}
