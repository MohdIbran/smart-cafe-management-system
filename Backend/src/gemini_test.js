require("dotenv").config();
const { GoogleGenAI } = require( "@google/genai");


const ai = new GoogleGenAI({ apiKey: process.env.AI_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: "Explain how AI works in a few words",
  });
  return(response.text);
}

module.exports = main;