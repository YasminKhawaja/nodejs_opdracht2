// Fake databank: statische array
let messages = [
  { id: 1, user: 'Pikachu', text: "nodejs isn't hard, or is it?" },
  { id: 2, user: 'Charmander', text: 'Express makes it easy!' },
  { id: 3, user: 'Pikachu', text: 'Pika pika!' },
]
let nextId = 4

const notFound = (res, id) =>
  res.status(404).json({
    status: 'fail',
    message: `Message with id ${id} not found`,
    data: null,
  })

// GET /api/v1/messages  (+ optioneel ?user=username)
export const list = (req, res) => {
  const { user } = req.query
  const result = user
    ? messages.filter((m) => m.user.toLowerCase() === String(user).toLowerCase())
    : messages

  res.json({
    status: 'success',
    message: user ? `Messages from user ${user}` : 'GETTING all messages',
    data: { messages: result },
  })
}

// GET /api/v1/messages/:id
export const show = (req, res) => {
  const message = messages.find((m) => m.id === Number(req.params.id))
  if (!message) return notFound(res, req.params.id)

  res.json({
    status: 'success',
    message: `GETTING message with id ${message.id}`,
    data: { message },
  })
}

// POST /api/v1/messages   body: { "message": { "user": "...", "text": "..." } }
export const create = (req, res) => {
  const body = req.body?.message
  if (!body?.user || !body?.text) {
    return res.status(400).json({
      status: 'fail',
      message: 'Body must be { message: { user, text } }',
      data: null,
    })
  }

  const message = { id: nextId++, user: body.user, text: body.text }
  messages.push(message)

  res.status(201).json({
    status: 'success',
    message: 'Message created',
    data: { message },
  })
}

// PUT /api/v1/messages/:id   body: { "message": { "user"?: "...", "text"?: "..." } }
export const update = (req, res) => {
  const message = messages.find((m) => m.id === Number(req.params.id))
  if (!message) return notFound(res, req.params.id)

  const body = req.body?.message
  if (!body?.user && !body?.text) {
    return res.status(400).json({
      status: 'fail',
      message: 'Body must be { message: { user?, text? } }',
      data: null,
    })
  }

  if (body.user) message.user = body.user
  if (body.text) message.text = body.text

  res.json({
    status: 'success',
    message: `Message with id ${message.id} updated`,
    data: { message },
  })
}

// DELETE /api/v1/messages/:id
export const destroy = (req, res) => {
  const index = messages.findIndex((m) => m.id === Number(req.params.id))
  if (index === -1) return notFound(res, req.params.id)

  messages.splice(index, 1)

  res.json({
    status: 'success',
    message: `Message with id ${req.params.id} deleted`,
  })
}
