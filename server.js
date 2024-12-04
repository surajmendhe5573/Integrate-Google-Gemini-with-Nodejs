const express= require('express');
const app= express();
const bodyParser= require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// middleware
app.use(express.json());
app.use(bodyParser.json());

const port= process.env.PORT || 4000

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Explain Backend deceloper ?";

const generate= async(prompt)=>{
    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text();
    } catch (error) {
        console.log(error);
        
    }
}

// generate();

app.get('/api/content', async(req, res)=>{
    try {
         const data= req.body.question;
         const result= await generate(data);
         res.send({
            "result": result
         })
         
    } catch (error) {
     console.log(error);
     
    }
 });

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
})
