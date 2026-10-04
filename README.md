# Chat API

Basic JSON-API (JSend) voor een latere live chat. Gebouwd met clwy-express-generator.

## Starten
npm install
npm run dev

## Routes
- GET    /api/v1/messages
- GET    /api/v1/messages?user=Pikachu
- GET    /api/v1/messages/:id
- POST   /api/v1/messages      body: { "message": { "user": "Pikachu", "text": "hallo" } }
- PUT    /api/v1/messages/:id  body: { "message": { "text": "aangepast" } }
- DELETE /api/v1/messages/:id
