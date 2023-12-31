FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
CMD ["node", "dist/server.js"] 

EXPOSE 3000