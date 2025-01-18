import { resendConfig } from "./resendConfig.js"
import { verificationTokenEmailTemplate, Welcome_EMAIL_TEMPLATE } from "./emailTemplate.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const { data, error } = await resendConfig.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [email],
            subject: "Please verify your email address now",
            html: verificationTokenEmailTemplate.replace("{verificationToken}", verificationToken),
        });
    } catch (error) {
        console.log("There was an error sending verification email", error);
        throw new Error("Error Sending verification email");
    }
};


export const sendWelcomeEmail = async (email, name) => {
    try {
        const { data, error } = await resendConfig.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [email],
            subject: "Welcome to CoachFinder",
            html: Welcome_EMAIL_TEMPLATE.replace("{name}", name),
        });
    } catch (error) {
        console.log(error);
    }
}

export const sendPasswordResetEmail = async ( email, resetURL) => {
    try {
        const { data, error } = await resendConfig.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [email],
            subject: "Reset Your Password",
            html: `Click <a href="${resetURL}">here</a> to reset your password.`
        });
    } catch (error) {
        console.log("error sending password reset email", error);
    }
}

export const sendResetSuccessEmail = async (email) => {
    try {
        const { data, error } = await resendConfig.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [email],
            subject: "Reset Password Successful!",
            html: `Your password was reset.`,
        });
    } catch (error) {
        console.log("error sending password reset successful email", error);
    }
}