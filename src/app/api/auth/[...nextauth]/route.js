import User from '@/models/userModel';
import dbConnect from '@/utils/db';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

async function validateCredentials(credentials) {
  try {
    await dbConnect();
    const { email, password } = credentials;

    // console.log('credentials', credentials);

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Username or password is incorrect.');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Username or password is incorrect.');
    }

    return user;
  } catch (error) {
    console.log('Error while logging in: ', error);
    throw new Error(error);
  }
}

export const authOptions = {
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // console.log('credentials', credentials);
          const user = await validateCredentials(credentials);
          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.firstName;
        token.email = user.email;
        token.id = user._id;
        token.perHour = user.perHour;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          name: token.name,
          email: token.email,
          id: token.id,
          perHour: token.perHour,
        };
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
