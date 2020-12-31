const listEndpoints = require('express-list-endpoints');

module.exports = (app) => {
    const routes = [
        {file: './users.js'},
        {file: './login.js'},
        {file: './gender.js'},
        {file: './movie.js'},
        {file: './cinema.js'},
        {file: './movieLobby.js'},
    ]

    for(let route of routes) {
        app.use(
            require(route.file)
        );
    }

    app.get('/listEndPoints', (req, res) => {
        console.log('ListEndPoints', listEndpoints(app));
        res.json(listEndpoints(app));
    });
}