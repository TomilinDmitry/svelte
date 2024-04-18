<script lang="ts">
    import { Formly, type IField} from "svelte-formly";
  import { isOpen, isRegistration} from "../services/state";
    import closeIcon from '../assets/closeIcon.svg'
  import type { TDetails } from "../services/types";
  import Registration from "./Registration.svelte";
  function toggleProfile() {
    isOpen.update(value=>false)
  }
  function toggleAuthorization () {
    isRegistration.update (value => !value)
  }
    const form_name = 'formly_auth';
    const fieldsAuth: IField[] = [
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
        name: 'password',
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
    ];
    $: switchTitle = $isRegistration ? 'Регистрация' : 'Авторизация'; 
    $: buttonText = $isRegistration ? 'Войти' : 'Регистрация';

    let isAuthenticated = false;
    const onSubmit = ({ detail }: TDetails) => {        
  const formData = detail; 
    
  const usersString = sessionStorage.getItem('users') || '[]';
  const users:any[] = JSON.parse(usersString);
  const user = users.find(user => user.email === formData.email && user.password === formData.password);

  if (user) {
    isAuthenticated = true; 
    console.log('Успешная авторизация');
    console.log('Данные пользователя:', user);
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('auth', JSON.stringify(true));
    toggleProfile()
    window.location.reload();
  } else {
    isAuthenticated = false;
    alert('Неверный email или пароль');
  }
};

  </script>
  
  <style>
  .wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    backdrop-filter: blur(15px);
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 10%;
  }

  .container {
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    padding: 24px;
    gap: 8px;
    align-items: center;
    max-width: 600px;
    width: 100%;
    justify-content: center;
    height: 100%;
    box-shadow: 1px 12px 12px 12px #4d4d4d26;
  }
  section{
        display: flex;
        max-width: 600px;
        width: 100%;
        justify-content: center;
    }
    .titleBlock{
        display: flex;
        justify-content: space-between;
        max-width: 426px;
        width: 100%;
    }
    :global(.btn) {
      padding: 12px;
      border: none;
      border-radius: 8px;
      background-color: black;
      color: white;
      cursor: pointer;
      width: 400px;
      margin: 10px 0px;
    }
    :global(.form-control){
        padding: 12px;
      max-width: 400px;
      width: 100%;
      border-radius: 8px;
      border: 1px solid #ccc;
      outline: none;
      margin-bottom: 10px;
    }
    :global(.invalid-feedback){
        margin-bottom: 10px;
    }
    :global(.error){
        color:rgba(0,0,0,0.5)
    }
    :global(form){
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 400px;
      width: 100%;
    }
    .closeIcon{
        background:transparent;
        border:none;
        outline: none;
    }
    .line{
        width: 400px;
        border:1px solid rgba(0,0,0,0.5);
    }
  </style>
  
  <div class="wrapper">
    <div class="container">
      <section >
        <div class="titleBlock">
            <h1>{switchTitle}</h1>
            <button on:click={toggleProfile} class="closeIcon"><img src={closeIcon} alt="closeIcon" ></button>
        </div>
        </section>
        {#if !$isRegistration}
          <Formly fields={fieldsAuth} form_name={form_name} on:submit={onSubmit}
          btnSubmit={{
            text: $isRegistration ? 'Регистрация' : 'Войти',
            classes: ['btn', 'btn-primary']
          }}
    btnReset={{
      text: 'Стереть все',
      classes: ['btn', 'btn-secondary']
    }}/>
  
    {/if}
    {#if $isRegistration}
   
   <Registration/>
  
    {/if}
    <span class="line"></span>
      <button class="btn" on:click={toggleAuthorization}>Перейти на вкладку "{buttonText}"</button>
    </div>
  </div>
  