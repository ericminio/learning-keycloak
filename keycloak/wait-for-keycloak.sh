#!/bin/bash

while (( `curl --silent --show-error http://localhost:8081 | wc -c` == 0 ));
do
    echo waiting;
    sleep 1;
done;
echo 'Keycloak is ready'