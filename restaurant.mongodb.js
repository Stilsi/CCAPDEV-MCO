// Select the database to use.
use('restaurantDB');

// Insert a few documents into the sales collection.
db.getCollection('restaurants').insertMany([
    {  _id: "ashdiasd",
        name: "asdasd",
        logo: {
            type: String,
            default: '/public/assets/restaurant-icons/atericas.png'   
            },
        location: "asds",
        socialMedia: "asds",
        phoneNumber: "asds",
        recommendedCount: 0,
        notRecommendedCount: 0, 
    },
]);
