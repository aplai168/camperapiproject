var moment = require('moment');


//seperating the API route from the main route
module.exports = function(app) {
    
    app.get('/:query', function(req, res) {
        var date = req.params.query;
        var unix = null;
        var natural = null;
        
        //check for initial unix time
        if (+date >= 0) {
            unix = +date;
            natural = unixToNat(unix);
        }
        
        //check for initial natural time
        if(isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()) {
            unix = +natToUnix(date);
            natural = unixToNat(unix)
        }
        
        var dateObj = { "unix": unix, "natural":natural };
        res.send(dateObj);
     
    });
    
    //define functions
    var natToUnix = function(date) {
        // Convert from natural date to unix timestamp
        return moment(date, "MMMM D, YYYY").format("X");
    };

    var unixToNat = function(unix) {
        return moment.unix(unix).format("MMMM D, YYYY");
    };
    
    
    
    
}