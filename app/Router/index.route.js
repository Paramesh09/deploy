const apiRoute = require("../Router/first.route")

const init = (server) => {
    
    server.use('/api/v1', apiRoute);
}
console.log("route");

module.exports = {
    init: init
};