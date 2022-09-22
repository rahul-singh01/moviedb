const axios = require('axios');
const cheerio = require('cheerio');

function checkyear(x) {
    cs = x.match(/\d+/g)
    a = ''
    cs.forEach(item => {
        if (item.length == 4) {
            a = item
        }
    })
    const ans = a ? a.trim() : null
    return ans
}

const imdb = () => {
    return {

        async getmanyinfo_by_word(x){
            full_word = x.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /gi, "_").toLowerCase()
            console.log(full_word)
            const api = `https://v2.sg.media-imdb.com/suggestion/${full_word[0]}/${full_word}.json`
            const data = await axios({
                method: 'GET',
                url: api
            })
            l = data.data.d
            const temp = []
            for(i=0 ; i<l.length ; i++) {
                const x = new Object;
                x.name  = l[i].l
                x.image = l[i].i.imageUrl
                x.imdb_id = l[i].id
                x.type = l[i].qid
                x.actors = l[i].s
                x.year = l[i].y
                temp.push(x)
            }
            return temp
        },

        async getimage_by_word(x) {
            full_word = x.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /gi, "_").toLowerCase()
            const api = `https://v2.sg.media-imdb.com/suggestion/${full_word[0]}/${full_word}.json`
            const data = await axios({
                method: 'GET',
                url: api,
            })
            const fes = data.data
            screenshot = []
            try {
                const screens = fes.d[0].v
                for (i = 0; i < screens.length; i++) {
                    screenshot.push(screens[i].i.imageUrl)
                }
            } catch (err) {
                screenshot = null
            }

            return {
                image: fes.d[0].i.imageUrl,
                screenshot
            }
        },
        async gettitle_by_word(x) {
            full_word = x.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /gi, "_").toLowerCase()
            const api = `https://v2.sg.media-imdb.com/suggestion/${full_word[0]}/${full_word}.json`
            const data = await axios({
                method: 'GET',
                url: api
            })
            const fes = data.data
            return fes.d[0].id
        },

        async get_samllinfo_by_word(x) {
            full_word = x.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /gi, "_").toLowerCase()
            const api = `https://v2.sg.media-imdb.com/suggestion/${full_word[0]}/${full_word}.json`
            const data = await axios({
                method: 'GET',
                url: api
            })
            const fes = data.data.d[0]
            return {
                title: fes.l,
                type: fes.q,
                actors: fes.s,
                release_year: fes.y

            }
        },

        async getinfo_by_word(x) {
            full_word = x.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /gi, "_").toLowerCase()
            console.log(full_word)
            const api = `https://v2.sg.media-imdb.com/suggestion/${full_word[0]}/${full_word}.json`
            const data = await axios({
                method: 'GET',
                url: api
            })
            const fes = data.data.d[0].id
            screenshot = []
            try {
                const screens = data.data.d[0].v
                for (i = 0; i < screens.length; i++) {
                    screenshot.push(screens[i].i.imageUrl)
                }
            } catch (err) {
                screenshot = []
            }
            const data1 = await imdb().getinfo_by_id(fes, {
                "image": data.data.d[0].i.imageUrl,
                screenshot

            })
            return data1

        },

        async getinfo_by_id(id, xe) {
            const data = await axios({
                method: 'GET',
                url: `https://www.imdb.com/title/${id}/`
            })
            const $ = cheerio.load(data.data)
            const image = $('.ipc-media__img > img').attr('src')
            const g = []
            $(".ipc-chip__text").each((index, ele) => {
                g.push($(ele).text().trim())
            })
            genre = g.join(' | ')
            const storyline = $(".ipc-html-content.ipc-html-content--base > div").text().trim()
            const actor_name = []
            const actor_image = []
            $(".title-cast-item__avatar > div > div > img").each((index, ele) => {
                actor_name.push($(ele).attr("alt"))
                actor_image.push($(ele).attr('src'))
            })

            const release_date = $('.sc-f65f65be-0.ktSkVi > ul > li:nth-child(1) > div > ul > li > a').text().trim()
            const run = $('.sc-f65f65be-0.ktSkVi > ul > li:nth-child(1) > div').text().trim()
            const check = $(".sc-7ab21ed2-1.jGRxWM").text().trim()
            const rating = check.length < 3 ? check : check.substring(0, 3)
            const runtime = run.replace(release_date, "")
            const title = $('.sc-94726ce4-1.iNShGo > h1').text().trim()
            const release_year = checkyear(release_date)


            actors = {
                actor_name,
                actor_image
            }

            if (xe) {

                return {
                    title,
                    "image": xe.image,
                    "screenshot": xe.screenshot,
                    actors,
                    storyline,
                    genre,
                    release_date,
                    runtime,
                    rating,
                    release_year
                }

            } else {
                return {
                    title,
                    image,
                    actors,
                    storyline,
                    genre,
                    release_date,
                    runtime,
                    rating,
                    release_year
                }
            }


        }
    }
}

// imdb().getinfo_by_word("Good Luck Jerry (2022)").then(response => {
//         console.log(response)
//     })
// imdb().getimage_by_word("the balcony movie").then(response => {
//     console.log(response)
// })


module.exports = imdb