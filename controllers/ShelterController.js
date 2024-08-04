const Pet = require('../models/ShelterModel');

const getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find().sort({ type: 1 });
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch pets', error: error.message });
    }
};


const createPet = async (req, res) => {
    const { name, type, description, skills } = req.body;

    if (!name || !type || !description || name.length < 3 || type.length < 3 || description.length < 3) {
        return res.status(400).json({ message: 'Name, type, and description must be at least 3 characters long.' });
    }

    try {
        const pet = new Pet({ name, type, description, skills });
        await pet.save();
        res.status(201).json(pet);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create pet', error: error.message });
    }
};

const getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).json({ message: 'Pet not found' });
        res.status(200).json(pet);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch pet', error: error.message });
    }
};

const updatePet = async (req, res) => {
    const { name, type, description, skills } = req.body;

    if (!name || !type || !description || name.length < 3 || type.length < 3 || description.length < 3) {
        return res.status(400).json({ message: 'Name, type, and description must be at least 3 characters long.' });
    }

    try {
        const pet = await Pet.findByIdAndUpdate(req.params.id, { name, type, description, skills }, { new: true, runValidators: true });
        if (!pet) return res.status(404).json({ message: 'Pet not found' });
        res.status(200).json(pet);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update pet', error: error.message });
    }
};


const deletePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        if (!pet) return res.status(404).json({ message: 'Pet not found' });

        const io = req.app.get('io');
        io.emit('pet_adopted', pet);

        res.status(200).json({ message: 'Pet adopted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete pet', error: error.message });
    }
};

const likePet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).json({ message: 'Pet not found' });

        pet.likes += 1;
        await pet.save();
        res.status(200).json(pet);
    } catch (error) {
        res.status(500).json({ message: 'Failed to like pet', error: error.message });
    }
};

module.exports = {
    getAllPets,
    createPet,
    getPetById,
    updatePet,
    deletePet,
    likePet
};

