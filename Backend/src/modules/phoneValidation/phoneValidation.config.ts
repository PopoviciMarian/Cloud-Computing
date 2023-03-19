

import envSchema from 'env-schema';
import { Type, Static } from '@sinclair/typebox';

const schema = Type.Object({
    PV_API_KEY: Type.String({}),
    PV_URL : Type.String({
        default: "https://phonevalidation.abstractapi.com/v1"
    }),
});

const config = envSchema({
    schema: schema,
    dotenv: true
});

export default config as Static<typeof schema>;

