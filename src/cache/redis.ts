import logger from 'jet-logger';
import { createClient } from "redis";

const client :ReturnType<typeof createClient> = createClient({url:process.env.REDIS_URL as string});

(async () => {
    await client.connect();
})();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
client.on('error', (err:Error) => logger.err('<:: Redis Client Error', err));
client.on('connect', () => logger.info('::> Redis Client Connected'));

export default client;
