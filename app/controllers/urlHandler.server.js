var URLrefs = require('../models/urls.js');

module.exports = {
    shorten: function(url, callback) {
        console.log("got to the shorten function");
        var numURLs=0;
        var uParse=url.split(".");
        var validURL=true;
        if (uParse.length<3){
            validURL=false;
        }
        if (uParse[0]==="http://www" || uParse[0]==="https://www"){
            //valid
        } else {
            validURL=false;
        }
        if (validURL){
            //{"original_url":"https://www.google.com","short_url":"https://shurli.herokuapp.com/5"}
            URLrefs
                .count(function (err, result) {
                    if (err){
                       throw err;
                    } else {
                        numURLs=result;
                        numURLs++;
                        console.log("number of URLs is " + numURLs);
                        var newURLref = new URLrefs({ "url_num": numURLs, "original_url": url, "short_url": "https://short-url-raqgekas.c9users.io/"+numURLs });
                        var passBack = "{\"original_url\":\"" + url + "\",\"short_url\":\"https://short-url-raqgekas.c9users.io/"+numURLs +"\"}";
                        newURLref.save(function (err, status) {
                            if (err){
                                throw err;
                            } else {
                                console.log ('URL added to database');
                                console.log(newURLref);
                                callback(null,passBack);
                            }
                            console.log("Trying to return: " + newURLref._id);
                        });
                    }
                });
        } else {
            var rejectBack="{\"original_url\":\"error\",\"short_url\":\"https://short-url-raqgekas.c9users.io/error\"}";
            callback(null,rejectBack);
        }
    },

    convert: function(urlNum,callback) {
        //original url
        console.log(urlNum);
        URLrefs.find({ url_num: parseInt(urlNum) }, function(err, ref){
           if (err){
               console.log(err);
           } else {
               console.log("found the url: " + ref);
               var passBack=ref[0].original_url;
               console.log(passBack);
               callback(null,passBack);
           }
        });
    }
};