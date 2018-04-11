var session = require('express-session');
var Keycloak = require('keycloak-connect');

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });

const express = require('express');
const app = express();

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));
app.use( keycloak.middleware() );

var roleGuard = function(token, req, resp) {
    console.log(JSON.stringify(token.content, null, 2));
    return token.hasRole('realm:courtagent');
}
app.get('/', keycloak.protect(roleGuard), (req, res) => {
    console.log(req.kauth.grant.access_token.content);
    res.send('Hello World!');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));