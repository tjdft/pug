FROM tjdft/vue-ssr:latest

ARG SENTRY_TOKEN
ARG OPENSHIFT_TOKEN
ARG SONAR_TOKEN
ARG SENTRY_URL
ARG OPENSHIFT_URL
ARG SONAR_URL

ENV SONAR_TOKEN=$SONAR_TOKEN
ENV OPENSHIFT_TOKEN=$OPENSHIFT_TOKEN
ENV SENTRY_TOKEN=$SENTRY_TOKEN
ENV SONAR_URL=$SONAR_URL
ENV OPENSHIFT_URL=$OPENSHIFT_URL
ENV SENTRY_URL=$SENTRY_URL

ENV HOST 0.0.0.0

# Copy critical files (cached docker layers)
COPY yarn.lock /var/www/web/
COPY .env.example /var/www/web

# Create .env file from example
RUN mv .env.example .env

# Install dependencies
RUN yarn install

# Copy with owner 'appuser' (same from base image)
COPY --chown=appuser:appuser . /var/www/web/

# "yarn build" generates /var/www/web/dist, that is served by Nginx (from base image)
RUN yarn build

