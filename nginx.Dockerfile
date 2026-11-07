FROM nginx:1.31.8-alpine

#WORKDIR /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY www/ /usr/share/nginx/html

EXPOSE 80

