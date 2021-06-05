const express = require('express');
const steam = express.Router();
const fetch = require('node-fetch');
const postsModel = require('../models/postsModel');
const userModel = require('../models/userModel');
const steamModel = require('../models/steamModel')


// url ' https://api.steampowered.com/ISteamApps/GetAppList/v2/'+'v2/?key=788BB881FB9E4532A765F61E7C1D7847'
steam.get('/', async (req, res) => {
    try {
        const KEY = "788BB881FB9E4532A765F61E7C1D7847";
        const api_res = await fetch(
            `https://api.steampowered.com/ISteamApps/GetAppList/v2/?key=${KEY}`
        );
        response = await api_res.json();
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        console.log('error: ', error);
        return res.status(400).send('error: ' + error.toString());
    }

});
module.exports = steam
