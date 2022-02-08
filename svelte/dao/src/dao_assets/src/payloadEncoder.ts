import { IDL } from "@dfinity/candid";
import type { UpdateSystemParamsPayload as UpdateSystemParamsPayloadType } from "../../declarations/dao/dao.did";

export const encode = (payload: UpdateSystemParamsPayloadType): number[] => {
    return Array.from(new Uint8Array(IDL.encode([UpdateSystemParamsPayload], [payload])))
}

export const decode = (bytes: number[]): UpdateSystemParamsPayloadType => {
    return IDL.decode([UpdateSystemParamsPayload], new Uint8Array(bytes).buffer)[0] as unknown as UpdateSystemParamsPayloadType;
}

const Tokens = IDL.Record({ 'amount_e8s' : IDL.Nat });
const UpdateSystemParamsPayload = IDL.Record({
    'transfer_fee' : IDL.Opt(Tokens),
    'proposal_vote_threshold' : IDL.Opt(Tokens),
    'proposal_submission_deposit' : IDL.Opt(Tokens),
});
