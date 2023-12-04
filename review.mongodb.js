// Select the database to use.
use('restaurantDB');

// Insert a few documents into the sales collection.
db.getCollection('reviews').insertMany([
    {   username: "/assets/user-icon5.jpg",
        username: "jennaissante",
        restaurant: "24_chicken",
        title: "SLAYED",
        comment: "SARAP NG CHICKEN NILA",
        recommendation: "recommended",
        helpfulCount: 0,
        unhelpfulCount: 0,
    }
]);
