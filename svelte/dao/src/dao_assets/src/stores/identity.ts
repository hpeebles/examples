import { writable } from "svelte/store";
import { AnonymousIdentity, Identity } from "@dfinity/agent";

const store = writable(new AnonymousIdentity() as Identity);

export const identity = {
    ...store,
    logOut: () => store.set(new AnonymousIdentity()),
}
