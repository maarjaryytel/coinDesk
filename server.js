const express = require('express');
const axios = require('axios');
const app = express();

app.get('/bitcoinRates', (req, res)=>{
    let url = "https://api.coindesk.com/v1/bpi/currentprice/eur.json";

     //nyyd tahaks serverisse seda json obj tommata
    //axiost kasutan selleks tombamiseks, seal sees on get meetod
    //axios tahab ainult seda geti siin
    //urlist saame andmed
    axios.get(url)
    //meetod hakkab ootama kuni saab vastuse katte
    //siis kui ta saab vastuse siis ta kuvab need andmed
    .then(function(response) {
        let rate = response.data.bpi.EUR.rate;
        let code = response.data.bpi.EUR.code;
        let disclaimer = response.data.disclaimer;
        //algselt on lihtsalt data, tapsemate andmete
        //bpi tuleb json objektist
        //console.log(response.data.bpi.EUR.rate);
        //kuvame brauseris
        res.write(`<p>${rate} ${code} </p>`);
        res.write(`<p>${disclaimer}</p>`);
        res.send();

    })
    //vaatame kas tuleb vigu
    .catch(function(error){
        console.log(error);
    });
    

})
app.listen(3000, function () {
    console.log("server is running on port 3000.")

});