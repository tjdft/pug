# PUG

It will remind you every day  what is essential about your products: **quality**, **proactive maintenance** and **availability**. It was designed to display cool dashboards on your TV, because  everyone likes to watch TV.


PUG is a frontend app only. It intends exclusively to display dashboards on your TV. **So, you will not receive email notifications about your services.**


## DASHBOARDS

**Quality** 

![sonar.png](https://raw.githubusercontent.com/tjdft/pug/master/sonar.png)

**Proactive maintenance**  

![sentry.png](https://raw.githubusercontent.com/tjdft/pug/master/sentry.png)


**Availability** 

![openshift.png](https://raw.githubusercontent.com/tjdft/pug/master/openshift.png)

## LOCAL SETUP

- Clone this repository

- Create a `.env` file from example

```bash
mv .env.example .env
```

- Configure the environment variables

```bash
# Startup mode
TV_MODE=false

# How much time each panel should display
TV_TRANSITION_INTERVAL=30000 

# Openshift 
OPENSHIFT_URL=https://openshift.company.com
OPENSHIFT_TOKEN=
OPENSHIFT_REFRESH_INTERVAL=60000

# Sonar
SONAR_URL=https://sonar.company.com
SONAR_TOKEN=
SONAR_REFRESH_INTERVAL=60000

# Sentry
SENTRY_URL=http://sentry.company.com
SENTRY_TOKEN=
SENTRY_REFRESH_INTERVAL=60000

```

- Install dependencies and start up local server

``` bash
# install dependencies
$ yarn install

# Development mode with hot reload at http://localhost:3000
$ yarn dev
```

### API Keys

Note that is necessary an API KEY for each service. So, only projects binded to that user (who own the API KEY) will be displayed on dashboards.

It is highly recommend to use API KEYS with readonly permissions. 


### Proxy

By default, some services like Openshift and Sonar does not have CORS enabled by default. So, PUG uses `@nuxtjs/proxy` module to avoid CORS issues. Internal requests to paths like `'/openshift'`  will be rewrited to actual external Openshift API url.

## PRODUCTION SETUP


### Build

It is highly recommend do not commit `.env` to your repository.  In order to keep API KEYS in safe, you should provide them as environment variables (Ex: Gitlab CI) before building.


```
# all needed environment variables must be avaliable at this point
yarn build
```


### Server

As we are relying on `@nuxtjs/proxy`, PUG must be started through a Node server. In that case, Nginx must act as a reverse proxy, listening on 80 or 8080 port and passing into `http://localhost:3000`.


nginx.conf snipet

```bash
[...]
server {
    listen 8080;        
    sendfile on;
    port_in_redirect off;

    root /var/www/dist;
    index index.html;

    location / {         
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
[...]
```


So we can start it through Node server in production
```
# It will start on http://localhost:3000
yarn start
```

## TODO

- Disable dashboards
- Generate full query string for custom dashboards (default values for filters / tags)
- Maybe display only projects with "pug" tag.