import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface googleProvider {
    clientId: string;
    clientSecret: string;
}

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error('Missing Google OAuth credentials');
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    async session({session}) {

    },
    async signIn({profile}) {
        try {
            
        } catch (error) {
            
        }
    }
})

export {handler as GET, handler as POST};
