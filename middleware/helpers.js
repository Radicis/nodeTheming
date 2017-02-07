module.exports.getFullSizeImage = function(thumbnailUrl){
    if(thumbnailUrl === null || typeof thumbnailUrl === "undefined") {
        return thumbnailUrl.slice(0, -5) + "10.jpg";
    }
};

module.exports.truncate = function(string, value){
    console.log("got: " + string + " and value: " + value);
    if(string != null && typeof string != "undefined") {
        truncated = string.substring(0, value);
        if(string.length>=value) truncated += "...";
        return truncated
    }
};
