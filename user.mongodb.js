// Select the database to use.
use('restaurantDB');

const bcrypt = require('bcrypt');

// Insert a few documents into the sales collection.
db.getCollection('users').insertMany([
    {   username: "jennaissante",
        password: "1234ABCD",
        profilePicture: '/assets/user-icon.jpg',
        description: "My culinary journey knows no bounds, always seeking new flavors!",
        fullName: "Jane Jenna Santé",
        membershipDate: "May 2021",
        location: "Paris, France",
        descriptionTitle: "Adventurous Food Explorer and Critic"    
        }
]);
