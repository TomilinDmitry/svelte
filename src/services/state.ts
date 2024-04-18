import { writable } from "svelte/store";
import type { TDetails } from "./types";

export const isOpen = writable(false);
export const isAuth = writable(false);
export const isValid = writable(true);
export const isRegistration = writable(false);
export const showPassword = writable(false);
export const setUser = writable<TDetails | null>(null);
export const Users = writable<TDetails[] | null>(null);
export const openNavigation = writable<boolean>(false);
export const searchText = writable<string>("");

export function setAuthenticatedUser(user: TDetails) {
  setUser.set(user);
}
export function setUsersData(users: TDetails[]) {
  Users.set(users);
}
