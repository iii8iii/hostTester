FROM node:alpine
COPY ./packge*.json /
RUN "npm install"
COPY . .
CMD ["node","index.js"]