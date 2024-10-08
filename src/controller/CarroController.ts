import { Request, Response} from "express";
import { Carro} from "../model/Carro";

class CarroController extends Carro{
    
    static async todos(req: Request, res: Response){
        try{
            const listaDeCarros = await Carro.listarCarros();

            res.status(200).json(listaDeCarros);

        } catch (error) {
            console.log('erro ao acessar método herdado: ${error}');

            res.status(400).json('erro ao recupera as informações de pessoas.')

        }
        
    }
}

export default CarroController;