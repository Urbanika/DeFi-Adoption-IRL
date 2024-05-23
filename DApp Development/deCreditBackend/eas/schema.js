import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';
import 'dotenv/config'

// Configuration constants
const schemaRegistryContractAddress = "0xYourSchemaRegistryContractAddress";
const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

async function registerSchema() {
    try {
        // Initialize provider and signer 
        const provider = new ethers.JsonRpcProvider(process.env.QUICKNODE_ENDPOINT);
        const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
        schemaRegistry.connect(signer);

        //Initialize SchemaEncoder with the schema string 
        const schema = "string ";
        const revocable = true; // A flag allowing an attenstation to be revoked

        const transaction = await schemaRegistry.register({
            schema,
            revocable,
            //You could and a resolver field here for additional functionality
        });

        // Optional: Wait for transaction to be validated
        await transaction.wait();
        console.log("New Schema Created", transaction);
    } catch (error) {
        console.error("An error ocurred:", error)
    }

}

registerSchema();

