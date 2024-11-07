import { GoogleGenerativeAI } from "@google/generative-ai";
import { YoutubeTranscript } from 'youtube-transcript';


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




YoutubeTranscript.fetchTranscript("https://youtu.be/Su36tpkuo1I?si=890qVE7M7DjqAnW7")
    .then(async (transcript) => {
        const transcriptData = transcript.text;
        console.log(transcriptData);

        //await sendMessage(transcriptData);



    })
    .catch((error) => console.error(error));

await sendMessage("bye"); // Trigger end of conversation