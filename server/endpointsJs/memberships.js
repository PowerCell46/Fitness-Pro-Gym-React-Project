const memberships = {
    "Single Workout": {

    },
    "Weekly Membership": {

    },
    "Monthly Membership": {

    },
    "Three Months Membership": {

    },
    "Six Months Membership": {

    },
    "Year Membership": {
        
    }
}

async function membershipsHandler(req, res) {
    const membershipType = req.params.type;
    const membershipCategory = req.params.category;
    console.log(membershipType, membershipCategory);
    console.log(req.body);
} 


module.exports = membershipsHandler;