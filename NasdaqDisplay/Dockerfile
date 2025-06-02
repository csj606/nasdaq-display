FROM node:24-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN apt-get update
RUN apt-get install python3 -y
RUN apt-get install build-essential -y
RUN npm i
COPY . .
RUN npm run build
RUN useradd app
RUN chown -R app:app /app
USER app
CMD ["npm", "run", "preview"]