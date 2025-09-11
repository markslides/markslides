FROM node:18-alpine

COPY ./docker/entrypoint.sh /usr/bin/

RUN corepack enable && chmod +x /usr/bin/entrypoint.sh

WORKDIR /app

ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD ["npm", "run", "dev"]
