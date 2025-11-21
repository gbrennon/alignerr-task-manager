FROM node:18-alpine

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./

RUN npm install

COPY frontend/public ./public
COPY frontend/src ./src

RUN ls -la src

RUN npm run build

FROM nginx:alpine

COPY --from=0 /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
