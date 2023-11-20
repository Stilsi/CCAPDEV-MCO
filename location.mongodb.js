// Select the database to use.
use('restaurantDB');

// Insert a few documents into the sales collection.
db.getCollection('locations').insertMany([
    {
        _id: "taft",
        name: 'Taft Avenue',
        link: '/location/taft',
        defaultIcon: '/assets/location-icons/loc-2.png',
        hoverIcon: '/assets/location-icons/loc-2-hover.png',
        restaurants: [
            "24_chicken",
            "dominos_pizza",
            "ganggang_chicken"
        ]
    },
    {
        _id: "agno",
        name: 'Agno Street',
        link: '/location/agno',
        defaultIcon: '/assets/location-icons/loc-1.png',
        hoverIcon: '/assets/location-icons/loc-1-hover.png',
        restaurants: [
            "ate_rica"
        ]
    },
    {
        _id: "leonguinto",
        name: 'Leon Guinto Street',
        link: '/location/leonguinto',
        defaultIcon: '/assets/location-icons/loc-3.png',
        hoverIcon: '/assets/location-icons/loc-3-hover.png',
        restaurants: [
            "kanto_freestyle"
        ]
    }
]);