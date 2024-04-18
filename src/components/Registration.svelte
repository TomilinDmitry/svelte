<script lang="ts">
    import { Formly, type IField } from "svelte-formly";
  import {  isRegistration, showPassword } from "../services/state";
  import eyeIcon from '../assets/eyePassword.png'
  import type { TDetails } from "../services/types";
  import * as Yup from "yup";
    
    const form_name = 'formly_usage';
    const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .required("Обязательное поле")
      .min(3, "Минимум 3 символа")
      .max(10, "Максимум 10 символов"),
    email: Yup.string()
      .email("Неверный формат email")
      .required("Обязательное поле"),
    password: Yup.string()
      .required("Обязательное поле")
      .min(6, "Минимум 6 символов")
      .max(12, "Максимум 12 символов"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Пароли должны совпадать")
      .required("Обязательное поле"),
  });
    const fields: IField[] = [
      {
        type: 'input',
        name: 'firstname',
        attributes: {
          type: 'text',
          id: 'firstname',
          classes: ['form-control'],
          placeholder: 'Tap your name'
        },
        rules: ['required',],
        messages: {
          required: 'Обязательное поле',
        }
      },
      {
        type: 'input',
		name: 'email',
		attributes: {
		    type: 'email',
			id: 'email',
			placeholder: 'Tap your email',
            classes: ['form-control'],
		},
        rules: ['required'],
        messages: {
          required: 'Обязательное поле',
        }
      },
      {
        type: 'input',
        name: "password",
        attributes: {
          type: 'password',
          id: 'password',
          classes: ['form-control'],
          placeholder: 'Tap your password',
          autocomplete: 'off'
        },
        rules: ['required'],
        messages: {
          required: 'Обязательное поле',
        }
      },
      {
        type: 'input',
			  name: 'confirm_password',
			  attributes: {
				type: 'password',
				id: 'confirm_password',
        classes: ['form-control'],
				placeholder: 'Tap your confirm password'
			},
      rules: ['required'],
        messages: {
          required: 'Обязательное поле',
        }
      }
    ];
    const onSubmit = async ({ detail }: any) => {
    const formData = detail; 
    const isValid = await validationSchema.isValid(formData);
    if (isValid) {
      const usersString = sessionStorage.getItem('users') || '[]';
      const users: TDetails[] = JSON.parse(usersString);
      users.push(formData);
      sessionStorage.setItem('users', JSON.stringify(users));
      console.log('Пользователь добавлен в массив пользователей в sessionStorage');
      console.log('Новый массив пользователей:', users);
      isRegistration.update (value => !value)
    } else {
      alert('Данные формы невалидны,пароль должен быть не меньше 6 символов и не больше 12,иметь минимум 1 букву или цифру,Имя должно быть не меньше 3 символов и не больше 10');
    }
    };
   
  </script>
      <Formly fields={fields} form_name={form_name} on:submit={onSubmit}
      btnSubmit={{
          text: $isRegistration ? 'Регистрация' : 'Войти',
          classes: ['btn', 'btn-primary']
	}}
	btnReset={{
		text: 'Стереть все',
		classes: ['btn', 'btn-secondary']
	}}/>
  