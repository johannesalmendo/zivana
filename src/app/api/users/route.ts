import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import multer from "multer";
import fs, { writeFile } from "fs/promises";
import path from "path";
import { zfd } from "zod-form-data";
import { z } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
export const dynamic = 'force-dynamic'
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(request: NextRequest) {
    try {
      const search = request.nextUrl.searchParams.get("search");

      if (search) {
        const searchResults = await prisma.user.findMany({
          where: {
            OR: [
              { name: { contains: search as string } },
              { email: { contains: search as string } },
            ],
          },
        });
  
        const response = new Response(
          JSON.stringify({
            status: 200,
            message: "Search results successfully retrieved",
            data: searchResults,
          }),
          {
            status: 200,
            headers: headers,
          }
        );
  
        return response;
      } else {
        const products = await prisma.user.findMany({
            where:{
                admin: false
            }
        });
  
        const response = new Response(
          JSON.stringify({
            status: 200,
            message: "Products successfully retrieved",
            data: products,
          }),
          {
            status: 200,
            headers: headers,
          }
        );
  
        return response;
      }
    } catch (error) {
      console.error("Failed to retrieve products:", error);
  
      const response = new Response(
        JSON.stringify({
          status: 500,
          message: "Internal Server Error",
        }),
        {
          status: 500,
          headers: {},
        }
      );
  
      return response;
    }
  }