import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const result = await prisma.user.findFirst({
      where: {
        email: data?.email,
      },
    });

    return NextResponse.json({
      status: 200,
      data: result?.admin,
    });
  } catch (error) {
    console.error("Error in check admin:", error);

    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
