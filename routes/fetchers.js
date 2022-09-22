const app = require('express').Router()

const Controller_fetcher = require('../controllers/fetcher')

app.get('/fetcher/imdb/getmovie_detail_bywords/:mvname' , Controller_fetcher().searchmovie)
app.get('/fetcher/imdb/searchmany_bywords/:mvname' , Controller_fetcher().searchmanyitem)
app.get('/fetcher/imdb/getinfo_by_imdbid/:mvname'  , Controller_fetcher().getinfo_by_imdbid)

module.exports = app;