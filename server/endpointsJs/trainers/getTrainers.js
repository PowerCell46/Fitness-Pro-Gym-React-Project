const fs = require("fs");
const Trainer = require("../../schemas/trainerSchema");


async function getTrainersHandler(req, res) {
    try {
        var data = await Trainer.find().sort({ uploadDate: 'desc' }).lean();

    } catch {
        return res.status(400).json({ error: 'An error occured while the data was being read from the Database!' });
    }

    const trainersWithImages = await Promise.all(data.map(async (trainer) => {
        const trainerData = fs.promises.readFile(`${trainer.imageLocation}`, { encoding: 'base64' });
        return { ...trainer, photo: await trainerData };
    }));

    res.json(trainersWithImages);
}


module.exports = getTrainersHandler;