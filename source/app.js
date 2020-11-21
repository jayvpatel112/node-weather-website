const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// setup handlerbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Jay'
    })
})

app.get('/about',(req, res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Jay Patel'
    })
})

app.get('/help',(req, res) =>{
    res.render('help',{
        title: 'Help',
        name: 'Jay'
    })
})
// app.get('',(req, res) =>{
//     res.send('<h1>Hello express</h1>')
// })

// app.get('/help',(req, res) =>{
//     res.send({
//         name: 'Jay',
//         age: 19
//     })
// })

// app.get('/about', (req, res) =>{
//     res.send('<h3>express about page</h3>')
// })

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide address term'
        })
    }
 geocode(req.query.address, (error,{latitude, longitude, location} = {}) => { 
        if(error){
            return res.send({error: error})
        }
      weather(latitude, longitude,(error, weatherdata) => { 
            if(error){
                return res.send({error: error})
            }
            return res.send({
                weather: weatherdata,
                location: location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     weather: 'location',
    //     location: 'Palanpur',
    //     address: req.query.address
    // })
})

app.get('/products',(req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404page',{
        title: '404 Help',
        name: 'Jay',
        error: 'Help artical not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404page',{
        title: '404',
        name: 'Jay',
        error: 'Page not found'
    })
})

app.listen(3000,() =>{
    console.log('server is up on port 3000')
})