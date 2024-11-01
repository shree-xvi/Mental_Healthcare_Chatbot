require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
// const { callEmotionDetection } = require('./alert')
const chat = require('../model/chatModel')
const asyncHandler=require("express-async-handler")

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

let prompt = "The following is a conversation with a psychatrist. \n"



exports.askQuestion = asyncHandler(async (req, res) => {
  try {

    function chatToString(arr) {
      arr.map((item) => {
        prompt += "\nHuman:" + item.question + "\npsychatrist" + item.answer;
      });
    }

    const { question } = req.body;

    // const emotionFlag = await callEmotionDetection('I feel very depressed');
    // if (emotionFlag == 1) {
    //   console.log("ALRET!!!!")
    // } else {
    //   console.log("Don't worry")
    // }
    await axios.get(`http://localhost:8000/${question}`)
    .then((res)=console.log(res.data))
    .catch((error)=> {return res.status(400).send(error.message)})
    console.log(req.params.id)
    const cht1 = await chat.findById(req.params.id)
    chatToString(cht1.chat)
    // console.log(`${prompt} \nHuman: ${question}\npsychatrist: `)
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt} \nHuman: ${question}\npsychatrist:`,
      max_tokens: 64,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });
    cht1.chat.push({
      question: req.body.question,
      answer: response.data.choices[0].text
    })
    cht1.save()
    console.log(response.data.choices[0].text)

    return res.status(200).json(cht1);
  } catch (error) {
    return res.status(400).send(error.message);
  }
})


exports.getChatHistory = (req, res) => {
  try {
    chat.find({ user: req.user.id })
      .then(chats => { res.json(chats) })
  } catch (err) {
    return res.status(400).json(err.message)
  }
}

exports.getChat = asyncHandler(async (req, res) => {
  id = req.params.id
  const cht1 = await chat.findById(id)
  return res.status(200).send(cht1)
})



exports.createChat = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }
  try {
    console.log(req.user.id)
    const newChat = new chat({
      chat: [

      ],
      user:req.user.id
    })
    newChat.save()
    return res.status(200).json(newChat);
  } catch (error) {
    return res.status(400).send(error.message);
  }
})