import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    // adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    session: {
        jwt: true,
        // 1 hour maxAge
        maxAge: 60 * 60,
    },
    jwt: {
        maxAge: 60 * 60,
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "ime@varela.hr" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                // fetch with current base url pathname
                const res = await fetch(process.env.NEXT_PUBLIC_LOGIN_URL + "/api/auth/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });
                const user = await res.json();

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user;
                };
                // Return null if user data could not be retrieved
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            //console.log("jwt", token, user)
            if (user) {
                token = user;
            }
            return token;
        },
        async session({ session, user, token }: any) {
            if(user){
                session.user = user;
            }
            else if(token){
                session.user = token;
            }
            return session;
        },
    }
}

export default NextAuth(authOptions)

