export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '',
    clientSecret: process.env.FB_CLIENT_SECRET ?? ''
  },
  port: process.env.PORT ?? 3333,
  jwtSecret: process.env.JWT_SECRET ?? 'djasdsajdasjidji'
}
