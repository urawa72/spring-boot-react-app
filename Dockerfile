FROM node:14-alpine AS frontend
WORKDIR /tmp
COPY ./frontend ./frontend
WORKDIR /tmp/frontend
RUN yarn install
RUN yarn build:docker

FROM openjdk:11-jdk-slim AS builder
WORKDIR /tmp
COPY ./backend ./backend
WORKDIR /tmp/backend
COPY --from=frontend /tmp/frontend/build /tmp/app/src/main/resources/public
RUN ./gradlew build

FROM openjdk:11-jdk-slim
WORKDIR /app
COPY --from=builder /tmp/backend/build/libs/payroll-0.0.1-SNAPSHOT.jar .
ENTRYPOINT ["java", "-jar", "payroll-0.0.1-SNAPSHOT.jar"]
