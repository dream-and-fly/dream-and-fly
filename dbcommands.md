pgstart
psql
CREATE DATABASE DAF
DATABASE_URL=postgres://dbusername:pass@localhost:5432/DAF
psql -f DAFtables.sql -d daf
heroku pg:psql -f DAFtables.sql --app dream-and-fly
