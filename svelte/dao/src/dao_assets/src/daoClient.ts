import { IDL } from "@dfinity/candid";
import { Principal } from "@dfinity/principal";
import type {
    Account,
    DAO,
    Proposal,
    UpdateSystemParamsPayload as UpdateSystemParamsPayloadType
} from "../../declarations/dao/dao.did";
// @ts-ignore
import { createActor } from "../../declarations/dao";
import { identity } from "./stores/identity";
import { get } from "svelte/store";
import {encode} from "./payloadEncoder";

export const listAccounts = async (): Promise<Account[]> => {
    return await buildActor().list_accounts();
}

export const listProposals = async (): Promise<Proposal[]> => {
    return await buildActor().list_proposals();
}

export const transfer = async (to: Principal, amountE8s: bigint) => {
    await buildActor().transfer({
        to,
        amount: { amount_e8s: amountE8s }
    });
}

export const vote = async (proposalId: bigint, yes: boolean) => {
    await buildActor().vote({
        proposal_id: proposalId,
        vote: yes ? { yes: null } : { no: null }
    });
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
        message: encode(arg)
    })
}

const buildActor = (): DAO => {
    const agentOptions = { identity: get(identity) };
    const actor: DAO = createActor(process.env.DAO_CANISTER_ID, { agentOptions });
    return actor;
}

