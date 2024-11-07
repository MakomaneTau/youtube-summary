const container = document.querySelector(".container");


const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAK7MBZBiE5iZM-uFtnKgLMzhzjVEV5c-c");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/*const prompt = "Explain how AI works";

const result = await model.generateContent(prompt);
console.log(result.response.text());*/
// Print text as it comes in. https://ai.google.dev/gemini-api/docs/text-generation?lang=node

container.innerHTML = `
    <label>URL:</label>
    <input type="text" id="url" name="URL" required>
`
let url = document.getElementById('url');




const conversationHistory = []; // Array to store chat history

// Function to log and store each message in the conversation history
function logAndStoreMessage(role, text) {
  conversationHistory.push({ role, text });
  console.log(text);
}

// Initial chat setup with history
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Your duty is to summarise youtube transcripts that will be provided" }],
    },
    {
      role: "model",
      parts: [{ text: "" }],
    },
  ],
});

// Initial messages
logAndStoreMessage("user", "Your duty is to summarise youtube transcripts that will be provided");
logAndStoreMessage("model", "");

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

// Sample messages
await sendMessage("I have 2 dogs in my house.");
await sendMessage("How many paws are in my house?");
await sendMessage("bye"); // Trigger end of conversation
