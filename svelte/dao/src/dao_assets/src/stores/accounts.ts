import { writable } from "svelte/store";
import type { Account } from "../../../declarations/dao/dao.did";

export const accounts = writable([] as Account[]);
