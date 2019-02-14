FROM tjdft/vue-ssr:latest

ENV HOST 0.0.0.0

# Copy critical files (cached docker layers)
COPY package.json /var/www/web/
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

CMD ["/bin/sh", "-c", "nginx && yarn start"] 

