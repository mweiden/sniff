# Sniff: web application scaffold

This is a web application demonstration repo. It's a barebones newsfeed-style app used to scaffold the folliwing tech stack:

*Frontend stack:*
* React SPA
* Nginx for serving SPA and proxying to backend requests
* Forms using [Formik](https://github.com/jaredpalmer/formik) with validation via [Yup](https://github.com/jquense/yup)
* [GraphQL](https://graphql.org/) - querying and in-memory caching via [apollo client](https://www.apollographql.com/docs/react/); [graphql-codegen](https://the-guild.dev/graphql/codegen) to generate client query code
* Relay-style paginated queries

*Backend stack:*
* Python
* Flask
* Graphql via [ariadne](https://ariadnegraphql.org/); [Relay-style edges for pagination](https://relay.dev/graphql/connections.htm)
* PostgreSQL - using SQLAlchemy for ORM and Alembic for migrations

## Development

First, make sure you have `venv`

```
pip install venv
```

Create your virtual environment and source it

```
make venv
source venv/bin/activate
```

Install dependencies

```
make install
```

Compile typescript types for the web application

```
cd web && yarn run compile
```

Start the database

```
make dev-deps
```

Migrate to the latest version of the database (if you haven't already)

```
alembic upgrade head
```

Run the server in one terminal tab

```
make start-server
```

And run the React application in another

```
make start-web
```

## Build

Build a docker container with the server, which also serves the SPA

```
make build
```

## Debugging


### `FATAL: role "postgres" does not exist`

*Likely explanation:* Postgres was installed via brew and doesn't have `postgres` configured as a superuser

*Remediation:* `/usr/local/Cellar/postgresql/<version>/bin/createuser -s postgres`

### `FATAL:  no pg_hba.conf entry`

*Full error message:* `graphql.error.graphql_error.GraphQLError: (psycopg2.OperationalError) connection to server at "postgres" (172.18.0.2), port 5432 failed: FATAL:  no pg_hba.conf entry for host "172.18.0.3", user "postgres", database "postgres", no encryption`

*Likely explanation:* You're trying to launch the app via docker compose and pb_hba.confg is blocking connections from the server service to the postgres service

*Remediation:* add the following line to the bottom of `~/.postgres/data/pg_hba.conf`: `host    postgres        postgres        172.18.0.0/16           trust`

