#!/bin/bash

database="monstersdb"

echo "Configuring database: $database"

dropdb -U node_user monstersdb
echo "$database dropped"

createdb -U node_user monstersdb
echo "$database created"

bash -c "psql -U node_user monstersdb < ./bin/sql/monsters.sql"

echo "$database configured"

sleep 5s

