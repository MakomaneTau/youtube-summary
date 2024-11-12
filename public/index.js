console.log("hello");
// ohk it does connect problem is the import statement

import { GoogleGenerativeAI } from "@google/generative-ai";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";

const genAI = new GoogleGenerativeAI("AIzaSyAK7MBZBiE5iZM-uFtnKgLMzhzjVEV5c-c");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const container = document.querySelector(".container");



const conversationHistory = []; // Array to store chat history

// Function to log and store each message in the conversation history
function logAndStoreMessage(role, text) {
  conversationHistory.push({ role, text });
  if(role == 'model'){
    console.log(text);
  }
  
}

console.log("hed");

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
    //console.log(conversationHistory);
  }
}

function processURL(){
  let label_response = document.createElement("label");
  let p = document.createElement("p");
  let label_user = document.createElement("label");
  let user_input =document.createElement("input");
  user_input.type = text;
  user_input.id = user;
  user_input.name = user;

  container.appendChild(label_response);
  container.appendChild(p);
  container.appendChild(label_user);
  container.appendChild(user_input);
}


const loader = YoutubeLoader.createFromUrl("https://youtu.be/nudje7WT-Vs?si=M_W1ZnLAY6jyCvyk", {
  language: "en",
  addVideoInfo: false,
});

const docs = await loader.load();
//console.log(docs[0].pageContent);
await sendMessage(docs[0].pageContent);


await sendMessage("bye"); // Trigger end of conversation

processURL();