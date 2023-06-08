"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pet_1 = require("../models/Pet"); // Assuming the Pet model is defined in a separate file
const petController = {
    create: async (req, res) => {
        try {
            const pet = {
                name: req.body.name,
                race: req.body.race,
                vaccinated: req.body.vaccinated,
                lastVaccineDate: req.body.lastVaccineDate,
                image: req.body.image,
                description: req.body.description,
                tag: req.body.tag,
                vaccines: req.body.vaccines
            };
            const response = await Pet_1.PetModel.create(pet);
            res.status(201).json({ response, msg: "Pet cadastrado com sucesso!" });
        }
        catch (error) {
            console.log(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const pets = await Pet_1.PetModel.find({}, 'name race vaccinated image tag');
            res.json(pets);
        }
        catch (error) {
            console.log(error);
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const pet = await Pet_1.PetModel.findById(id);
            if (!pet) {
                res.status(404).json({ msg: "Pet não encontrado." });
                return;
            }
            res.json(pet);
        }
        catch (error) {
            console.log(error);
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const pet = await Pet_1.PetModel.findById(id);
            if (!pet) {
                res.status(404).json({ msg: "Pet não encontrado." });
                return;
            }
            const deletePet = await Pet_1.PetModel.findByIdAndDelete(id);
            res.status(200).json({ deletePet, msg: "Pet excluído com sucesso." });
        }
        catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        const id = req.params.id;
        const pet = {
            name: req.body.name,
            race: req.body.race,
            vaccinated: req.body.vaccinated,
            lastVaccineDate: req.body.lastVaccineDate,
            image: req.body.image,
            description: req.body.description,
            tag: req.body.tag,
            vaccines: req.body.vaccines
        };
        const updatePet = await Pet_1.PetModel.findByIdAndUpdate(id, pet);
        if (!updatePet) {
            res.status(404).json({ msg: "Pet não encontrado." });
            return;
        }
        res.status(200).json({ pet: updatePet, msg: "Pet atualizado com sucesso." });
    }
};
exports.default = petController;
