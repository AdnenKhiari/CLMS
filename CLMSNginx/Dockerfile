FROM nginx:latest
WORKDIR /var/www/app
RUN chown nginx.nginx .
EXPOSE 8085
ENV NODE_ENV="production"
CMD ["nginx", "-g", "daemon off;"]