FROM mysql:latest

#root password
ENV MYSQL_ROOT_PASSWORD=password

#CP createTables script
COPY ./mysql-init-scripts /docker-entrypoint-initdb.d/