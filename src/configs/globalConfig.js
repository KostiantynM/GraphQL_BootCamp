import dotenv from 'dotenv'
dotenv.config();

const config = {
    sessionToken: process.env.SESSION_TOKEN,
    prismaSecret: process.env.PRISMA_SECRET,
    prismaEndpoint: process.env.PRISMA_ENDPOINT,
    yogaServerPort: process.env.PORT || 4000
};

export default config;