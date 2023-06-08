"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vacina_1 = require("../models/Vacina"); // Assuming the Vacina model is defined in a separate file
const vacinaController = {
    create: async (req, res) => {
        try {
            const vacina = {
                name: req.body.name,
                vaccineDate: req.body.vaccineDate
            };
            const response = await Vacina_1.Vacina.create(vacina);
            res.status(201).json({ response, msg: "Vacina cadastrada com sucesso!" });
        }
        catch (error) {
            console.log(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const vacinas = await Vacina_1.Vacina.find();
            res.json(vacinas);
        }
        catch (error) {
            console.log(error);
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const vacina = await Vacina_1.Vacina.findById(id);
            if (!vacina) {
                res.status(404).json({ msg: "Vacina não encontrada." });
                return;
            }
            res.json(vacina);
        }
        catch (error) {
            console.log(error);
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const vacina = await Vacina_1.Vacina.findById(id);
            if (!vacina) {
                res.status(404).json({ msg: "Vacina não encontrada." });
                return;
            }
            const deleteVacina = await Vacina_1.Vacina.findByIdAndDelete(id);
            res.status(200).json({ deleteVacina, msg: "Vacina excluída com sucesso." });
        }
        catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        const id = req.params.id;
        const vacina = {
            name: req.body.name,
            vaccineDate: req.body.vaccineDate
        };
        const updateVacina = await Vacina_1.Vacina.findByIdAndUpdate(id, vacina);
        if (!updateVacina) {
            res.status(404).json({ msg: "Vacina não encontrada." });
            return;
        }
        res.status(200).json({ vacina: updateVacina, msg: "Vacina atualizada com sucesso." });
    },
};
exports.default = vacinaController;
