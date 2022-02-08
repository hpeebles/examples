import type { Principal } from '@dfinity/principal';
export interface Account { 'owner' : Principal, 'tokens' : Tokens }
export interface DAO {
  'account_balance' : () => Promise<Tokens>,
  'get_proposal' : (arg_0: bigint) => Promise<[] | [Proposal]>,
  'list_accounts' : () => Promise<Array<Account>>,
  'list_proposals' : () => Promise<Array<Proposal>>,
  'submit_proposal' : (arg_0: ProposalPayload) => Promise<Result_2>,
  'transfer' : (arg_0: TransferArgs) => Promise<Result_1>,
  'update_system_params' : (arg_0: UpdateSystemParamsPayload) => Promise<
      undefined
    >,
  'vote' : (arg_0: VoteArgs) => Promise<Result>,
  'whoami' : () => Promise<Principal>,
}
export type List = [] | [[Principal, List]];
export interface Proposal {
  'id' : bigint,
  'votes_no' : Tokens,
  'voters' : List,
  'state' : ProposalState,
  'timestamp' : bigint,
  'proposer' : Principal,
  'votes_yes' : Tokens,
  'payload' : ProposalPayload,
}
export interface ProposalPayload {
  'method' : string,
  'canister_id' : Principal,
  'message' : Array<number>,
}
export type ProposalState = { 'open' : null } |
  { 'rejected' : null } |
  { 'executing' : null } |
  { 'accepted' : null } |
  { 'failed' : string } |
  { 'succeeded' : null };
export type Result = { 'ok' : ProposalState } |
  { 'err' : string };
export type Result_1 = { 'ok' : null } |
  { 'err' : string };
export type Result_2 = { 'ok' : bigint } |
  { 'err' : string };
export interface SystemParams {
  'transfer_fee' : Tokens,
  'proposal_vote_threshold' : Tokens,
  'proposal_submission_deposit' : Tokens,
}
export interface Tokens { 'amount_e8s' : bigint }
export interface TransferArgs { 'to' : Principal, 'amount' : Tokens }
export interface UpdateSystemParamsPayload {
  'transfer_fee' : [] | [Tokens],
  'proposal_vote_threshold' : [] | [Tokens],
  'proposal_submission_deposit' : [] | [Tokens],
}
export type Vote = { 'no' : null } |
  { 'yes' : null };
export interface VoteArgs { 'vote' : Vote, 'proposal_id' : bigint }
export interface _SERVICE extends DAO {}
