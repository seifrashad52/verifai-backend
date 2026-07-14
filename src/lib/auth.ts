import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    // "forgot password" flow: better-auth sends a reset token via sendResetPassword.
    // Wire this to your email provider (Resend/SendGrid) to email the OTP/link.
    sendResetPassword: async ({ user, url, token }) => {
      // TODO: send email with a 6-digit OTP or reset link containing `token`
      console.log(`Send reset email to ${user.email}: ${url}`);
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      // Note: Instagram has no standalone consumer OAuth provider.
      // Facebook Login is the practical way to support "sign in with Instagram"
      // for a consumer app (via Meta's Graph API), unless you go through
      // Instagram's Business Login which requires a Business/Creator account.
    },
  },
});
