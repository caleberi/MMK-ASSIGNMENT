import { createClient } from "redis";

export type RedisClientReturnType =  ReturnType<typeof createClient>