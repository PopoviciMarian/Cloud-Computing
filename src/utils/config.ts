import envSchema from 'env-schema';
import { Type, Static } from '@sinclair/typebox';

const schema = Type.Object({
    PORT: Type.Number(
        {
            minimum: 4000,
            maximum: 5000,
            default: 4001
        }),
    NODE_ENV: Type.Union([
        Type.Literal('development'),
        Type.Literal('production'),

    ], { default: 'development' }),
    HOST: Type.String({ default: 'localhost' }),
    API_VERSION: Type.String({ default: 'v1' }),
    MONGO_URI: Type.String({}),
});

const config = envSchema({
    schema: schema,
    dotenv: true
});

export default config as Static<typeof schema>;