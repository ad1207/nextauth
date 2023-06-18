import { NextRequest,NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({ name:"GET" })
}

export async function POST(request){
    const req = await request.json()
    console.log(req)
    return NextResponse.json({isSuccess:true,email:'example@email.com',userType:'admin',token:'abcd'})
}