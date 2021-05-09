pgstart
psql
CREATE DATABASE DAF
DATABASE_URL=postgres://dbusername:pass@localhost:5432/DAF
psql -f DAFtables.sql -d DAF
