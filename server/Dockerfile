FROM node:16.14.0

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install

# RUN npm install pm2 -g

COPY .env.prod ./.env

RUN npm run build


# COPY ./dist .

EXPOSE 9000

# having issue with alias path need time for debugging
# CMD ["pm2-runtime","src/app.js"]start

CMD ["npm","start"]