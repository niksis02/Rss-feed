Simple express application that handles Bearer token authentication, connects to a postgresql database via sequelize ORM, uses socket.io for real time updates.

In order to run project locally:

1. Clone the repo;
2. npm || yarn install on root directory;
3. npm run || yarn build on root directory;
4. Set env variables;

In order to run migrations:

1. Create config.json file with your db credentials in /src/config directory;
2. Build the project(npm run build, yarn build);
3. Run npx sequelize-cli db:migrate on /src;
4. npm run || yarn dev;

If there are any questions contact with me: email: sisnikoyan@gmail.com
