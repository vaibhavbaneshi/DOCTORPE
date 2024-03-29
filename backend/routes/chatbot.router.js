import express from 'express'
import { chatbot } from '../controllers/chatbot.controller.js'

export const chatbotRouter = express.Router()

chatbotRouter.post('/ask', chatbot)