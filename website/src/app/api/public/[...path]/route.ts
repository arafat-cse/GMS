import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL ?? "http://127.0.0.1:8000/api/v1";

async function proxy(req: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/");
  const url = `${BACKEND_URL}/${path}${req.nextUrl.search}`;

  let body: BodyInit | undefined;
  const contentType = req.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    body = await req.formData();
  } else if (!["GET", "HEAD"].includes(req.method)) {
    body = await req.text();
  }

  const backendRes = await fetch(url, {
    method: req.method,
    headers: {
      Accept: "application/json",
      ...(contentType.includes("multipart/form-data")
        ? {}
        : body
          ? { "Content-Type": "application/json" }
          : {}),
    },
    body,
    cache: "no-store",
  });

  const data = await backendRes.json().catch(() => null);
  return NextResponse.json(data, { status: backendRes.status });
}

export { proxy as GET, proxy as POST };
