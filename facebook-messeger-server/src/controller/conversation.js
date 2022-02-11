const statusResponse = require('../common/status')
const Conversation = require('../model/conversation')
const userModel = require('../model/user')

const createConversation = async (req, res) => {
    const { friendId } = req.body
    const { id } = req?.decoded || req.body
    try {
        const friendInfo = await userModel.findById(friendId);
        if (friendInfo == null) {
            throw new Error("friend not found")
        }
        const conversationInfo = await Conversation.findOne({
            members: {
                $all: [friendId, id]
            }
        })
        if (conversationInfo) {
            throw new Error("conversation existed")
        }
        const newConversation = await new Conversation({
            members: [id, friendId]
        }).save()
        await userModel.findByIdAndUpdate(id, {
            $push: {
                conversations: newConversation?._id
            }
        })
        await userModel.findByIdAndUpdate(friendId, {
            $push: {
                conversations: newConversation?._id
            }
        })
        res.json(newConversation)
    } catch (error) {
        res.json(error?.message)
    }
}
// modify
const createGroupConversation = async (req, res) => {
    const { name } = req.body
    const { id } = req?.decoded || req.body
    console.log(id)
    try {
        const newConversation = await new Conversation({
            members: [id], 
            is_group: true,
            name,
        }).save()
        await userModel.findByIdAndUpdate(id, {
            $push: {
                conversations: newConversation?._id
            }
        })
        const newName = name + " " + newConversation._id
        await Conversation.findByIdAndUpdate(newConversation._id, {$set: {"name": newName}})
        res.json(newConversation)
    } catch (error) {
        res.json(error?.message)
    }
}

const joinGroupConversation = async (req, res) => {
    const { conversationId } = req.body
    
    const { id } = req?.decoded || req.body

    try {
        const conversationInfo = await Conversation.findById(conversationId)
        
        if (!conversationInfo) {
            throw new Error("conversation not existed")
        }

        await Conversation.findByIdAndUpdate(conversationId,{ "$push": { "members": id } })
        await userModel.findByIdAndUpdate(id, { "$push": { "conversations": conversationInfo._id }})
        res.json("Ok")
    } catch (error) {
        res.json(error?.message)
    }
}

const addMessageToConversation = async (req, res) => {
    const { conversationId,content,kind } = req.body
    
    const { id } = req?.decoded || req.body

    try {
        const conversationInfo = await Conversation.findById(conversationId)
        
        if (!conversationInfo) {
            throw new Error("conversation not existed")
        }
    const sender = await userModel.findById(id)
    let created = Date.now()
        const newConversation = await Conversation.findByIdAndUpdate(conversationId, {
            $push: {
                messages: {
                    content,
                    kind,
                    status: "sent",
                    sender,
                    created
                }
            },
            $set: {
                last_message: {
                    content,
                    kind,
                    is_read: 0,
                    sender,
                    created
                }
            }
        }, { new: true }).populate({
            path: "members",
            select: "avatar username email"
        })

        res.json("Ok")
    } catch (error) {
        res.json(error?.message)
    }
}

const getMessages = async (req, res) => {
    const { conversation_id } = req.params
    
    const { id } = req?.decoded || req.body

    try {
        const conversationInfo = await Conversation.findById(conversation_id)
        
        if (!conversationInfo) {
            throw new Error("conversation not existed")
        }
        
        res.json(conversationInfo)
    } catch (error) {
        res.json(error?.message)
    }
}

//------------------

const getAllConversation = async (req, res) => {
    const { id } = req.decoded
    try {
        const { conversations } = await userModel.findById(id).populate({
            path: "conversations",
            populate: {
                path: "members",
                select: "username avatar email"
            },
            options: {
                sort: {
                    updatedAt: -1
                }
            }
        })
        if (!conversations) res.json(statusResponse.OK)
        conversations.map(e => {
            let { messages } = conversations

        })

        res.json({
            ...statusResponse.OK,
            data: [
                ...conversations
            ]
        })


    } catch (error) {
        res.json(statusResponse.UNKNOWN)
    }
}

const getConversation = async (req, res) => {
    const { user_id } = req.params
    const { id } = req.decoded
    try {
        if (!user_id) return res.json(statusResponse.PARAMS_MISS)
        if (user_id === id) {
            const { myConversation, username, email, avatar, _id } = await userModel.findById(id).populate('myConversation')
            return res.json({
                ...statusResponse.OK,
                data: {
                    member: {
                        username, email, avatar, _id
                    },
                    coversation: myConversation
                }
            })
        }
        const [userInfo, meInfo] = await Promise.all([
            userModel.findById(user_id).select("username email avatar conversations"),
            userModel.findById(id).select("username email avatar conversations").populate("conversations")])
        if (!meInfo || !user_id) return res.json(statusResponse.NOT_FOUND)
        const { conversations } = meInfo
        let conversationsJson = conversations && conversations.find(conversation => conversation?.members.some(x => x == user_id))
        res.json({
            ...statusResponse.OK,
            data: {
                member: userInfo,
                conversations: conversationsJson
            }
        })
    } catch (error) {
        console.log(error?.message)
    }
}

const deleteConversation = async (req, res) => {
    const { conversationId } = req.params
    try {
        const result = await Conversation.findByIdAndDelete(conversationId)
        res.json(result)
    } catch (error) {
        res.json(error?.message)
    }
}

const getLastConversation = async (req, res) => {
    const { id } = req.decoded
    try {
        const { conversations } = await userModel.findById(id).populate({
            path: "conversations",
            select: "members",
            sort: {
                _id: -1
            },
            limit: 1
        })
        res.json({
            ...statusResponse.OK,
            data: conversations
        })
    } catch (error) {

    }
}


const getAllMedias = async (req, res) => {
    const { conversationId } = req.query
    try {
        const { messages } = await Conversation.findById(conversationId)
        res.json({
            ...statusResponse.OK,
            data: messages.filter(x => x.kind === "images")
        })
    }
    catch (error) {
        res.json(statusResponse.UNKNOWN)
    }
}

module.exports = {
    createConversation,
    getAllConversation,
    getConversation,
    deleteConversation,
    getLastConversation,
    getAllMedias,
    joinGroupConversation,
    createGroupConversation,
    addMessageToConversation,
    getMessages
}