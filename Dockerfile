FROM node:18.20.2-alpine3.19 as build
WORKDIR /app

COPY package*.json ./
COPY .npmrc .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.24.0-alpine3.17
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/elms/browser /usr/share/nginx/html
EXPOSE 8080
ENTRYPOINT [ "nginx", "-g", "daemon off;"]
