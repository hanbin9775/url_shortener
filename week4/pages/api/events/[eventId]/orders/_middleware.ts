import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.headers.get('authorization');
  if (token === undefined) {
    return new NextResponse(null, { status: 400 });
  }
  return NextResponse.next();
}
