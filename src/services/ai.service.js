const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generateRecommendation = async (quizData) => {
  const prompt = `
You are a university career advisor.

Based on the student's quiz results, recommend the BEST university course.

Quiz Results:
${JSON.stringify(quizData, null, 2)}

Return ONLY valid JSON in this format:

{
  "recommendedCourse": "",
  "confidence": 95,
  "reason": "",
  "topCourses": [
    {
      "course": "",
      "score": 95
    }
  ]
}
`;

  const result = await model.generateContent(prompt);

  let response = result.response.text();

response = response
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return response;
};

module.exports = {
  generateRecommendation,
};