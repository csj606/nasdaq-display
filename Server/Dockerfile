FROM node:24-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN apt-get update
RUN apt-get install python3 -y
RUN apt-get install build-essential -y
RUN npm i
COPY . .
EXPOSE 4266
RUN npm run build
RUN useradd app
USER app
CMD ["npm", "run", "start"]