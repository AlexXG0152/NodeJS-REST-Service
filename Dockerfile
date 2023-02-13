FROM node:18-alpine

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app 

COPY package*.json /app
COPY prisma ./prisma/ 

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:migrate:dev"]