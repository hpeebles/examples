import { IDL } from "@dfinity/candid";
import type { Principal } from "@dfinity/principal";
import type { Account, DAO, UpdateSystemParamsPayload as UpdateSystemParamsPayloadType } from "../../declarations/dao/dao.did";
// @ts-ignore
import { createActor } from "../../declarations/dao";
import { identity } from "./stores/identity";
import { get } from "svelte/store";

export const listAccounts = async (): Promise<Account[]> => {
    return await buildActor().list_accounts();
}

export const transfer = async (to: Principal, amountE8s: bigint) => {
    return await buildActor().transfer({
        to,
        amount: { amount_e8s: amountE8s }
    })
}

export const submitProposal = async (newTransferFeeE8s: bigint) => {
    const arg: UpdateSystemParamsPayloadType = {
        transfer_fee: [{ amount_e8s: newTransferFeeE8s }],
        proposal_submission_deposit: [],
        proposal_vote_threshold: []
    };

    await buildActor().submit_proposal({
        canister_id: Principal.fromText(process.env.DAO_CANISTER_ID),
        method: "update_system_params",
        message: Array.from(new Uint8Array(IDL.encode([UpdateSystemParamsPayload], [arg])))
    })
}

const buildActor = (): DAO => {
    const agentOptions = { identity: get(identity) };
    const actor: DAO = createActor(process.env.DAO_CANISTER_ID, { agentOptions });
    return actor;
}

const Tokens = IDL.Record({ 'amount_e8s' : IDL.Nat });
const UpdateSystemParamsPayload = IDL.Record({
    'transfer_fee' : IDL.Opt(Tokens),
    'proposal_vote_threshold' : IDL.Opt(Tokens),
    'proposal_submission_deposit' : IDL.Opt(Tokens),
});

