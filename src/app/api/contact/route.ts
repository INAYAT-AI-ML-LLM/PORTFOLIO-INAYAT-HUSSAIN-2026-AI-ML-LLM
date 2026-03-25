import { NextRequest, NextResponse } from "next/server";

// Web3Forms - Free email delivery service
// Access key is linked to your email: mohammadinayathussain5@gmail.com
// Get your own key at https://web3forms.com (free, no signup needed — just enter your email)
const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE"; // <-- REPLACE THIS

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Basic server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address." },
        { status: 400 }
      );
    }

    // Send to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name,
        email,
        message,
        from_name: "Portfolio Contact Form",
        subject: `🚀 New Portfolio Message from ${name}`,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({
        success: true,
        message: "Message sent successfully!",
      });
    } else {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to send message." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
