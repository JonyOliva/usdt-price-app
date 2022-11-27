FROM node
RUN apt-get update -y \
    && apt-get install -y nano cron
WORKDIR /app
COPY . .
RUN npm install --production
RUN chmod 775 cronjobs.txt
RUN crontab cronjobs.txt
CMD ["cron", "-f"]