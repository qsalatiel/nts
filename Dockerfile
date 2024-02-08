FROM node:20-alpine as base
WORKDIR /app
COPY . .

FROM base as dev
EXPOSE 4000

FROM base as build
RUN npm ci && npm run build && npm install pm2 -g
CMD ["pm2-runtime", "build/index.js"]