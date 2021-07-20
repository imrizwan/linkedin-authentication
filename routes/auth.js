const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const passport = require('passport');
const fetch = require("node-fetch");
const axios = require('axios');
const { first } = require('lodash')
router.post("/signin", passport.authenticate('linkedin'));
router.post(
    "/me",
    asyncHandler(async function (req, res) {
        try {
            const { authToken } = req.body;
            let requestOptions = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            };

            let me = await fetch(`https://api.linkedin.com/v2/me`, requestOptions)
            me = await me.json();
            let imgPromise = await fetch(`https://api.linkedin.com/v2/me?projection=(${me.id},profilePicture(displayImage~digitalmediaAsset:playableStreams))&oauth2_access_token=${authToken}`, { method: "GET" })
            let image = await imgPromise.json();
            let fullName = `${me?.firstName?.localized?.en_US} ${me?.lastName?.localized?.en_US}`
            let profilePicture = ""

            if (image?.profilePicture) {
                if (image?.profilePicture['displayImage~']) {
                    if (image?.profilePicture['displayImage~']?.elements[0]?.identifiers[0]?.identifier) {
                        profilePicture = image?.profilePicture['displayImage~']?.elements[0]?.identifiers[0]?.identifier
                    }
                }
            } else if (image?.status !== 200) {
                return res.status(500).json(image?.message ?? "API FAILED")
            }
            return res.json({ fullName, profilePicture })
        } catch (err) {
            console.log(err)
            return res.status(500).json("API failed")
        }

    }));
router.post(
    "/checkCode",
    asyncHandler(async function (req, res) {
        const { code } = req.body;
        const clientId = process.env.LINKEDIN_API_KEY;
        const clientSecret = process.env.LINKEDIN_SECRET_KEY;
        const redirectUri = process.env.REDIRECT_URI;
        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "authorization_code");
        urlencoded.append("client_id", clientId);
        urlencoded.append("client_secret", clientSecret);
        urlencoded.append("code", code);
        urlencoded.append("redirect_uri", redirectUri);
        var requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: urlencoded,
            redirect: 'follow'
        };
        fetch(`https://www.linkedin.com/oauth/v2/accessToken`, requestOptions)
            .then(response => response.json())
            .then(async data => {
                return res.json(data)
            })
            .catch((error) => {
                console.error('Error:', error);
                return res.status(500).json("Authorization failed")
            });
    }));

module.exports = router;