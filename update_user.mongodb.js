// Select the database to use.
use('restaurantDB');

// Update the document with username "@jennierubyjane" and add more information
db.getCollection('users').updateOne(
    { username: "@jennierubyjane" },
    {
        $set: {
            fullName: "Jennie Ruby Jane",
            membershipDate: "February 2020",
            location: "Manila City, PH",
            descriptionTitle: "Passionate Food Lover and Critic"
        }
    }
);