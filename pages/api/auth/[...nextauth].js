import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize(credentials, req) {
                if (username !== "Bridger") {
                    throw new Error('invalid username')
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/signin",
    }
}

export default NextAuth(authOptions)