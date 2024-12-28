export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  endpoints: {
    users: '/users',
  }
} as const;