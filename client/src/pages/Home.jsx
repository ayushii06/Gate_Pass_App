import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../component/ui/button";
import {
  Camera,
  Brain,
  Users,
  Bot,
  Mail,
  Printer,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import { useSelector } from "react-redux";
import logo from '../assets/logo.png';
import bg_gradient from '../assets/background_gradient.png';
import AnimatedButton from "../component/common/Button";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="min-h-screen flex flex-col bg-background  dark">
      {/* Header */}
      <img src={bg_gradient} alt="hero" className="w-full md:w-[70vw] h-[40vh] md:h-[50vh] absolute top-0 left-0 right-0 z-10 mx-auto" />
      <header className=" top-0 z-50 w-full backdrop-blur-sm  ">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-primary">
              <img src={logo} alt="Logo" className="h-14 w-14 inline-block" />
            </span>
          </div>
          <nav className="hidden md:flex mx-4 items-center gap-8">
            <Link to="/" className="text-white border-b-2 border-primary py-1 font-medium">
              Home
            </Link>
            <Link to="/about" className="text-white border-b-2 border-primary py-1 font-medium">
              About Us
            </Link>

          </nav>
          <div className="flex items-center gap-8">

            {user ? (
              <Link to={user.role === "admin" ? "/admin-dashboard" : "/student-dashboard"}>
                <Button variant="secondary">Dashboard</Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="secondary">
                  Join Now
                </Button>
              </Link>
            )}

          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow pt-20 md:pt-32 pb-16 md:pb-32 overflow-hidden relative">

        <svg aria-hidden="true" className="pointer-events-none inset-0 fill-gray-400/30 stroke-gray-400/30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)] inset-x-0 inset-y-[-30%] skew-y-12 w-[80vw] h-[100vh] absolute top-[0vh] left-0 right-0 z-50 mx-auto"><defs><pattern id=":r2h:" width="40" height="40" patternUnits="userSpaceOnUse" x="-1" y="-1"><path d="M.5 40V.5H40" fill="none" stroke-dasharray="0"></path></pattern></defs><rect width="100%" height="100%" fill="url(#:r2h:)"></rect><svg x="-1" y="-1" className="overflow-visible"><rect width="39" height="39" x="241" y="481" fill="currentColor" stroke-width="0" opacity="0.0920486261980841"></rect><rect width="39" height="39" x="121" y="161" fill="currentColor" stroke-width="0" opacity="0.0898379431833746"></rect><rect width="39" height="39" x="1" y="41" fill="currentColor" stroke-width="0" opacity="0.08569901617884171"></rect><rect width="39" height="39" x="201" y="441" fill="currentColor" stroke-width="0" opacity="0.08478496582538356"></rect><rect width="39" height="39" x="561" y="81" fill="currentColor" stroke-width="0" opacity="0.0819775960786501"></rect><rect width="39" height="39" x="561" y="401" fill="currentColor" stroke-width="0" opacity="0.0790062553511234"></rect><rect width="39" height="39" x="481" y="401" fill="currentColor" stroke-width="0" opacity="0.07582467449537944"></rect><rect width="39" height="39" x="401" y="521" fill="currentColor" stroke-width="0" opacity="0.07250919713696931"></rect><rect width="39" height="39" x="121" y="201" fill="currentColor" stroke-width="0" opacity="0.06901005447434727"></rect><rect width="39" height="39" x="281" y="161" fill="currentColor" stroke-width="0" opacity="0.06534054747025948"></rect><rect width="39" height="39" x="321" y="241" fill="currentColor" stroke-width="0" opacity="0.05259905599814374"></rect><rect width="39" height="39" x="441" y="121" fill="currentColor" stroke-width="0" opacity="0.012538549528107979"></rect><rect width="39" height="39" x="121" y="121" fill="currentColor" stroke-width="0" opacity="0.05362266433949117"></rect><rect width="39" height="39" x="361" y="401" fill="currentColor" stroke-width="0" opacity="0.04945069341629278"></rect><rect width="39" height="39" x="401" y="441" fill="currentColor" stroke-width="0" opacity="0.045209179524681536"></rect><rect width="39" height="39" x="161" y="121" fill="currentColor" stroke-width="0" opacity="0.04078199483046774"></rect><rect width="39" height="39" x="241" y="41" fill="currentColor" stroke-width="0" opacity="0.03620832591841463"></rect><rect width="39" height="39" x="41" y="41" fill="currentColor" stroke-width="0" opacity="0.03153766848554369"></rect><rect width="39" height="39" x="441" y="241" fill="currentColor" stroke-width="0" opacity="0.026765306809102187"></rect><rect width="39" height="39" x="161" y="241" fill="currentColor" stroke-width="0" opacity="0"></rect><rect width="39" height="39" x="481" y="161" fill="currentColor" stroke-width="0" opacity="0.006893120190943592"></rect><rect width="39" height="39" x="281" y="81" fill="currentColor" stroke-width="0" opacity="0"></rect><rect width="39" height="39" x="81" y="41" fill="currentColor" stroke-width="0" opacity="0"></rect><rect width="39" height="39" x="481" y="81" fill="currentColor" stroke-width="0" opacity="0"></rect><rect width="39" height="39" x="41" y="241" fill="currentColor" stroke-width="0" opacity="0"></rect><rect width="39" height="39" x="281" y="521" fill="currentColor" stroke-width="0" opacity="0"></rect><rect width="39" height="39" x="281" y="561" fill="currentColor" stroke-width="0" opacity="0"></rect><rect width="39" height="39" x="321" y="41" fill="currentColor" stroke-width="0" opacity="0"></rect><rect width="39" height="39" x="241" y="281" fill="currentColor" stroke-width="0" opacity="0"></rect><rect width="39" height="39" x="201" y="41" fill="currentColor" stroke-width="0" opacity="0"></rect></svg></svg>
        <div className="container mx-auto px-4">

          <div className="max-w-6xl mx-auto text-center mb-24">
            <h1 className="relative mx-auto text-3xl font-bold pb-4 text-white text-center w-[max-content] font-mono before:absolute before:inset-0 before:animate-typewriter before:bg-background">
              SmartGate: Automated Gate Pass System
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Say goodbye to paperwork. Apply for leave, get smart approvals, and receive instant notifications — all from your room.
            </p>
            <AnimatedButton text="Get Started" handleOnClick={() => { navigate('/signup-student') }} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Powerful Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our automated gate pass system offers a comprehensive set of features
              designed to make leave tracking simple, secure, and efficient.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Camera className="h-10 text-blue-400 w-10 text-primary" />}
              title="Instant Leave Application"
              description="Apply for gate pass leave directly from your room — no paperwork, no lines. Just a few clicks and you're done!"
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary text-orange-400" />}
              title="HOD Assistant Agent"
              description="An intelligent virtual assistant helps HODs review, prioritize, and manage leave requests with summaries and smart suggestions."
            />
            <FeatureCard
              icon={<Mail className="h-10 text-violet-500 w-10 text-primary" />}
              title="Real-Time Notifications"
              description="Stay in the loop with instant email and SMS alerts about leave status, approvals, and reminders to print your gate pass."
            />
            <FeatureCard
              icon={<Printer className="h-10 w-10 text-primary text-green-400" />}
              title="Gate Pass QR Code"
              description="Once approved, download your QR-generated gate pass — ready to be shown at the hostel gate."
            />
            <FeatureCard
              icon={<Bot className="h-10 w-10 text-primary text-yellow-500" />}
              title="Student Chatbot Support"
              description="Our 24/7 chatbot guides you through applying, tracking, and getting leave status in simple, natural language."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-10 w-10 text-primary text-red-600" />}
              title="Secure & Transparent"
              description="Your data is encrypted and every approval is traceable for complete transparency and peace of mind."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Get Started?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Join thousands of institutions that have already transformed their gate pass management with our product.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup">
            <AnimatedButton text="Sign Up Now" handleOnClick={() => { navigate('/signup-student') }} />              
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="text-2xl font-bold text-primary">SOCIALS</span>
            </div>
            <div className="flex gap-8">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link to="/courses" className="text-gray-400 hover:text-white transition-colors">Courses</Link>
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
              <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Sign In</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-500">
              © {new Date().getFullYear()} FaceAttend. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper Components
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-black/40 border border-gray-800 rounded-lg p-6 transition-all duration-300 hover:border-primary/30">
      <div className="mb-4 p-3 rounded-full inline-block bg-black/60">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default LandingPage;