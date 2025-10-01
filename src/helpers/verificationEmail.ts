import {resend} from "@/lib/resend"
import VerificationEmail from "../../emails/verificationEmail"
import { ApiResponse } from "@/types/ApiResponse"
import { verify } from "crypto";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verficationCode: string,
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Anonymous Message | Verification Code',
            react: VerificationEmail({username, otp: verifyCode}),
        });
        return {success: true, message: "Success to send verification email"}
    } catch (emailerror) {
        console.error("error sending verification email", emailerror);
        return {success: false, message: "Failed to send verification email"}
    }
}