import { vertexai } from '../firbaseConfig';
import { getGenerativeModel, Schema } from 'firebase/vertexai';
import { LANGUAGE_MAP } from '../utils/constants';

// Prompt for generating a course outline
const GENERATE_COURSE_OUTLINE_PROMPT = `
You are a language course creator. Your task is to generate a structured outline for a personalized language learning course.

The user wants to learn {LANGUAGE} at a {SKILL_LEVEL} level. They are interested in the following topics: {TOPICS}.

Generate a course outline consisting of 15-20 lesson modules. Each module should have a title and a brief description of what the learner will learn in that module. The description should be concise and suitable for generating a specific lesson later.

Format your response as a JSON object with the following structure:
{
  "lessonModules": [
    {
      "moduleId": "module_1", // A unique identifier for the module
      "title": "Module Title 1",
      "description": "A brief description of what the learner will learn in this module."
    },
    {
      "moduleId": "module_2",
      "title": "Module Title 2",
      "description": "A brief description of what the learner will learn in this module."
    },
    // ... more modules
  ]
}

Ensure the modules are logically ordered, starting with basics and progressing to more complex topics. The descriptions should be clear and actionable.
`;

export const generateCourseOutline = async (language, skillLevel, topics) => {
  try {
    const schema = Schema.object({
      lessonModules: Schema.array(Schema.object({
        moduleId: Schema.string(),
        title: Schema.string(),
        description: Schema.string(),
      }))
    });

    const model = getGenerativeModel(vertexai, {
      model: 'gemini-2.0-flash',
    });

    const prompt = GENERATE_COURSE_OUTLINE_PROMPT
      .replace('{LANGUAGE}', LANGUAGE_MAP[language.toLowerCase()])
      .replace('{SKILL_LEVEL}', skillLevel)
      .replace('{TOPICS}', topics.join(', '));

    const result = await model.generateContent(prompt);
    const courseOutline = JSON.parse(result.response.text().replace(/```json/g, '').replace(/```/g, ''));

    return courseOutline;
  } catch (error) {
    console.error('Error generating course outline:', error);
    throw error;
  }
}; 