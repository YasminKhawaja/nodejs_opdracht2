import express from 'express'
import messagesRouter from '../routes/messages.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Chat API is running',
    data: { endpoint: '/api/v1/messages' },
  })
})

router.use('/api/v1/messages', messagesRouter)

export default router
