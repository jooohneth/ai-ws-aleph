import { Tool, tool } from "ai";
import { sendETH } from "@goat-sdk/wallet-evm";
import { viem } from "@goat-sdk/wallet-viem";
import { http, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mantle } from "viem/chains";
import { z } from "zod";

// Ex1
const getMantlePrice = tool({
  description: "Get the price of Mantle's MNT token in USD in real-time",
  parameters: z.object({}),
  execute: async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=mantle&vs_currencies=usd`
    );
    const data = await response.json();
    return data.mantle.usd;
  },
});
// -----------------------------------

// Ex2
const walletClient = createWalletClient({
  account: privateKeyToAccount(process.env.PRIVATE_KEY! as `0x${string}`),
  transport: http(process.env.MANTLE_RPC_URL || "https://rpc.mantle.xyz"),
  chain: mantle,
});

const sendMNT = tool({
  description: "Send MNT to a given address on Mantle",
  parameters: z.object({
    to: z.string(),
    amount: z.string(),
  }),
  execute: async ({ to, amount }) => {
    const wrappedWallet = viem(walletClient);
    const sendEthPlugin = sendETH();
    const tools = sendEthPlugin.getTools(wrappedWallet);
    const sendTool = tools[0];

    return await sendTool.execute({ to, amount });
  },
});
// -----------------------------------

// Ex3
const getContractABI = tool({
  description: `Get the ABI of a given contract address on Mantle. 
     Please keep it very short, filter out the 3 most important functions of the ABI, like mint, stake, deposit, etc... 
     Be very concise. 
    `,
  parameters: z.object({
    address: z.string(),
  }),
  execute: async ({ address }) => {
    const response = await fetch(
      `
        https://api.mantlescan.xyz/api?module=contract&action=getabi&address=${address}&apikey=${process.env.MANTLESCAN_API_KEY}        
      `
    );

    const data = await response.json();
    return data.result;
  },
});

// Ex3
const writeContract = tool({
  description: `Write to a contract on Mantle.   

    Example:
    {
      "address": "0x1234567890123456789012345678901234567890",
      "functionName": "transfer",
      "args": "[\"0x40FEfD52714f298b9EaD6760753aAA720438D4bB\", 100]",
      "abi": "[{\"name\":\"transfer\",\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"type\":\"function\"}]"
    }
    
    Use other existing tools to get the ABI if needed.
    `,
  parameters: z.object({
    address: z.string().describe("The contract address"),
    functionName: z.string().describe("The name of the function to call"),
    args: z
      .string()
      .describe("JSON string of arguments to pass to the function"),
    abi: z
      .string()
      .describe("The ABI of the function or contract as a JSON string"),
  }),
  execute: async ({ address, functionName, args, abi }) => {
    try {
      const parsedAbi = JSON.parse(abi);
      const parsedArgs = JSON.parse(args);

      const hash = await walletClient.writeContract({
        address: address as `0x${string}`,
        abi: parsedAbi,
        functionName,
        args: parsedArgs,
      });

      return `Transaction sent successfully. Hash: ${hash}`;
    } catch (error: any) {
      return `Error executing contract: ${error?.message || "Unknown error"}`;
    }
  },
});
// -----------------------------------

export const tools: Record<string, Tool> = {
  getMantlePrice, // -- Ex1
  sendMNT, // -- Ex2
  getContractABI, // -- Ex3
  writeContract, // -- Ex3
};
