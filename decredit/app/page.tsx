//page.tsx
"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ChakraProvider, Button, Flex, Heading } from "@chakra-ui/react";
import { TabLayout } from "./tab-contents";

const APIKEY = process.env.NEXT_PUBLIC_GC_API_KEY;
const SCORERID = process.env.NEXT_PUBLIC_GC_SCORER_ID;

// endpoint for submitting passport
const SUBMIT_PASSPORT_URI =
  "https://api.scorer.gitcoin.co/registry/submit-passport";
// endpoint for getting the signing message
const SIGNING_MESSAGE_URI =
  "https://api.scorer.gitcoin.co/registry/signing-message";
// score needed to see hidden message
const thresholdNumber = 20;
const headers = APIKEY
  ? {
      "Content-Type": "application/json",
      "X-API-Key": APIKEY,
    }
  : undefined;

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Passport() {
  const [address, setAddress] = useState<string>("");
  const [score, setScore] = useState<string>("");
  const [passportScore, setPassportScore] = useState<number | null>(null);

  async function connect() {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts[0]);
    } catch (err) {
      console.log("error connecting...");
    }
  }

  useEffect(() => {
    checkConnection();
    async function checkConnection() {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        // if the user is connected, set their account
        if (accounts && accounts[0]) {
          setAddress(accounts[0].address);
        }
      } catch (err) {
        console.log("not connected...");
      }
    }
  }, []);

  async function getSigningMessage() {
    try {
      // fetch the message to sign from the server
      const response = await fetch(SIGNING_MESSAGE_URI, {
        headers,
      });
      // convert the response data to a json object
      const json = await response.json();
      return json;
    } catch (err) {
      console.log("error: ", err);
    }
  }

  async function submitPassport() {
    try {
      // GET request to the Passport API to get the signing message and the nonce
      const { message, nonce } = await getSigningMessage();
      // instantiate a new provider instance
      const provider = new ethers.BrowserProvider(window.ethereum);
      // call the provider's `getSigner` API method to start the signing process
      const signer = await provider.getSigner();
      // ask the user to sign the message
      const signature = await signer.signMessage(message);
      // POST request to the Passport API, sending the signing message, the signature, and the nonce
      const response = await fetch(SUBMIT_PASSPORT_URI, {
        method: "POST",
        headers,
        body: JSON.stringify({
          address,
          scorer_id: SCORERID,
          signature,
          nonce,
        }),
      });
      // assign the response data to `data` as a json object
      const data = await response.json();
      console.log("data:", data);
    } catch (err) {
      console.log("error: ", err);
    }
  }

  async function getScore() {
    setScore("");
    const GET_PASSPORT_SCORE_URI = `https://api.scorer.gitcoin.co/registry/score/${SCORERID}/${address}`;
    try {
      const response = await fetch(GET_PASSPORT_SCORE_URI, {
        headers,
      });
      const passportData = await response.json();
      if (passportData.score) {
        // if the user has a score, round it and set it in the local state
        const roundedScore = Math.round(passportData.score * 100) / 100;
        setScore(roundedScore.toString());
        console.log("PASSPORT SCORE = ", roundedScore);
        // Update passportScore state here
        setPassportScore(roundedScore);
      } else {
        // if the user has no score, display a message letting them know to submit their passport
        console.log(
          "No score available, please add Stamps to your passport and then resubmit."
        );
      }
    } catch (err) {
      console.log("error: ", err);
    }
  }


  return (
    
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: 60 }}>
      <ChakraProvider>
        <header style={{ padding: '1rem' }}>
        <Heading as='h1' size='4xl' noOfLines={2} style={{ backgroundColor: '#272530', padding: '10px', borderRadius: '8px' }}>
        de<span style={{ color: '#1AC1BF' }}>Credit</span> <br /> score
        </Heading>
        </header>
        <br />
        <br />
        <Button colorScheme='custom' variant='outline' onClick={connect} color="#1AC1BF">
          Connect
        </Button>
        <Button colorScheme='custom' variant='outline' onClick={submitPassport} color="#1AC1BF">
          Submit Passport
        </Button>
        <Button colorScheme='custom' variant='outline' onClick={getScore} color="#1AC1BF">
          get score
        </Button>
        <br />
        <TabLayout passportScore={passportScore} />
      </ChakraProvider >
    </div >

  )
}
