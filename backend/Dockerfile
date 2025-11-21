FROM node:18-alpine

WORKDIR /app

COPY backend/package.json backend/package-lock.json ./

RUN npm install

COPY backend/tsconfig.json ./

COPY backend/src ./src

RUN npm run build
RUN ls -la

CMD ["node", "dist/index.js"]
