const prefix = path => {
  let prefix = null;
  switch (process.env.NODE_ENV) {
    // ts-jest registers ts-node
    case 'test':
      prefix = 'src';
      break;
    // development uses tsc-watch now
    case 'development':
    case 'production':
    default:
      prefix = 'dist/src';
      break;
  }

  return `${prefix}/${path}`;
};
console.log('config');

console.log(prefix('entity/**/*.*'));
module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [prefix('**/*.entity.*')],
  migrations: [prefix('migration/**/*.*')],
  subscribers: [prefix('subscriber/**/*.*')],
  cli: {
    migrationsDir: prefix('migration'),
  },
};
