#!/bin/bash
yarn run typeorm schema:sync && yarn run typeorm migration:run && yarn start_t 
exec "$@"