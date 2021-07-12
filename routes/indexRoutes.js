var express=require("express");
var router=express.Router();
var request=require("request");
const API_KEY="5HGSXPlZk81pg89f41Vxz2zqxIJio_itzlOJnPoWfp5nljOgX8V5UTbuNXsUPR2rHlN7EIuQM7wbCcIegkeW_6PyB_uRNU-cI1M8yAdIa8aZVf9TJC3-kYzzdshSX3Yx";

router.get("/",function (req,res) {
    res.render("home");
});
router.get("/search",function (req,res) {
    const SEARCH_URL="https://api.yelp.com/v3/businesses/search?";
    var term=req.query.query;
    var lat=req.query.lat;
    var lon=req.query.lon;
    var city=req.query.city;
    if(lat=="NA" || lon=="NA" ) {
       // res.send("LOCATION SERVICE NOT AVAILABLE ON DEVICE");
        request({url: "https://api.opencagedata.com/geocode/v1/json?q="+city+"&key=5b531763bd8e424188c2d73885bf878a "}, function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                const parsedData=JSON.parse(body);
                if(parsedData.results){
                    if(parsedData.results[0]){
                        lat=parsedData.results[0].bounds.northeast.lat;
                        lon=parsedData.results[0].bounds.northeast.lng;
                        console.log(lat+" + "+lon);

                        var option = {
                            url: SEARCH_URL + "term=" + term + "&latitude=" + lat + "&longitude=" + lon + "&limit=50",
                            headers: {
                                "authorization": "bearer " + API_KEY
                            }
                        };
                        request(option, function (err, response, body) {
                            if (err) {
                                console.log(err);
                            } else {
                                //res.send(JSON.parse(body));

                                res.render("restaurents", {restaurents: JSON.parse(body).businesses});
                            }
                        });
                    }
                    else {
                        res.send("CANNOT FIND LAT/LON FOR THE CITY YOU SEARCHED FOR");
                    }
                }
                else {
                    res.send("CANNOT FIND LAT/LON FOR THE CITY YOU SEARCHED FOR");
                }
            }
        });
    }
  else{
    var option = {
        url: SEARCH_URL + "term=" + term + "&latitude=" + lat + "&longitude=" + lon + "&limit=50",
        headers: {
            "authorization": "bearer " + API_KEY
        }
    };
    request(option, function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            //res.send(JSON.parse(body));

            res.render("restaurents", {restaurents: JSON.parse(body).businesses});
        }
    });
        }
});


module.exports=router;
