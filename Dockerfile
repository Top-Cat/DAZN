FROM node:10-alpine
WORKDIR /app
COPY . .
COPY docker_config.json config.json
RUN npm i
ENTRYPOINT ["node"]
CMD ["main.js"]
