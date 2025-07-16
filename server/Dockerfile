FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY . .

EXPOSE 3000

VOLUME /app/prisma

CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]