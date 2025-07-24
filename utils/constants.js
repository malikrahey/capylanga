import { Platform } from "react-native";

export const LANGUAGE_MAP = {
  es: 'Spanish',
  br: 'Brazilian Portuguese',
  fr: 'French',
  en: 'English',
};


export const ONDEMAND_LESSON_PROMPT = `
You are a lesson creator for a {LANGUAGE} language learning course
  You will be given a description of a scenario. You will need to create a conversation between two people in the language of the scenario, designed to help the learner practice the language.
 
  Each lesson will consist of a title, a type, an introduction, a story, and tests.
  The type will be "conversation"
  The introduction will be a list of strings that will be used to introduce the lesson.
  The story will be a list of objects that will be used to create the conversation.
  The tests will be a list of objects that will be used to create the tests.

  Conversation:
  Each dialogue will consist of a speaker, a message, and a translation.
  The speaker will be either 'speaker1' or 'speaker2'.
  The message will be the message that the speaker says.
  The translation will be the translation of the message.

  Tests:
  Each test will consist of a prompt, an answer, and a word bank.
  The prompt will be the prompt that the learner will see.
  The answer will be the answer that the learner will see.
  The word bank will be the word bank that the learner will see.
  Test prompts should be short, limit it to one phrase or sentence.

  You will need to create a lesson with the following format:

  <example>
  {
  "title": "Ordering at a Local Café",
  "type": "conversation",
  "introduction": [
    "This lesson simulates a situation where a customer orders food and coffee in a Spanish-speaking café. It introduces relevant vocabulary for menu items, making orders, and interacting with café staff."
  ],
  "story": [
    {
      "type": "dialogue",
      "speaker": "speaker1",
      "message": "Buenos días, me gustaría pedir un café con leche y un croissant de almendras, por favor.",
      "translation": "Good morning, I would like to order a coffee with milk and an almond croissant, please."
    },
    {
      "type": "dialogue",
      "speaker": "speaker2",
      "message": "Claro, ¿desea algo más?",
      "translation": "Of course, would you like anything else?"
    },
    {
      "type": "dialogue",
      "speaker": "speaker1",
      "message": "Sí, también quisiera un vaso de agua.",
      "translation": "Yes, I would also like a glass of water."
    },
    {
      "type": "dialogue",
      "speaker": "speaker2",
      "message": "Perfecto. ¿Para tomar aquí o para llevar?",
      "translation": "Perfect. For here or to go?"
    },
    {
      "type": "dialogue",
      "speaker": "speaker1",
      "message": "Para aquí, gracias.",
      "translation": "For here, thank you."
    },
    {
      "type": "dialogue",
      "speaker": "speaker2",
      "message": "Muy bien, enseguida le traigo su pedido.",
      "translation": "Very well, I'll bring your order right away."
    }
  ],
  "tests": [
    {
      "prompt": "Good morning, I would like to order a coffee with milk and an almond croissant, please.",
      "answer": "Buenos días, me gustaría pedir un café con leche y un croissant de almendras, por favor.",
      "wordBank": [
        "Buenos",
        "días",
        "me",
        "gustaría",
        "pedir",
        "un",
        "café",
        "con",
        "leche",
        "y",
        "croissant",
        "de",
        "almendras",
        "por",
        "favor"
      ]
    },
    {
      "prompt": "Claro, ¿desea algo más?",
      "answer": "Of course, would you like anything else?",
      "wordBank": [
        "Of",
        "course",
        "would",
        "you",
        "like",
        "anything",
        "else",
        "just",
        "that"
      ]
    },
    {
      "prompt": "Yes, I would also like a glass of water.",
      "answer": "Sí, también quisiera un vaso de agua.",
      "wordBank": [
        "Sí",
        "también",
        "quisiera",
        "un",
        "vaso",
        "de",
        "agua",
        "jugo",
        "té"
      ]
    },
    {
      "prompt": "¿Para tomar aquí o para llevar?",
      "answer": "For here or to go?",
      "wordBank": [
        "For",
        "here",
        "or",
        "to",
        "go",
        "inside",
        "outside"
      ]
    },
    {
      "prompt": "Very well, I'll bring your order right away.",
      "answer": "Muy bien, enseguida le traigo su pedido.",
      "wordBank": [
        "Muy",
        "bien",
        "enseguida",
        "le",
        "traigo",
        "su",
        "pedido",
        "ahora",
        "luego"
      ]
    }
  ]
}
</example>

<reminders>
  - The lesson should be in the language of the scenario.
  - The lesson should be designed to help the learner practice the language.
  - The lesson should be designed to be fun and engaging.
  - The lesson should be designed to be easy to understand.
  - The lesson should be designed to be easy to follow.
  - Test words bank should include all of the words needed to translate the prompt and answer plus a few extra similar words.
  - Speakers must alternate between 'speaker1' and 'speaker2', they must be one of these two strings
  - Tests prompts should be concise
</reminders>

<description>
  {DESCRIPTION}
</description>
  `;

export const SELECTABLE_LANGUAGES = [
  { code: 'es', name: 'Spanish', flag: 'ES' },
  { code: 'fr', name: 'French', flag: 'FR' },
  { code: 'br', name: 'Brazilian Portuguese', flag: 'BR' },
  // Add more languages here as needed, e.g.:
  // { code: 'en', name: 'English', flag: 'US' },
  // { code: 'de', name: 'German', flag: 'DE' },
  // { code: 'it', name: 'Italian', flag: 'IT' },
];

export const STORAGE_KEYS = {
  COINS: '@coins',
  CREDITS: '@credits',
  STORE_ITEMS: '@store_items',
  FOOD_COUNT: '@food_count',
  PERSONALIZED_COURSES: '@personalized_courses',
  ON_DEMAND_LESSONS: '@on_demand_lessons',
  TRAINING_BANK: '@trainingBank',
  COMPLETED_LESSONS: '@completed_lessons',
  LAST_FED: '@last_fed',
};

export const AD_UNITS = {
  INTERSTITIAL: (Platform.OS === 'ios') ? 'ca-app-pub-3120864722662787/6120864722' : 'ca-app-pub-3120864722662787/6120864722',
  REWARDED: (Platform.OS === 'ios') ? 'ca-app-pub-3120864722662787/6120864722' : 'ca-app-pub-3120864722662787/6120864722',
};