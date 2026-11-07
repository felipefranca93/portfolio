FROM nginx:1.29.4-alpine3.23

WORKDIR /www/

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY /www/ /www

EXPOSE 80

