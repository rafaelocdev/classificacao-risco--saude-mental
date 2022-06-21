import { Request } from "express"
import { validate } from "uuid"
import { AssertsShape } from "yup/lib/object"
import { Client, QueryMhRisk, ResultMhRisk } from "../entities"
import { ErrorHandler } from "../errors/errors"
import { clientRepo, queryMhRiskRepo, resultMhRiskRepo } from "../repositories"
import { serializedQueryMhRiskSchema } from "../schemas"

export class nurseService {

    createQueryMhRisk = async ({validated, params, decoded}: Request): Promise<AssertsShape<any>> =>{
        console.log(validated)

        if(!params.id){
            throw new ErrorHandler(400, "Client id is required")
        }
        
        const newQuery = new QueryMhRisk();

        newQuery.depression = (validated as QueryMhRisk).depression;
        newQuery.client = await clientRepo.findOneBy({id: params.id});
        newQuery.drugs = (validated as QueryMhRisk).drugs;
        newQuery.evaluationDate = new Date();
        newQuery.familySupport = (validated as QueryMhRisk).familySupport;
        newQuery.insomnia = (validated as QueryMhRisk).insomnia;
        newQuery.mourning = (validated as QueryMhRisk).mourning;
        newQuery.selfAggression = (validated as QueryMhRisk).selfAggression;
        newQuery.nurse = decoded.id

        if((validated as QueryMhRisk).depression == "1" && (validated as QueryMhRisk).selfAggression){
            console.log("Grave")
            newQuery.resultMhRisk = await resultMhRiskRepo.findOneBy({risk: "grave"})
        }

        if((validated as QueryMhRisk).depression == "1" && !(validated as QueryMhRisk).selfAggression){
            console.log("Elevado")
            newQuery.resultMhRisk = await resultMhRiskRepo.findOneBy({risk: "elevado"})
        }

        
        if((validated as QueryMhRisk).depression == "3" &&
            (validated as QueryMhRisk).insomnia ||
            (validated as QueryMhRisk).drugs ||
            !(validated as QueryMhRisk).familySupport ||
            (validated as QueryMhRisk).mourning){
                console.log("Risco baixo")
                newQuery.resultMhRisk = await resultMhRiskRepo.findOneBy({risk: "baixo"})
            }


        if((validated as QueryMhRisk).depression == "2"){
            console.log("Moderado")
            newQuery.resultMhRisk = await resultMhRiskRepo.findOneBy({risk: "moderado"})

        }

        if((validated as QueryMhRisk).depression == "3" &&
            !(validated as QueryMhRisk).insomnia &&
            !(validated as QueryMhRisk).drugs &&
            (validated as QueryMhRisk).familySupport &&
            !(validated as QueryMhRisk).mourning){
                console.log("Situação Inespecífica")
                newQuery.resultMhRisk = await resultMhRiskRepo.findOneBy({risk: "inespecífico"})
                
        }

         await queryMhRiskRepo.save(newQuery);

         console.log(newQuery)


        return serializedQueryMhRiskSchema.validate(newQuery,{stripUnknown:true});

    }
}

export default new nurseService();
