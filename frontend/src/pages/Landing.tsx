import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
} from "@clerk/clerk-react";
import { Link, Navigate } from "react-router-dom";
import DarkGradient from "../lib/DarkGradient";
import FeatureSection from "@/components/FeatureSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import Footer from "@/components/Footer";

export default function Landing() {
    return (
        <div className="min-h-screen overflow-hidden bg-gradient-to-br from-brand-lavender/20 via-white to-brand-blue/20 dark:from-primary/10 dark:via-neutral-900 dark:to-brand-blue/10">
            <DarkGradient className="absolute inset-0 w-full h-full" />

            <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-60 text-center">
                <SignedIn>
                    <Navigate to="/dashboard" replace />
                </SignedIn>

                <div className="space-y-6 animate-fadeInUp">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-brand-indigo to-brand-blue animate-gradient bg-300%">
                        ResQ
                    </h1>
                    <p className="mt-6 text-xl md:text-4xl text-neutral-200 max-w-2xl mx-auto leading-relaxed">
                        A compassionate Mental Health Evaluation and Guidance
                        Support System.
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <SignedOut>
                            <SignUpButton mode="modal">
                                <button className="btn-primary w-full sm:w-auto px-8 py-3 text-lg rounded-xl shadow-glow transform transition-transform duration-300 hover:scale-105">
                                    Get Started
                                </button>
                            </SignUpButton>
                            <SignInButton mode="modal">
                                <button className="btn-secondary w-full sm:w-auto px-8 py-3 text-lg rounded-xl transform transition-transform duration-300 hover:scale-105">
                                    Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <Link
                            className="mt-4 sm:mt-0 text-white hover:underline transition-all duration-300"
                            to="/appointment">
                            Need help now?
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-70">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 5V19M12 19L5 12M12 19L19 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
            <FeatureSection />
            <WhyChooseUsSection />
            <Footer />
        </div>
    );
}
