// import { verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import * as jose from 'jose';

export async function middleware(req) {
  const { refreshToken } = req.cookies;
  if (refreshToken == 'null' || refreshToken == 'undefined')
    return NextResponse.redirect('http://localhost:3000/login');

  try {
    // verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    await jose.jwtVerify(refreshToken, new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET));
    return NextResponse.next();
  } catch (e) {
    console.log(e);

    return NextResponse.redirect('http://localhost:3000/login');
  }

  //

  //   return NextResponse.next();
}
