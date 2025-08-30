import React from "react";
import {
    ShieldCheck,
    Rocket,
    Users,
    CheckCircle,
    ArrowRight,
} from "lucide-react";
import { SignUpButton, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const whyChooseUs = [
    {
        icon: <ShieldCheck className="w-10 h-10 text-blue-500" />,
        title: "Confidential & Secure",
        desc: "Your privacy is our top priority. All your data and conversations are encrypted and kept strictly confidential.",
    },
    {
        icon: <Rocket className="w-10 h-10 text-purple-500" />,
        title: "Personalized Wellbeing Tools",
        desc: "Access AI-powered mood tracking, guided exercises, and resources tailored to your unique mental health journey.",
    },
    {
        icon: <Users className="w-10 h-10 text-emerald-500" />,
        title: "Supportive Community",
        desc: "Connect with a caring community, share experiences, and find encouragement from people who understand.",
    },
    {
        icon: <CheckCircle className="w-10 h-10 text-white" />,
        title: "About ResQ",
        desc: "ResQ empowers you with easy-to-use tools, expert guidance, and a safe space to support your mental wellness every day.",
    },
];

export default function WhyChooseUsSection() {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();

    return (
        <section className="relative w-full bg-light-bg dark:bg-dark-bg py-20 px-4 flex justify-center z-10">
            <div className="max-w-6xl w-full">
                <div className="mb-8">
                    <span className="uppercase text-xs tracking-widest text-light-primary-text dark:text-dark-primary-text font-semibold bg-light-surface dark:bg-dark-surface px-3 py-1 rounded-full">
                        Why Choose Us
                    </span>
                    <h2 className="mt-4 text-2xl md:text-3xl font-bold text-light-primary-text dark:text-dark-primary-text">
                        Why{" "}
                        <span className="text-light-secondary dark:text-dark-secondary">
                            Mockraft
                        </span>{" "}
                        is the Right Choice for You
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Left 2 cards */}
                    <div className="flex flex-col gap-4 md:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {whyChooseUs.slice(0, 2).map((item) => (
                                <div
                                    key={item.title}
                                    className="bg-light-surface dark:bg-dark-surface rounded-xl p-6 flex flex-col gap-3 shadow-sm transition-all">
                                    <div>{item.icon}</div>
                                    <h3 className="font-semibold text-lg text-light-primary-text dark:text-dark-primary-text">
                                        {item.title}
                                    </h3>
                                    <p className="text-light-secondary-text dark:text-dark-secondary-text text-sm">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                        {/* Bottom left card */}
                        <div className="bg-light-surface dark:bg-dark-surface rounded-xl p-6 flex flex-col gap-3 shadow-sm transition-all">
                            <div>{whyChooseUs[2].icon}</div>
                            <h3 className="font-semibold text-lg text-light-primary-text dark:text-dark-primary-text">
                                {whyChooseUs[2].title}
                            </h3>
                            <p className="text-light-secondary-text dark:text-dark-secondary-text text-sm">
                                {whyChooseUs[2].desc}
                            </p>
                        </div>
                    </div>
                    {/* Highlighted right card */}
                    <div className="bg-gradient-to-br from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary rounded-xl p-6 flex flex-col gap-4 shadow-md dark:text-dark-primary-text justify-between transition-all">
                        <div>{whyChooseUs[3].icon}</div>
                        <div>
                            <h3 className="font-semibold text-2xl text-white">
                                {whyChooseUs[3].title}
                            </h3>
                            <p className=" text-sm mt-3 text-white">
                                {whyChooseUs[3].desc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
