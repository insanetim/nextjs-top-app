FROM node:16-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production --ignore-scripts --prefer-offline
COPY . .
ENV NODE_ENV production
RUN yarn build
CMD ["yarn", "start"]
EXPOSE 3000