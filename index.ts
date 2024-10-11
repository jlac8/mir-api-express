import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

type Person = {
  id: number;
  name: string;
  number: string;
};

let people: Person[] = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const app = express();

app.use(express.json());

morgan.token("body", (req: Request) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

app.use(
  // tiny format: The minimal output.
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/info", (req: Request, res: Response) => {
  const date = new Date();
  const dateFormat = date.toString();
  res.send(
    `<p>Phonebook has info for ${people.length} people</p><p>${dateFormat}<p>`
  );
});

app.get("/api/people", (req: Request, res: Response, next: NextFunction) => {
  res.json(people);
});

app.get("/api/people/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res.status(404).json({
      message: `Person with id:${id} not found`,
    });
  }

  return res.json(person);
});

app.delete("/api/people/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  people = people.filter((person) => person.id !== Number(id));

  return res.status(204).end();
});

app.post("/api/people", (req: Request, res: Response) => {
  const { name } = req.body;
  const maxId = people.length > 0 ? Math.max(...people.map((n) => n.id)) : 0;

  const person: Person = req.body;
  person.id = maxId + 1;

  if (!person.name || !person.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }

  if (people.some(() => person.name.toLowerCase() === name.toLowerCase())) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  people.push(person);

  return res.status(201).json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
