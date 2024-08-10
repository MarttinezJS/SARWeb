FROM oven/bun:1-alpine AS build

WORKDIR /app
COPY . .

RUN bun i
RUN bun run build

FROM nginx:alpine3.17

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]