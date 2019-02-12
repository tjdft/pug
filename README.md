# PUG

It will remind you every day  what is essential about your products: **quality**, **proactive maintenance** and **availability**. It was designed to display cool dashboards on your TV, because  everyone likes to watch TV.


PUG is a frontend app only. It intends exclusively to display dashboards on your TV. **So, you will not receive email notifications about your services.**


## DASHBOARDS

### Quality

![sonar.png](https://raw.githubusercontent.com/tjdft/pug/master/sonar.png)

- **red**: there is at least one "bug"
- **yellow**: zero "bugs", but at least one "vulnerability" or "code smell"
- **green**: all fine!
- **grey**: metrics not configured

### Proactive maintenance  

![sentry.png](https://raw.githubusercontent.com/tjdft/pug/master/sentry.png)

- **red**: it has "unsolved issues" by last 14 days
- **green**: all fine!

### Availability 

![openshift.png](https://raw.githubusercontent.com/tjdft/pug/master/openshift.png)

- **red**: there are some "red pods"
- **gray**: there are some pods down
- **green**: all fine!

## LOCAL SETUP

- Clone this repository.

- Create a `.env` file from example and configure the environment variables.

```bash
mv .env.example .env
```


- Install dependencies and start up local server.

``` bash
# install dependencies
$ yarn install

# Development mode with hot reload at http://localhost:3000
$ yarn dev
```

## PRODUCTION SETUP


### API Keys

Note that is necessary an API KEY for each service (`.env` file). So, only projects binded to that user (who own the API KEY) will be displayed on dashboards.

It is highly recommend to use API KEYS with readonly permissions. 

It is highly recommend **do not commit** the `.env` file into your repository.  In order to keep API KEYS in safe, you should provide them as environment variables (Ex: Gitlab CI) before building.


### Proxy

By default, some services like Openshift and Sonar does not have CORS enabled by default. So, PUG uses `@nuxtjs/proxy` module to avoid CORS issues. Internal requests, for instance, to paths like `'/openshift/'`  will be rewrited to actual external Openshift API url.


### Server

As we are relying on `@nuxtjs/proxy`, PUG must be started through a Node server. In that case, Nginx must act as a reverse proxy, listening on 80 or 8080 port and passing into `http://localhost:3000`.


nginx.conf snipet

```bash
[...]
server {
    listen 8080;        
    sendfile on;
    port_in_redirect off;

    root /var/www/web/dist;
    index index.html;

    location / {         
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
[...]
```

Build it

```
yarn build
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