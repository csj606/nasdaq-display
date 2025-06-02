FROM node:23-alpine
WORKDIR /app
COPY Server/package*.json ./
RUN npm ci
COPY . .
EXPOSE 4266
RUN npm run build
RUN adduser -D app
USER app
CMD ["npm", "run", "start"]