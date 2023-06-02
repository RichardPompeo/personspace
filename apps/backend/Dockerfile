FROM --platform=linux/amd64 node:16-alpine 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g typescript
RUN npm install -g prisma
RUN npm install

COPY .env ./.env
COPY prisma ./prisma/

COPY . .

RUN npm run build
RUN npm run prisma:generate

EXPOSE 4000

CMD [ "yarn", "start" ]