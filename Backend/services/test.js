    const generateAIResponse = require("./ai_service")
    const main = require("../src/gemini_test");
    async function test() {
        
         const result = await generateAIResponse("You are a cafe management assistant. Give 3 suggestions to increase cafe sales");
    console.log(result);

        
    }
    test()