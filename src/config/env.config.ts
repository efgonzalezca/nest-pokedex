export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB || 'mongodb://localhost:27017/nest-pokemon',
  port: process.env.PORT || 4000,
  defaultLimit: +process.env.DEFAULT_LIMIT || 5
})  