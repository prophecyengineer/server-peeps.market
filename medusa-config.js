const dotenv = require('dotenv')

let ENV_FILE_NAME = '';
switch (process.env.NODE_ENV) {
  case 'production':
    ENV_FILE_NAME = '.env.production';
    break;
  case 'staging':
    ENV_FILE_NAME = '.env.staging';
    break;
  case 'test':
    ENV_FILE_NAME = '.env.test';
    break;
  case 'development':
  default:
    ENV_FILE_NAME = '.env';
    break;
}

try {
  dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME });
} catch (e) {
}

// CORS when consuming Medusa from admin
const ADMIN_CORS = "http://localhost:7000,http://localhost:7001,http://10.0.0.4:7001,http://0.0.0.0:7001,https://lambent-peony-f1b147.netlify.app,https://admin.peeps.market,https://admin-demo.peeps.market";

// ADMIN_CORS=https://glittery-biscuit-d3f133.netlify.app/

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000,https://shop.peeps.market,https://demo.peeps.market";

// Database URL (here we use a local database called medusa-development)
const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-store";

// Medusa uses Redis, so this needs configuration as well
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  // `medusa-extender`,
  // `medusa-marketplace`,
  // Uncomment to add Stripe support.
  // You can create a Stripe account via: https://stripe.com
  // {
  //   resolve: `medusa-payment-stripe`,
  //   options: {
  //     api_key: STRIPE_API_KEY,
  //     webhook_secret: STRIPE_WEBHOOK_SECRET,
  //   },
  // },
];

// module.exports = {
//   projectConfig: {
//     // cli_migration_dirs: ['node_modules/medusa-marketplace/dist/**/*.migration.js'],

//     // 
//     // redis_url: REDIS_URL,
//     // For more production-like environment install PostgresQL
//     // database_url: DATABASE_URL,
//     // database_type: "postgres",
//     database_database: "./medusa-db.sql",
//     database_type: "sqlite",
//     store_cors: STORE_CORS,
//     admin_cors: ADMIN_CORS,
//   },
//   plugins,
// };

module.exports = {
  projectConfig: {
    redis_url: REDIS_URL,
    database_url: DATABASE_URL,
    database_type: "postgres",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
    database_extra:
      process.env.NODE_ENV !== "development"
        ? { ssl: { rejectUnauthorized: false } }
        : {},
  },
  plugins,
};