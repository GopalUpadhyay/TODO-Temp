module.exports.getDate = getdate;
function getdate() {

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' };
    var today = new Date();

    var day = today.toLocaleDateString("en-US", options);

    return day;
};

// ("module.exports" & "exports") Does the Same thing
exports.getDay = getday;
function getday() {
    var options = { weekday: 'long' };
    var today = new Date();

    var day = today.toLocaleDateString("en-US", options);

    return day;
};

// Returning the Arrow Function.
// '.getmonth' is the object/name to acces this function in other Files;
exports.getmonth = () => {
    let options = { month: 'long' };
    let today = new Date();

    return today.toLocaleDateString('en-US', options);
}