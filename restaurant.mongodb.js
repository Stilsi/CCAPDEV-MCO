// Select the database to use.
use('restaurantDB');

// Insert a few documents into the sales collection.
db.getCollection('restaurants').insertMany([
    {  _id: "24_chicken_v2",
        name: "24 Chicken V2",
        logo: {
            type: String,
            default: '/assets/restaurant-icons/24chicken.png'   
            },
        location: "Taft Avenue",
        description: "blabla",
        socialMedia: "blabla",
        phoneNumber: "blabla",
        recommendedCount: 30,
        notRecommendedCount: 23, 
    },
]);
