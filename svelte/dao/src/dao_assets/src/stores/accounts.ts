import { writable } from "svelte/store";
import type { Account as AccountType } from "../../../declarations/dao/dao.did";

export const accounts = writable([] as AccountType[]);
