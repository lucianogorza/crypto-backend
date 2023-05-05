export const EnvConfiguration = () => ({
  databaseUrl: process.env.DATABASE_URL,
  postgresUser: process.env.POSTGRES_USER,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  etherscanApiUrl: process.env.ETHERSCAN_API_URL,
  etherscanApiKey: process.env.ETHERSCAN_API_KEY,
});
