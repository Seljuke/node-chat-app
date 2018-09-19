const moment = require("moment");

var generateMessage = (from, text) => {
    let date = moment();
    return {
        from,
        text,
        createdAt: date.format("HH:mm")
    }
};

var generateLocationMessage = (from, lat, long) => {
    let date = moment();
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${long}`,
        createdAt: date.format("HH:mm")
    }
};

module.exports = {generateMessage, generateLocationMessage};