import * as yup from "yup";

const finishAppointmentSchema = yup.object().shape({
  anamnesis: yup.string().required(),
  action: yup.string().required(),
});

const serializedFinishedAppointmentSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  client: yup.string().required(),
  subscription: yup.string().required(),
  appointment: yup.object().shape({
    id: yup.string().uuid().required(),
    anamnesis: yup.string().required(),
    action: yup.string().required(),
    doctor: yup.object().shape({
      id: yup.string().uuid().required(),
      name: yup.string().required(),
      specialty: yup.string().required(),
    }),
    query_mh_risk: yup.object().shape({
      id: yup.string().uuid().required(),
      depression: yup.string().required(),
      self_aggression: yup.boolean().required(),
      insomnia: yup.boolean().required(),
      drugs: yup.boolean().required(),
      mourning: yup.boolean().required(),
      family_support: yup.boolean().required(),
      evaluation_date: yup.string().required(),
      result_mh_risk: yup.string().required(),
    }),
  }),
});

export { finishAppointmentSchema, serializedFinishedAppointmentSchema };
