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
      prefix = 'dist';
      break;
  }

  return `${prefix}/${path}`;
};
console.log('config');

console.log(prefix('entity/**/*.*'));
module.exports = {
  name: 'default',
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [prefix('**/*.entity.*')],
  migrations: [prefix('migration/**/*.*')],
  subscribers: [prefix('subscriber/**/*.*')],
  cli: {
    migrationsDir: prefix('migration'),
  },
};
