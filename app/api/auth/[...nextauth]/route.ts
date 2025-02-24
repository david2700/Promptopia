import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Session } from 'next-auth';

import { connectToDB } from "@/utils/database";
import User from "@/models/user";


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
    callbacks: {
        async session({ session }: { session: Session }) {
            if (session.user) {
                const sessionUser = await User.findOne({ email: session.user.email });
                session.user.id = sessionUser._id.toString();
        }
        return session;
        },
        async signIn({ profile }: { profile: any }) {
            try {
                await connectToDB();
                const userExists = await User.findOne({ email: profile?.email });

                if (!userExists) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(" ", "").toLowerCase(),
                        image: profile?.image,
                    });
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
});

export {handler as GET, handler as POST};
