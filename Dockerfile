
FROM node:latest

# Create app directory
RUN mkdir -p ./app
WORKDIR ./app

COPY package.json ./app/

CMD [ "yarn", "install" ]
