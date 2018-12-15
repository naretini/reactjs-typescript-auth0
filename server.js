const express = require('express');

require('dotenv').config();

const jwt = require('express-jwt'); // Validate JWT and set req.user
const jwksRsa = require('jwks-rsa'); //Retrieve RSA keys from a JSON WEb Key set (JWKS) endpoint


const checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header
    // and the signing keys provided by the JWKS endpoint
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    // Validate the audience and the issuer
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

    // This must match the algorithm selected in the Auth0 dashboard under your app's adv settings under the OAuth tab
    algorithms: ["RS256"]
})



const app = express();


app.get("/public", (req, res) => {
    res.json({
        message: "Hello from a public API!"
    });
});

app.get("/private", checkJwt, (req, res) => {
    res.json({
        message: "Hello from a PRIVATE API! (For logged-in users only)"
    });
});

app.listen(3001);

console.log("API listening on  " + process.env.REACT_APP_API_URL + "/public")