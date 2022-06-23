import * as yup from "yup";

export const serializeAppointmentSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  anamnesis: yup.string().default(null).optional(),
  action: yup.string().default(null).optional(),
  queryMhRisk: yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      depression: yup.string().required(),
      selfAggression: yup.bool().required(),
      insomnia: yup.bool().required(),
      drugs: yup.bool().required(),
      mourning: yup.bool().required(),
      familySupport: yup.bool().required(),
      resultMhRisk: yup.object().shape({
        risk: yup.string().required(),
        procedure: yup.string().required(),
      }),
    })
    .required(),
});
