// Select the database to use.
use('restaurantDB');

// Insert a few documents into the sales collection.
db.getCollection('users').insertMany([
    {   username: "jennierubyjane",
        password: "1234",
        profilePicture: '/assets/user-icon.jpg',
        description: "i love food so much u have no idea",
        fullName: "Jennie Ruby Jane",
        membershipDate: "February 2020",
        location: "Manila City, PH",
        descriptionTitle: "Passionate Food Lover and Critic"
    }
]);
