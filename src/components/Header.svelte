<script>


  import {onMount } from 'svelte';
    import profile from '../assets/profile.png';
    import { isAuth, isOpen, openNavigation,searchText} from '../services/state';
/**
   * @typedef {import('../services/types').TUser} TUser
   */
  /** @type {TUser} */
    let authUser
    const logout = () =>{
        sessionStorage.setItem('auth', JSON.stringify(false));
        alert('Вы успешно вышли с аккаунта')
        window.location.reload();
    }
    const getUser = () => {
        if (typeof sessionStorage !== 'undefined') {
            const userData = sessionStorage.getItem('user');
            if (userData) {
                authUser = JSON.parse(userData);
                console.log(authUser);
        
            } else {
                console.log('Данные пользователя не найдены в sessionStorage');
                return null;
            }
        } else {
            console.log('sessionStorage не поддерживается в этой среде');
            return null;
        }
    }

    export const getAuth = () => {
        if (typeof sessionStorage !== 'undefined') {
            const authData = sessionStorage.getItem('auth');
            if (authData) {
                const auth = JSON.parse(authData);
                console.log(auth);
                // @ts-ignore
                return isAuth.update(value => auth);
            } else {
                console.log('Данные пользователя не найдены в sessionStorage');
                return null;
            }
        }
    }

    function toggleProfile() {
        // @ts-ignore
        isOpen.update(value => true);
        
    }
    onMount(()=>{
        getAuth();
        getUser()
    })
</script>
<header class="wrapper">
    <div class="container">

        <h1>Svelte</h1>
        <input type="text" class="searchInput" bind:value={$searchText}>
        <div class="profile">
            {#if openNavigation && $isAuth}
              <button on:click={logout} class="logout">Выход</button>
            {/if}
            {#if $isAuth === false}
            <button on:click={toggleProfile} class="button">Войти</button>
            {/if}
            {#if $isAuth}
            <p class="nameBlock">
                <span class="name">{authUser.firstname}</span>
            </p>
            <img src={profile} alt="profileImg">
            {/if}
        </div>
    </div>
    </header>
    <style>
        .wrapper{
            display: flex;
            justify-content: center;
            max-width: 100vw;
            width: 100%;
            background-color: bisque;
            padding: 12px 0px;
        }
        .container{
            max-width: 1100px;
            width: 100%;
            display: flex;
            justify-content: space-between;
           
            background-color: bisque;
        }
        .searchInput{
            padding: 12px;
            max-width: 500px;
            width: 100%;
            border-radius: 8px;
    
            outline: none;
            border: none;
        }
        .profile{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
        }
        .nameBlock{
            display: flex;
            flex-direction: column;
            text-align: right;
        }
        .name{
            font-size: 13px;
            font-weight: 600;
        }
        .button{
            padding: 12px ;
            border:none;
            background-color:white;
            cursor: pointer;
            border-radius:8px;
        }
        .logout{
            padding: 12px;
            border:1px solid;
            border-radius:8px;
            outline: none;
            background:transparent;

        }
    </style>