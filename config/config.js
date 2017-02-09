module.exports = {

    'secret': 'robotmonkeylaserexplosion',
    'database': 'mongodb://localhost/tate',
    'port' :  process.env.PORT || 3030, // used to create, sign, and verify tokens

    context: {

        brand: '/img/logo.png',

        topNav: {
            brand: {
                title: "Tate Gallery",
                imgUrl: ""
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
        mainContent: {
            homepage: {},
            modules:[ ]
        },
        footer:{
            modules:[

            ],
            copyright:'Design &copy;Adam Lloyd 2017 all content &copy; <a href="https://github.com/tategallery/collection#usage" target="_blank">Tate Gallery</a>'
        }
    }
};
