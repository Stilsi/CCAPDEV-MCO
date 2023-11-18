// Select the database to use.
use('restaurantDB');

// Insert a few documents into the sales collection.
db.getCollection('locations').insertMany([
    {
        _id: "taft",
        name: 'Taft Avenue',
        link: '/location/taft',
        defaultIcon: '/assets/location-icons/loc-2.png',
        hoverIcon: '/assets/location-icons/loc-2-hover.png'
    },
    {
        _id: "agno",
        name: 'Agno Street',
        link: '/location/agno',
        defaultIcon: '/assets/location-icons/loc-1.png',
        hoverIcon: '/assets/location-icons/loc-1-hover.png'
    },
    {
        _id: "leonguinto",
        name: 'Leon Guinto Street',
        link: '/location/leonguinto',
        defaultIcon: '/assets/location-icons/loc-3.png',
        hoverIcon: '/assets/location-icons/loc-3-hover.png'
    }
]);
