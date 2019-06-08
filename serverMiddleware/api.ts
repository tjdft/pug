let express = require('express')
let axios = require('axios')
let app = express()

let NodeJsonConfig = require('node-json-config')
let PugConfig = new NodeJsonConfig('./storage/pug.json')

app.use(express.json())

app.get('/sentry*', async (req, res) => {
    const url = process.env.SENTRY_URL + req.url.replace('/sentry', "")
    const response = await axios.get(url, {
        headers: { 'Authorization': `Bearer ${process.env.SENTRY_TOKEN}` }
    })

    res.set('x-hits', response.headers['x-hits'])
    res.json(response.data)
})

app.get('/sonar*', async (req, res) => {
    const url = process.env.SONAR_URL + '/api' + req.url.replace('/sonar', "")
    const response = await axios.get(url, {
        headers: { 'Authorization': `Basic ${Buffer.from(process.env.SONAR_TOKEN + ':', 'ascii').toString('base64')}` }
    })

    res.json(response.data)
})

app.get('/smax*', async (req, res) => {
    try {

        let response = await axios.post(`${process.env.SMAX_URL}/auth/authentication-endpoint/authenticate/login?TENANTID=${process.env.SMAX_TENANTID}`, {
            'Login': process.env.SMAX_USER,
            'Password': process.env.SMAX_PASSWORD
        })

        // TODO
        const token = (response.data && response.data.length === 1580 /** PROD 1516 */) ? response.data : ''
        const url = process.env.SMAX_URL + req.url.replace('/smax', "") + `&TENANTID=${process.env.SMAX_TENANTID}`

        response = await axios.get(url, {
            headers: { 'Cookie': `LWSSO_COOKIE_KEY=${token}` }
        })

        res.json(response.data)

    } catch (e) {
        throw new Error(`Error SMAX API: ${e.message}`)
    }
})

app.get('/dashboards', async (req, res) => {
    try {
        const dashboards = PugConfig.get('dashboards')
        res.json(dashboards)
    } catch (e) {
        throw new Error(`Error fetching dashboards: ${e.message}`)
    }
});

app.get('/dashboards/:id', async (req, res) => {
    try {
        const dashboards = PugConfig.get('dashboards')
        const dashboard = dashboards.find(dashboard => dashboard.name === req.params.id)

        res.json(dashboard)
    } catch (e) {
        throw new Error(`Error fetching dashboard: ${e.message}`)
    }
});

// app.post('/workspaces', async (req, res) => {
//     try {
//         PugConfig.put('projects', req.body.projects)
//         PugConfig.save()

//         const projects = PugConfig.get('projects')

//         res.json(projects)
//     } catch (e) {
//         throw new Error(`Error saving projects: ${e.message}`)
//     }
// });

export default {
    path: '/api',
    handler: app
}
