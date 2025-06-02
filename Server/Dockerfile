FROM node24-alpine
WORKDIR /app
COPY Server/package*.json ./
RUN npm ci
COPY Server .
EXPOSE 4266
RUN npm run build
RUN adduser -D app
USER app
CMD ["npm", "run", "start"]