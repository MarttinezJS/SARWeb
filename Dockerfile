FROM oven/bun:1-alpine AS build

WORKDIR /app
COPY . .

ARG VITE_API_URL=${VITE_API_URL}
ARG VITE_WS_URL=${VITE_WS_URL}
ARG VITE_CLOUD_NAME=${VITE_CLOUD_NAME}
ARG VITE_AZURA_API_KEY=${VITE_AZURA_API_KEY}
ARG VITE_AZURA_API_URL=${VITE_AZURA_API_URL}
ARG VITE_STATION_ID=${VITE_STATION_ID}

RUN bun i 
RUN bun run build

FROM nginx:alpine3.17

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

# COPY run.sh /docker-entrypoint.d/run.sh
# RUN chmod +x /docker-entrypoint.d/run.sh
CMD ["nginx", "-g", "daemon off;"]