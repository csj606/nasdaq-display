FROM node:23-alpine
WORKDIR /app
COPY NasdaqDisplay/package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN adduser -D app
USER app
CMD ["npm", "run", "preview"]