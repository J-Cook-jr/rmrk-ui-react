export interface IIpfsProviders {
  cloudflare: string;
  ipfs: string;
  pinata: string;
}

export interface IFormattedReaction {
  unicode: string;
  emoji: string;
}

export interface IFormattedReactionWithAccounts extends IFormattedReaction {
  accounts: string[];
}

export interface IFormattedReactionByAccount {
  account: string;
  reactions: IFormattedReaction[];
}

export type IFormattedReactionByEmote = IFormattedReactionWithAccounts[];
