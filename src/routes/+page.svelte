<script>
// @ts-nocheck

    import Authorization from '../components/Authorization.svelte'
    import Header from '../components/Header.svelte'
    import {onMount } from 'svelte';
  import { isOpen,Users } from '../services/state';
  /**
   * @type {never[]}
   */
  let users = [];

export const getUsers = () => {
    if (typeof sessionStorage !== 'undefined') {
        const usersData = sessionStorage.getItem('users');
        if (usersData) {
            const parsedUsers = JSON.parse(usersData);
            console.log(parsedUsers);
           users=parsedUsers 
           console.log(users)
            
        } else {
            console.log('Данные пользователя не найдены в sessionStorage');
        }
    } else {
        console.log('sessionStorage не поддерживается в этой среде');
    }
}

onMount(getUsers);
    </script>

<div class="container">
<Header/>
{#if $isOpen}
    <Authorization/>
    {/if}
    {#if users.length > 0}
    <table>
        <thead>
            <tr>
                <th>Имя</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {#each users as user, index}
                <tr>
                    <td>{user.firstname} </td>
                    <td>{user.email} </td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <p>Нет данных о пользователях</p>
{/if}
</div>

<style>
    .container{
        display: flex;
        align-items:center;
        flex-direction: column;
        gap: 52px;
    }
      table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 8px;
        border-bottom: 1px solid #ddd;
        text-align: center;
        border-right:1px solid;
    }

    th {
        background-color: #f2f2f2;
    }
</style>
