
import envSchema from 'env-schema';
import { Type, Static } from '@sinclair/typebox';

const schema = Type.Object({
    PG_API_KEY: Type.String({}),
    PG_URL : Type.String({
        default: "https://api.escuelajs.co/api/v1"
    }),
});

const config = envSchema({
    schema: schema,
    dotenv: true
});

export default config as Static<typeof schema>;

