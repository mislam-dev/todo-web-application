import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await resp.json();

    if (!resp.ok) {
      return NextResponse.json(
        { error: data.detail || "Login failed" },
        { status: resp.status }
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("access", data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    response.cookies.set("refresh", data.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.log(error);
    const response = NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
    return response;
  }
}
