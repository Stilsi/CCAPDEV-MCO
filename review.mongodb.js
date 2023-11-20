// Select the database to use.
use('restaurantDB');

// Insert a few documents into the sales collection.
db.getCollection('reviews').insertMany([
    {   username: "/assets/user-icon.jpg",
        username: "hello",
        restaurant: "24_chicken",
        title: "Okay",
        comment: "testing",
        recommendation: "recommended",
        helpfulCount: 0,
        unhelpfulCount: 0,
    }
]);
