/**
 * Centralized, validated environment configuration.
 * Throws at startup if required variables are missing — fast-fail.
 */

function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val || val.startsWith("your-")) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(`[ENV] Missing required environment variable: ${key}`);
    }
    // Warn in dev without crashing
    if (process.env.NODE_ENV !== "test") {
      console.warn(`[ENV] Warning: ${key} is not configured`);
    }
    return "";
  }
  return val;
}

function optionalEnv(key: string, fallback = ""): string {
  return process.env[key] ?? fallback;
}

export const env = {
  app: {
    url:  optionalEnv("NEXT_PUBLIC_APP_URL",  "http://localhost:3000"),
    name: optionalEnv("NEXT_PUBLIC_APP_NAME", "Concept Coaching Classes"),
  },
  firebase: {
    apiKey:            requireEnv("NEXT_PUBLIC_FIREBASE_API_KEY"),
    authDomain:        requireEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
    projectId:         requireEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
    storageBucket:     requireEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: requireEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
    appId:             requireEnv("NEXT_PUBLIC_FIREBASE_APP_ID"),
    measurementId:     optionalEnv("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"),
  },
  youtube: {
    apiKey:    optionalEnv("NEXT_PUBLIC_YOUTUBE_API_KEY"),
    channelId: optionalEnv("NEXT_PUBLIC_YOUTUBE_CHANNEL_ID"),
  },
  sentry: {
    dsn: optionalEnv("NEXT_PUBLIC_SENTRY_DSN"),
  },
  admin: {
    email: optionalEnv("NEXT_PUBLIC_ADMIN_EMAIL", "irshad1554@gmail.com"),
  },
  isDev:  process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
} as const;
