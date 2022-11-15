FROM node:17.7.2
WORKDIR /app
COPY package*.json ./
RUN yarn
Run yarn migration:generate
COPY . .
ENV NODE_PATH=./src