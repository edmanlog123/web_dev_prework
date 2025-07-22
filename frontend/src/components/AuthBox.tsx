// src/components/AuthBox.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import '../index.css'

export default function AuthBox() {
  const [tab, setTab] = useState<"login" | "signup">("login");

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <motion.div
      layout
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 2.3 }}
  className="w-[400px] bg-white rounded-2xl shadow-xl p-6 relative"
>
        <div className="flex justify-between mb-6">
          {["login", "signup"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as "login" | "signup")}
              className={`w-1/2 py-2 font-bold rounded-t-lg ${
                tab === t
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {t === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "login" ? (
            <motion.div
              key="login"
              layout
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
            >
              <LoginForm />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              layout
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6}}
            >
              <SignupForm />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
