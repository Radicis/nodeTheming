module.exports = {

    secret: 'robotmonkeylaserexplosion',
    database: 'mongodb://localhost/tate',
    port: process.env.PORT || 3030, // used to create, sign, and verify tokens
    baseUrl: "http://localhost:3030",

    // Simulated config variables
    itemCount: 24,
    collectionName: 'artworks',
    displayCollectionTitle : true,
    displayMetaDataOnLightBox: true,
    displayFilterCheckboxes: true,
    displayFilterButtons: true
};
