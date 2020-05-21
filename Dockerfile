FROM node:8-alpine

WORKDIR /app

RUN apk add --no-cache make gcc g++ python git

# ARG FURY_AUTH
# COPY package.json yarn.lock .npmrc /app/
# RUN yarn install --frozen-lockfile --no-cache

# COPY . /app/
# RUN yarn run build

# EXPOSE 5000
# CMD ["yarn", "run", "serve"]
