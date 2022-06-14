import * as yup from "yup";

const getAllEmployeesSchema = yup.array().of(
    yup.object().shape({
        id: yup.string(),
        name: yup.string(),
        password: yup.string(),
        job: yup.string(),
        speciality: yup.string(),
        register: yup.string(),
        active: yup.bool(),
        data_id: yup.string()
    })
).required();

export default getAllEmployeesSchema;