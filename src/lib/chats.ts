export interface Chat {
  id: number;
  title: string;
  description: string;
  prompt: string;
}

export const chats: Chat[] = [
  {
    id: 1,
    title: "MNT Price",
    description: "Get the price of Mantle's MNT token in USD",
    prompt: "What is the price of Mantle's MNT token in USD?",
  },
  {
    id: 2,
    title: "Send MNT",
    description: "Send 1 MNT to a given address",
    prompt:
      "Send 1 MNT to this address [0x40FEfD52714f298b9EaD6760753aAA720438D4bB] on Mantle",
  },
  {
    id: 3,
    title: "Get Contract ABI",
    description: "Get the ABI of a contract address",
    prompt:
      "What is the ABI of this contract address [0x8ca63b0424C7e609051784F5673a76E78A17Abed] on Mantle?",
  },
  {
    id: 4,
    title: "Send a Boy NFT",
    description: "Send a token to a specified address",
    prompt:
      "Transfer this NFT at contract address [0x8ca63b0424C7e609051784F5673a76E78A17Abed] from address [0xCd3B9FeA5E16C847AC9a79653C44DeB1736C165a] to address [0x40FEfD52714f298b9EaD6760753aAA720438D4bB] token #325",
  },
];
