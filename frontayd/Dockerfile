FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build -- --configuration production

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist/frontayd/browser .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
