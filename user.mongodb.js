// Select the database to use.
use('restaurantDB');

const bcrypt = require('bcrypt');

// Insert a few documents into the sales collection.
db.getCollection('users').insertMany([
    {   username: "24chicken",
    password: "12345",
        profilePicture: '/assets/restaurant-icons/24chicken.png',
        description: "24 Chicken help service center",
        fullName: "24 Chicken - Marielle",
        membershipDate: "February 2020",
        location: "Manila City, PH",
        descriptionTitle: "24 Chicken Admin Center"
    },

    {   username: "atericas",
    password: "12345",
    profilePicture: '/assets/restaurant-icons/atericas.png',
    description: "Ate Rica's help service center",
    fullName: "Ate Rica's - Rica",
    membershipDate: "February 2020",
    location: "Manila City, PH",
    descriptionTitle: "Ate Rica's Admin Center"
},

{   username: "dominospizza",
password: "12345",
profilePicture: '/assets/restaurant-icons/dominos.png',
description: "Domino's help service center",
fullName: "Dominos - Ken",
membershipDate: "February 2020",
location: "Manila City, PH",
descriptionTitle: "Domino's Admin Center"
},

{   username: "kantofreestyle",
password: "12345",
profilePicture: '/assets/restaurant-icons/kantofreestyle.png',
description: "Kanto Freestyle help service center",
fullName: "Kanto Freestyle - Alex",
membershipDate: "February 2020",
location: "Manila City, PH",
descriptionTitle: "Kanto Freestyle Admin Center"
},

{   username: "ganggangchicken",
password: "12345",
profilePicture: '/assets/restaurant-icons/ganggangchicken.png',
description: "Gang Gang Chicken help service Center",
fullName: "Gang Gang Chicken- Marielle",
membershipDate: "February 2020",
location: "Manila City, PH",
descriptionTitle: "Gang Gang Chicken Admin Center"
}
]);
