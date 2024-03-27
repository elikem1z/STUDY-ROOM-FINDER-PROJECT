FROM node:21-alpine as builder
WORKDIR /front
COPY package*.json .
COPY yarn*.lock .
RUN yarn install
COPY . .
RUN yarn build


FROM nginx:1.25.4-alpine

ENV NODE_ENV=production
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /front/dist .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
