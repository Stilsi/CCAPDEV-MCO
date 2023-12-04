// Select the database to use.
use('restaurantDB');

// Insert a few documents into the sales collection.
db.getCollection('users').insertMany([
    {   username: "jennie",
        password: "12345",
        profilePicture: '/assets/user-icon.jpg',
        description: "My culinary journey knows no bounds, always seeking new flavors!",
        fullName: "Jennie Ruby Jane",
        membershipDate: "May 2021",
        location: "Paris, France",
        descriptionTitle: "Adventurous Food Explorer and Critic"    
        }
]);
