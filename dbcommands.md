pgstart
psql
CREATE DATABASE DAF
psql -f DAFtables.sql -d DAF
heroku pg:psql -f DAFtables.sql --app dream-and-fly
