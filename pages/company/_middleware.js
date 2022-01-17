// import { getToken } from "next-auth/jwt"
import { NextResponse } from 'next/server';

export async function middleware(req) {
  //   const { access_token, refresh_token } = req.cookies;
  //   const { cookie } = req;
  //   const getToken = cookie.parse(req.headers.cookie);
  const { refreshToken } = req.cookies;
  // console.log(token);

  // // return NextResponse.redirect('/login');
  if (!refreshToken) {
    return NextResponse.redirect('/login');
  }

  return NextResponse.next();
}
