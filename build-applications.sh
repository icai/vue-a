#!/usr/bin/env bash

cd sequence-service && ./gradlew clean build && cd -
cd fund-service && ./gradlew clean build && cd -
cd inventory-service && ./gradlew clean build && cd -
cd invest-service && ./gradlew clean build && cd -
cd trade-service && ./gradlew clean build && cd -
cd web-ui/web-gateway && ./gradlew clean build && cd -
