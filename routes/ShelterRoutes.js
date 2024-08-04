const express = require('express');
const shelterController = require('../controllers/ShelterController');
const router = express.Router();

router.post('/', shelterController.createPet);
router.get('/', shelterController.getAllPets);
router.get('/:id', shelterController.getPetById);
router.put('/:id', shelterController.updatePet);
router.delete('/:id', shelterController.deletePet);
router.patch('/:id/like', shelterController.likePet);

module.exports = router;

