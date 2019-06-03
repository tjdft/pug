let express = require('express')
let axios = require('axios')
let app = express()

app.get('/sentry*', async (req, res) => {    
    const url = process.env.SENTRY_URL + req.url.replace('/sentry', "")
    const response = await axios.get(url, {
        headers: { 'Authorization': `Bearer ${process.env.SENTRY_TOKEN}`}
    })

    res.set('x-hits', response.headers['x-hits'])
    res.json(response.data)
})

app.get('/sonar*', async (req, res) => {    
    const url = process.env.SONAR_URL + '/api' + req.url.replace('/sonar', "")
    const response = await axios.get(url, {
        headers: { 'Authorization': `Basic ${Buffer.from(process.env.SONAR_TOKEN + ':', 'ascii').toString('base64')}`}
    })            

    res.json(response.data)
})

app.get('/smax*', async (req, res) => {    
    let response = await axios.post(`${process.env.SMAX_URL}/auth/authentication-endpoint/authenticate/login?TENANTID=${process.env.SMAX_TENANTID}`, {
        'Login': process.env.SMAX_USER,
        'Password': process.env.SMAX_PASSWORD
    })
  
    const token = (response.data && response.data.length === 1580) ? response.data : ''
    const url = process.env.SMAX_URL + req.url.replace('/smax', "")

    response = await axios.get(url, {
        headers: { 'Cookie': `LWSSO_COOKIE_KEY=${token}`}
    })            

    res.json(response.data)
})

export default {
    path: '/api',
    handler: app
}
