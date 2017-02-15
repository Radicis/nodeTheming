module.exports = {

    secret: 'robotmonkeylaserexplosion',
    database: 'mongodb://localhost/tate',
    port :  process.env.PORT || 3030, // used to create, sign, and verify tokens

    collectionName: "artworks",

    displaySchema: {
        "movie": {
            brand: {
                title: "IMDB",
                url: "/img/logo_imdb.png"
            },
            collection: 'movies',
            title: "Title",
            thumbnail: "Poster",
            url: "Poster",
            date: "Released",
            fullSize: "Poster",
            field1: {
                ref: "imdbRating",
                label: "Rating"
            },
            field2: {
                ref: "Runtime",
                label: "Runtime"
            }
        }
    }
};
