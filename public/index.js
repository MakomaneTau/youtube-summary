const container = document.querySelector(".container");

import { YoutubeTranscript } from 'youtube-transcript';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAK7MBZBiE5iZM-uFtnKgLMzhzjVEV5c-c");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });




const conversationHistory = []; // Array to store chat history

// Function to log and store each message in the conversation history
function logAndStoreMessage(role, text) {
  conversationHistory.push({ role, text });
  console.log(text);
}

// Initial chat setup with history
const chat = model.startChat({
  history: [
  ],
});


async function sendMessage(message) {
  // Store and send user's message
  logAndStoreMessage("user", message);
  let result = await chat.sendMessage(message);

  // Store and log model's response
  logAndStoreMessage("model", result.response.text());

  // Stop recording if user says "bye"
  if (message.toLowerCase() === "bye") {
    console.log("Conversation Ended. Here is the full chat history:");
    console.log(conversationHistory);
  }
}

function processURL(){
  let url = document.getElementById('url');
  YoutubeTranscript.fetchTranscript(url.text)
    .then(async (transcript) => {
        const transcriptData = transcript;
        //console.log(transcriptData);

        await sendMessage(transcriptData);



    })
    .catch((error) => console.error(error));
}

container.innerHTML += `
     <label>Response:</label>
    <p class="response"></p>
`































// Sample messages
await sendMessage("Your duty is to summarise youtube transcripts that will be provided");
await sendMessage("I have 2 dogs in my house.");
await sendMessage("How many paws are in my house?");
await sendMessage("bye"); // Trigger end of conversation
