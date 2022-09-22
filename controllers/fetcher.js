const imdb = require('../fetchers/imdb');

const fetchers = ()=>{
    return {
        async searchmovie(req,res){
            const data = await imdb().getinfo_by_word(req.params.mvname);
            res.json(data)
        },

        async searchmanyitem(req,res){
            const data = await imdb().getmanyinfo_by_word(req.params.mvname);
            res.json(data)
        }
        ,
        async getinfo_by_imdbid(req,res){
            const data = await imdb().getinfo_by_id(req.params.mvname);
            res.json(data)
        }
    }
}

module.exports = fetchers;