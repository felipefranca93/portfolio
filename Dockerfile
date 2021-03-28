FROM nginx:1.19.8-alpine

COPY ./ /usr/share/nginx/html

EXPOSE 80

