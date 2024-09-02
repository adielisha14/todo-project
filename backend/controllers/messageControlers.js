const asyncHandler=require("express-async-handler")
const Message = require('../models/messageModel');
const User = require("../models/User");
const Chat =require("../models/chatModel")
const { error } = require("console");

const sendMessage = asyncHandler(async(req,res)=>{
    const { content, chatId }=req.body
    if (!content||!chatId) {
        console.log("invalid date from request");
        return res.sendStatus(400);
        
    }
    let newMessage={
        sender:req.user._id,
        content: content,
        chat: chatId
    }
    try {
        let message = await Message.create(newMessage);
        message= await message.populate("sender","username image");
        message= await message.populate("chat");
        message= await User.populate(message,{
            path:'chat.users',
            select:'username image email'
        })
        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message,
        })
        res.json(message)
    } catch (err) {
        res.status(201)
        return new Error(err)
        
    }
})

const allMessages =asyncHandler(async(req,res)=>{
    try {
        const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender","username image email")
        .populate("chat")
        res.json(messages)
    } catch (error) {
        return new Error(error)
    }
})

module.exports = {sendMessage,allMessages}