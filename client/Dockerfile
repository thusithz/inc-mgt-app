FROM node:16.14.0

WORKDIR /inc_mgt_client
COPY package.json ./
COPY .eslintignore ./

RUN npm install 

ARG STAGE=production

RUN echo $STAGE

COPY .env ./.env
# [https://nextjs.org/docs/basic-features/environment-variables#default-environment-variables]
COPY .env.${STAGE} ./.env.production

COPY public ./public
COPY src ./src/
COPY tests ./tests/
COPY *.ts ./
COPY *.js ./
COPY *.json ./

# RUN npm run test
RUN npm run build

WORKDIR /inc_mgt_client

ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "start"]
