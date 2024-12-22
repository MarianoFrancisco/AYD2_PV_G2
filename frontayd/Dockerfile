FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

FROM node:18-alpine
WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist/frontayd/browser .

EXPOSE 80

CMD ["serve", "-s", ".", "-l", "80"]
