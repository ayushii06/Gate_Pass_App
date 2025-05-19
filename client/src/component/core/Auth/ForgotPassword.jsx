import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../component/ui/button";
import { Input } from "../../../component/ui/input";
import { toast } from "sonner";
import { Lock, ArrowLeft, Mail } from "lucide-react";
import { getPasswordResetToken } from "../../../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../slice/authSlice";
import { useSelector } from "react-redux";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const navigate = useNavigate();
    const isLoading = useSelector((state) => state.auth.Loading);
    const dispatch = useDispatch();

    console.log("email sent", emailSent);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email address");
            return;
        }


        dispatch(getPasswordResetToken(email, setEmailSent));

        if (setEmailSent) {
            toast.success("Reset email sent. Please check your inbox.");
            //   navigate("/login");
        }
        else {
            toast.error("Failed to send reset instructions. Please try again.");
        }



    };

    return (
        <div className="min-h-screen flex flex-col bg-background grid-background dark">
            {!emailSent ?
             <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-[#222] p-3 rounded-full mb-6">
                            <Lock className="h-6 w-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Forgot password?</h1>
                        <p className="text-gray-400 text-center">No worries, we'll send you reset instructions.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-white font-medium">Email</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="text-white bg-transparent"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full h-12 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                    Sending...
                                </div>
                            ) : (
                                "Reset password"
                            )}
                        </Button>

                        <div className="flex items-center justify-center mt-6">
                            <Link to="/login" className="text-primary hover:underline flex items-center">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to log in
                            </Link>
                        </div>
                    </form>
                </div>
            </div> : <>
            <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-[#222] p-3 rounded-full mb-6">
                            <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Check your email</h1>
                        <p className="text-gray-400 text-center">We have sent a password reset link to {email}.</p>
                    </div>

                       
                       <Link to="https://mail.google.com" target="_blank" rel="noopener noreferrer">
                        <Button type="submit" className="w-full h-12 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground">
                            Go to inbox
                        </Button>
                        </Link>

                        <div className="flex items-center justify-center mt-6 text-white">
                            Didn't receive the email?  
                            <button onClick={()=>{setEmailSent(false)}} className="text-primary hover:underline mx-2">
                            Click to resend
                            </button>
                        </div>

                    <div className="flex items-center justify-center mt-6 text-white">
                        <Link to="/login" className="text-primary hover:underline flex items-center">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to log in
                        </Link>
                        </div>
                </div>
            </div>
            </>
            }

            
        </div>
    );
}