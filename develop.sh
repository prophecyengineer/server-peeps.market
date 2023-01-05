#!/bin/bash

#Run migrations to ensure the database is updated
medusa migrations run
medusa user -e some@email.com -p some-password
medusa seed -f ./data/seed.json
# ./node_modules/.bin/medex m --run
#Start development environment
medusa develop