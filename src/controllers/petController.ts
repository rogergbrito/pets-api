import { Request, Response } from 'express';
import { PetModel } from '../models/Pet';
import { PetInterface } from '../interfaces/pet-interface';
import { client } from '../app';

const petController = {
  create: async (req: Request, res: Response) => {
    try {
      const pet: PetInterface = {
        name: req.body.name,
        race: req.body.race,
        vaccinated: req.body.vaccinated,
        lastVaccineDate: req.body.lastVaccineDate,
        image: req.body.image,
        description: req.body.description,
        tag: req.body.tag,
        vaccines: req.body.vaccines,
      };

      await client.del('getAllPets');
      const response = await PetModel.create(pet);

      return res
        .status(201)
        .json({ response, msg: 'Pet cadastrado com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const petsFromCache = await client.get('getAllPets');

      if (petsFromCache) {
        return res.status(200).json(JSON.parse(petsFromCache));
      }

      const pets = await PetModel.find({}, 'name race vaccinated image tag');
      await client.set('getAllPets', JSON.stringify(pets), { EX: 60 });
      return res.status(200).json(pets);
    } catch (error) {
      console.log(error);
    }
  },

  get: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const petByIdFromCache = await client.get(`pet-${id}`);

      if (petByIdFromCache) {
        return res.status(200).json(JSON.parse(petByIdFromCache));
      }

      const pet = await PetModel.findById(id);

      if (!pet) {
        res.status(404).json({ msg: 'Pet não encontrado.' });
        return;
      }

      await client.set(`pet-${id}`, JSON.stringify(pet), { EX: 60 });

      return res.status(200).json(pet);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const pet = await PetModel.findById(id);

      if (!pet) {
        return res.status(404).json({ msg: 'Pet não encontrado.' });
      }

      await client.del('getAllPets');
      const deletePet = await PetModel.findByIdAndDelete(id);

      return res
        .status(200)
        .json({ deletePet, msg: 'Pet excluído com sucesso.' });
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req: Request, res: Response) => {
    const id = req.params.id;

    const pet: PetInterface = {
      name: req.body.name,
      race: req.body.race,
      vaccinated: req.body.vaccinated,
      lastVaccineDate: req.body.lastVaccineDate,
      image: req.body.image,
      description: req.body.description,
      tag: req.body.tag,
      vaccines: req.body.vaccines,
    };

    await client.del('getAllPets');
    const updatePet = await PetModel.findByIdAndUpdate(id, pet);

    if (!updatePet) {
      return res.status(404).json({ msg: 'Pet não encontrado.' });
    }

    return res
      .status(200)
      .json({ pet: updatePet, msg: 'Pet atualizado com sucesso.' });
  },
};

export default petController;
