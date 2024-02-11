import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/utils";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const hashedPassword = await hashPassword(data.password);

    const result = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        admin: data.admin,
      },
    });

    return NextResponse.json({
      status: 201,
      message: "Signup success",
      data: { name: result.name, email: result.email },
    });
  } catch (error) {
    console.error("Error in signup:", error);

    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
