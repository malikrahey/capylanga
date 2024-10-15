import { LANGUAGE_MAP } from "./constants";


export function buildConversationContext(messages) {
  const context = messages.map((message) => message.text).join('\n');
  return context;
}

export function buildConversationPrompt(selectedLanguage, topicInfo, botInfo) {
  const language = LANGUAGE_MAP[selectedLanguage.toLowerCase()];
  const { title, description } = topicInfo;
  const { name } = botInfo;
  const prompt = `
    You are playing the role of ${name}, you will have a conversation with a user in ${language}.
    The conversation will be about ${title}. ${description}
    The conversation should be completely in ${language}.
    You should never say you are an AI language model.
    Stay in character.

    You will return your response in the following format:
    {
      message: string,
      corrections: string[]
    }

    The message field is your response to the user. The corrections is a list of any gramatical or spelling corrections to the user's previous message, this may be in English
    If you are not sure about the corrections, just leave it empty.
    Do not include any other text in the response.
  `;

  return prompt;

}