import * as Yup from "yup";

export const addTaskScheme = Yup.object().shape({
  name: Yup.string()
    .min(3, "Название задачи должно содержать минимум 3 символа")
    .required("Название задачи обязательно"),
});