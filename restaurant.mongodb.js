// Select the database to use.
use('restaurantDB');

// Insert a few documents into the sales collection.
db.getCollection('restaurants').insertMany([
    {  _id: "24_chicken",
        name: "24 Chicken",
        logo: {
            type: String,
            default: '/public/assets/restaurant-icons/24-chicken.png'   
            },
        location: "blabla",
        socialMedia: "blabla",
        address: "blabla",
        phoneNumber: "blabla",
        recommendedCount: 0,
        notRecommendedCount: 0, 
    },
]);
