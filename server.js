const express = require("express")
const app = express()
const axios = require("axios")

//Adding url encoders
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/' , (req,res)=> {
    res.json({
        status : "movieland api working fine"
    })
})

const fetchers = require("./routes/fetchers")
app.use('/api/v1/' , fetchers)

app.get("/search/:mvname/" , async(req,res) =>{
    const mvname = req.params.mvname
    const data = await axios({
        method: "GET",
        url : `http://www.omdbapi.com/?apikey=b6003d8a&s=${mvname.replace(/ /gi , "+")}`
    })
    res.json(data.data)
    
})


// listening to heart
// const hostname = '127.0.0.1';
const port = process.env.PORT || 7900;


const listener = app.listen(port, () => {
    console.log("http://127.0.0.1:" + port);
    // console.log("Your app is listening on port " + listener.address().port);
});
