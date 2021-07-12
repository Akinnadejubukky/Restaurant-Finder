var express = require("express");
var router = express.Router();
var request = require("request");

const API_KEY = "5HGSXPlZk81pg89f41Vxz2zqxIJio_itzlOJnPoWfp5nljOgX8V5UTbuNXsUPR2rHlN7EIuQM7wbCcIegkeW_6PyB_uRNU-cI1M8yAdIa8aZVf9TJC3-kYzzdshSX3Yx";

router.get("/view/:id", function (req, res) {
    var searchURL = "https://api.yelp.com/v3/businesses/" + req.params.id;
    var option = {
        url: searchURL,
        headers: {
            "authorization": "bearer " + API_KEY
        }
    };

    var reviews = "helo"; //stores reviews for the restaurant
    request({
    
        url: "https://api.yelp.com/v3/businesses/" + req.params.id + "/reviews",
        headers: {"authorization": "bearer " + API_KEY}
    }, function (err, response, body) {
        if (err)
            console.log(err);
        else
            reviews = JSON.parse(body);

    });
    request(option, function (err, response, body) {
        if (err)
            console.log(err);
        else {

            var parsedBody = JSON.parse(body);
            //console.log(JSON.parse(body.hours[0].open));
            if (parsedBody.hours && parsedBody.hours[0] && parsedBody.hours[0].open) {
                res.render("view", {
                    restro: parsedBody,
                    restroReviews: reviews,
                    restroTime: getRestroTime(parsedBody.hours[0].open)
                });
            } else {

                var na = []; //empty array
                var obj = {"start": "NA", "end": "NA"}; //sample obj
                for (var i = 0; i < 7; i++) // 7 times insertion of object in array
                    na.push(obj);
                res.render("view", {restro: parsedBody, restroReviews: reviews, restroTime: na});
            }
        }
    });

});

function getRestroTime(time) {
    /* STORES DATA IN ARRAY IN FORM OF OBJECTS
    * [ { "start" : "11:30 A.M","end" : "8:30 P.M"}];
    * */
    var formattedTime = [];
    time.forEach(function (currentTime) {
        var shh = currentTime.start[0] + currentTime.start[1];
        var smm = currentTime.start[2] + currentTime.start[3];
        var ehh = currentTime.end[0] + currentTime.end[1];
        var emm = currentTime.start[2] + currentTime.start[3];
        var smeridian = "A.M";
        var emeridian = "A.M";

        if (shh >= 12) {
            smeridian = "P.M";
            if (shh > 12)
                shh = shh - 12;
        }
        if (ehh >= 12) {
            emeridian = "P.M";
            if (ehh > 12)
                ehh = ehh - 12;
        }
        var newTime = {
            "start": shh + ":" + smm + " " + smeridian,
            "end": ehh + ":" + emm + " " + emeridian,
            "day": currentTime.day
        };
        formattedTime.push(newTime);
    });

    while (formattedTime.length < 7)
        formattedTime.push({"start": "NA", "end": "NA"});


    return formattedTime;
}

module.exports = router;