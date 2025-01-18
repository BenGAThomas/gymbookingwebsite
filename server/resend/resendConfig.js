import { Resend } from "resend";
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line no-undef
export const resend = new Resend(process.env.RESEND_API_KEY);