FROM node:10-alpine
WORKDIR /app
COPY . .
RUN npm i
ENTRYPOINT ["node"]
CMD ["main.js"]
