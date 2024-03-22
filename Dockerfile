FROM node:21-alpine as builder
WORKDIR /front
COPY package*.json .
COPY yarn*.lock .
RUN yarn install
COPY . .
RUN yarn build


FROM nginx:1.25.4-alpine

ENV NODE_ENV=production
ENV VITE_API_BASE="http://localhost:3000"
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /front/dist .
EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]
