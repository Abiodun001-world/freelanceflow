# freelanceflow
A Freelancer Invoice &amp; Payment Management API + Dashboard  Built with Node.js + Express.
A REST API that helps freelancers manage clients, track invoices, and monitor payments — built for the DevCareer × Raenest Freelancer Hackathon.

---

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Deployment:** Render

---

##  Features

- Create and manage clients
- Create and track invoices with currency support
- Auto-detect and mark overdue invoices
- Dashboard stats (total, paid, pending, overdue)
- Clean error handling and request logging

---

##  Project Structure
```
src/
├── controllers/
│   ├── client.controller.ts
│   └── invoice.controller.ts
├── middleware/
│   └── errorHandler.ts
├── routes/
│   ├── client.routes.ts
│   └── invoice.routes.ts
├── types/
│   └── index.ts
├── db.ts
└── index.ts
prisma/
└── schema.prisma
```

---

##  Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL

### Installation
```bash
# Clone the repo
git clone https://github.com/Abiodun001-world/freelanceflow.git
cd freelanceflow

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migration
npx prisma migrate dev --name init

# Start development server
npm run dev
```

---

## 🌍 Environment Variables

Create a `.env` file in the root:
```
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/freelanceflow"
```

---

## �endpoints API Endpoints

### Clients
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/clients/all` | Get all clients |
| GET | `/api/clients/:id` | Get client by ID |
| POST | `/api/clients/create` | Create a client |
| PUT | `/api/clients/update/:id` | Update a client |
| DELETE | `/api/clients/:id` | Delete a client |

### Invoices
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/invoices/all` | Get all invoices |
| GET | `/api/invoices/stats` | Get dashboard stats |
| GET | `/api/invoices/:id` | Get invoice by ID |
| POST | `/api/invoices/create` | Create an invoice |
| PATCH | `/api/invoices/update/:id/status` | Update invoice status |
| DELETE | `/api/invoices/:id` | Delete an invoice |

---

## 📦 Sample Request

### Create a Client
```json
POST /api/clients/create
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Abiodun Tennis Services"
}
```

### Create an Invoice
```json
POST /api/invoices/create
{
  "clientId": "client-id",
  "title": "Website Design",
  "amount": 500,
  "currency": "USD",
  "dueDate": "2026-03-30"
}
```

---

## 👨🏾‍💻 Author

**Abiodun Adekunle**
- GitHub: [@Abiodun001-world](https://github.com/Abiodun001-world)
- Twitter: [@Abiodun0019](https://twitter.com/Abiodun0019)

---

## 📄 License

MIT