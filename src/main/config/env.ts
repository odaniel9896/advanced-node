export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '656931728917300',
    clientSecret: process.env.FB_CLIENT_SECRET ?? '8c95603afb29fb58bfe854d61df93c85'
  },
  port: process.env.PORT ?? 3333,
  jwtSecret: process.env.JWT_SECRET ?? 'djasdsajdasjidji'
}
