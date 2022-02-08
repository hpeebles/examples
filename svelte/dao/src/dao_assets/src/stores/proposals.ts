import { writable } from "svelte/store";
import type { Proposal } from "../../../declarations/dao/dao.did";

export const proposals = writable([] as Proposal[]);
