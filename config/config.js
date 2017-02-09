module.exports = {

    'secret': 'robotmonkeylaserexplosion',
    'database': 'mongodb://localhost/tate',
    'port' :  process.env.PORT || 3030, // used to create, sign, and verify tokens

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
