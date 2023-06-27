export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    MongoURI: process.env.MONGO_URI,
  },
  secret: {
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    access_token_expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN,
  },
});
