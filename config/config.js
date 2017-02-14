module.exports = {

    secret: 'robotmonkeylaserexplosion',
    database: 'mongodb://localhost/tate',
    port :  process.env.PORT || 3030, // used to create, sign, and verify tokens

    imdb_key: '1635b361-a6e4-46e2-83d3-0a9b3971e33c',

    displaySchema: {
        "artwork": {
            brand: {
                title: "Tate Gallery",
                url: "/img/logo.png"
            },
            collection: 'artworks',
            title: "title",
            thumbnail: "thumbnailUrl",
            url: "url",
            date: "dateText",
            fullSize: "thumbnailUrl",
            field1: {
                ref: "all_artists",
                title: "Artist"
            },
            field2: {
                ref: "medium",
                title: "Medium"
            }
        },

        "movie": {
            brand: {
                title: "Tate Gallery",
                url: "/img/logo_imdb.png"
            },
            collection: 'movies',
            title: "Title",
            thumbnail: "Poster",
            url: "Poster",
            date: "Released",
            fullSize: "Poster",
            field1:{
                ref: "imdbRating",
                title: "Rating"
            },
            field2: {
                ref: "Runtime",
                title: "Runtime"
            }
        },

        "imdb": {
            brand: {
                title: "Tate Gallery",
                url: "/img/logo_imdb.png"
            },
            collection: '',
            title: "title",
            thumbnail: "image",
            url: "image",
            released: "Released",
            fullSize: "image",
            field1:{
                ref: "description",
                title: "Description"
            },
            field2: {
                ref: "review",
                title: "Review"
            }
        }
    },


    global: {
        title: "Tate Gallery",
        topNav: {
            brand: {
                title: "Tate Gallery",
                url: "/img/logo.png"
            },
            menuItems: [
                {
                    title: "Home",
                    url: '/'
                },
                {
                    title: "Artwork",
                    url: '/artwork'
                },
                {
                    title: "Artists",
                    url: '/artists'
                },
                {
                    title: "About",
                    url: '/about'
                }
            ]
        },

        footer:{
            modules:[

            ],
            copyright:'Design &copy;Adam Lloyd 2017. All content &copy; <a href="https://github.com/tategallery/collection#usage" target="_blank">Tate Gallery</a>'
        }
    },

    homepage: {
        mainContent: {
            hero: {},
            modules: []
        }
    },

    artworks: {
        mainContent: {
            modules: [
                {
                    title: 'Artwork',
                    collection: []
                }
            ]
        }
    }
};
