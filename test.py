"""
Install the Google AI Python SDK

$ pip install google-generativeai
"""

import os
import google.generativeai as genai
from youtube_transcript_api import YouTubeTranscriptApi

##########################################################################

def get_transcript():
  # get link and video_id
  url = input("Enter video link: ")
  video_id = url.rsplit('=', 1)[-1]
  transcript = YouTubeTranscriptApi.get_transcript(video_id)

  hold = ""

  # Print the transcript
  for entry in transcript:
      hold = hold + f"{entry['text']}" + "\n"
      #print(f"{entry['text']}")

  return hold

########################################################################


#genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
genai.configure(api_key="AIzaSyAK7MBZBiE5iZM-uFtnKgLMzhzjVEV5c-c")

# Create the model
generation_config = {
  "temperature": 0.9,
  "top_p": 1,
  "max_output_tokens": 2048,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-pro",
  generation_config=generation_config,
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
  #system_instruction="You will be given a youtube video transcript and you will give the user a prompt for the main points they are looking for from the video. Give the user an option to \"Give main points\" or \"Summarise immediately\" which you do yourself",
  system_instruction="You will be given a youtube video transcript and you will give the user the main points they are looking for from the video.",
)

###########################################################################

history = []
# print("Bot: Hi, please provide your YouTube video link")
# user_input = get_transcript()
i = 0
while True:
  
  
  if i < 1:
    user_input = get_transcript()

  else:
    user_input = input("You: ")
  if user_input.lower() in ["quit", "exit", "bye"]:
      print('Bot: Bye :)')
      break
  chat_session = model.start_chat(
    history=history
  )

  response = chat_session.send_message(user_input)
  model_response = response.text
  print(f'Bot: {model_response}')
  print()

  history.append({"role":"user","parts":[user_input]})
  history.append({"role":"model", "parts":[model_response]})
  i += 1

  #########################################################################