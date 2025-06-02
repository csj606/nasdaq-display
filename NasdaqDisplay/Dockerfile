FROM node24-alpine
WORKDIR /app
COPY NasdaqDisplay/package*.json ./
RUN npm ci
COPY NasdaqDisplay .
RUN npm run build
RUN adduser -D app
USER app
CMD ["npm", "run", "preview"]