import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request: Request) {
  const { id } = await request.json();
  console.log(id);
  if (!id) {
    return NextResponse.json(
      { message: "Image Id is required." },
      { status: 400 }
    );
  }
  try {
    await cloudinary.uploader.destroy(id);
    return NextResponse.next({ status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
