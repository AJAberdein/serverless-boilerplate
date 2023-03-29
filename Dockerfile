FROM node:16

RUN npm install -g serverless

WORKDIR /app/

COPY ./package.json /app/package.json

RUN npm install

COPY . /app/

EXPOSE 3000

CMD ["serverless", "offline", "--host", "0.0.0.0"]
