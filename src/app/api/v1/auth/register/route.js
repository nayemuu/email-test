// app/api/register/route.js

import { sendEmail } from "@/backend/utills/emailUtils";
import { NextResponse } from "next/server";

// ✅ POST /api/register
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // console.log("name = ", name);
    // console.log("email = ", email);
    // console.log("password = ", password);

    // const { user, otpCode } = await createUser({
    //   name,
    //   email,
    //   picture,
    //   password,
    // });

    const otpCode = 124021;

    sendEmail({
      to: email,
      subject: "Verify Your Email Address",
      text: `Your account activation code is ${otpCode}. 
    This code will expire in 5 minutes. 
    If you did not request this, please ignore this email.`,
      html: `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
      <h2 style="color:#4CAF50;">Email Verification</h2>
      <p>Thank you for signing up! Please use the verification code below to activate your account:</p>
      <p style="font-size:20px; font-weight:bold; color:#000; letter-spacing:2px;">
        ${otpCode}
      </p>
      <p>This code will expire in <b>5 minutes</b>.</p>
      <p>If you did not request this, you can safely ignore this email.</p>
      <hr />
      <p style="font-size:12px; color:#777;">This is an automated message. Please do not reply.</p>
    </div>
  `,
    });

    return NextResponse.json(
      {
        status: "success",
        message:
          "User successfully registered. An OTP has been sent to your email. Please verify within 5 minutes.",
        // data: {
        //   id: user._id,
        //   email: user.email,
        // },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Register Error:", error);

    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
