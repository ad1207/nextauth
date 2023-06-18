import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    session:{
        strategy: "jwt",
        maxAge: 30*24*60*60,//30 days
    },
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID,
            clientSecret:process.env.GITHUB_CLIENT_SECRET
        }),
        CredentialsProvider({
            type:"credentials",
            credentials:{
                email:{
                    label:"Email",
                    type:'email',
                },
                password:{
                    label:"Password",
                    type:"password"
                },
            },
            async authorize(credentials) {
                const credentialDetails = {
                    email:credentials.email,
                    password:credentials.password,
                }

                const resp = await fetch(process.env.NEXTAUTH_URL+'api/login',{
                    method:"POST",
                    headers:{
                        Accept:"application/json",
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify(credentialDetails),
                });
                const user = await resp.json();
                if(user.isSuccess){
                    return user
                }else{
                    console.log("Check your credentials");
                    return null;
                }
            },
        }),
    ],
    callbacks:{
        jwt:async({token,user}) => {
            if(user){
                token.email = user.email;
                token.userType = user.userType;
                token.accessToken = user.token;
            }

            return token;
        },
        session: ({session,token,user}) => {
            if(token){
                session.user.email = token.email;
                session.user.accessToken = token.accessToken;
            }
            return session;
        }
    },
    pages: {
        signIn: '/signin'
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }