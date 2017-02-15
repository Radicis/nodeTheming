module.exports = {

    secret: 'robotmonkeylaserexplosion',
    database: 'mongodb://localhost/tate',
    port: process.env.PORT || 3030, // used to create, sign, and verify tokens

    collectionName: "artworks"


};
