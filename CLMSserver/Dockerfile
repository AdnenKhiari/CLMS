FROM node:latest
WORKDIR /var/www/testsite/CLMSserver
COPY ../package*.json ./
RUN npm install
COPY ../ .
EXPOSE 4000
CMD ["node","index.js"]