# Assets API

A simple NestJS asset management service (CRUD)

# API Description

The API has basic CRUD funcionality for managing asset resources.

> Note: The API has only one, asset, domain. The AssetType enum is introduced as a lookup table in the database. This is not a good design decision for production applications! In the scope of this app, this is done on purpose, in order to explore and demonstrate the framework's capabilities without complex domains with lots of data and relations.

# Running the service

There are two options when running the service:

- Running the app locally using PostgreSQL database running in Docker
- Running it completely with Docker (recommended)

> Note: To run the service locally, you should have Node.js 20+ installed!

For local run, the first step is to create the .env file:

```bash
cp .env.example .env
```

After that, run the database:

```bash
docker-compose up postgres -d
```

Then, run the following command to install the dependencies:

```bash
npm install
```

and then execute the following command in order to generate prisma client, migrate and seed the database with asset types:

```bash
npm run db:init
```

You can then start the server in by running:

```bash
npm run start
```

To run it with Docker, first copy the contents of .env.docker to .env:

```bash
cp .env.docker .env
```

Then, run:

```bash
docker compose up -d --build
```

After that, run the following to set up the database:

```bash
docker exec -it assets-api sh -c "npm run db:init"
```

> Note: "assets-api" is the container name set in docker-compose.yaml. If you change the container name, update the command accordingly!
>
> Also, if your container uses bash, then replace sh with bash!

# Try it out!

There is a Postman collection containing the basic API requests included in the project repository, so it can be directly imported in the Postman app. The requests can then be modified for testing various data.
If you don't like Postman, you can import it in Insomnia or a similar API testing app or just use curl.

For API documentation, just go to http://localhost:3000/api-docs in your browser after running the server to explore the API with Swagger UI.
