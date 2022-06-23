import * as yup from "yup";

const createQueryMhRiskSchema = yup.object().shape({
    depression: yup.number().required(),
    selfAggression: yup.bool().required(),
    insomnia: yup.bool().required(),
    drugs: yup.bool().required(),
    mourning: yup.bool().required(),
    familySupport: yup.bool().required(),
})

const serializedQueryMhRiskSchema = yup.object().shape({
    id: yup.string().required(),
    client: yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required()
    }).required(),
    depression: yup.number().required(),
    selfAggression: yup.bool().required(),
    insomnia: yup.bool().required(),
    drugs: yup.bool().required(),
    mourning: yup.bool().required(),
    familySupport: yup.bool().required(),
    evaluationDate: yup.date().required(),
    resultMhRisk: yup.object().shape({
        risk: yup.string().required(),
        procedure: yup.string().required()
    })
})

export {createQueryMhRiskSchema, serializedQueryMhRiskSchema};