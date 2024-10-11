"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var people = [
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
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/info", function (req, res) {
    var date = new Date();
    var dateFormat = date.toString();
    res.send("<p>Phonebook has info for ".concat(people.length, " people</p><p>").concat(dateFormat, "<p>"));
});
app.get("/api/people", function (req, res, next) {
    res.json(people);
});
app.get("/api/people/:id", function (req, res) {
    var id = req.params.id;
    var person = people.find(function (person) { return person.id === Number(id); });
    if (!person) {
        return res.status(404).json({
            message: "Person with id:".concat(id, " not found"),
        });
    }
    return res.json(person);
});
app.delete("/api/people/:id", function (req, res) {
    var id = req.params.id;
    people = people.filter(function (person) { return person.id !== Number(id); });
    return res.status(204).end();
});
app.post("/api/people", function (req, res) {
    var maxId = people.length > 0 ? Math.max.apply(Math, people.map(function (n) { return n.id; })) : 0;
    var person = req.body;
    person.id = maxId + 1;
    if (!person.name) {
        return res.status(400).json({
            error: "name missing",
        });
    }
    if (!person.number) {
        return res.status(400).json({
            error: "number missing",
        });
    }
    people.push(person);
    return res.status(201).json(person);
});
app.put("/api/notes/:id", function (req, res) {
    var id = req.params.id;
    var body = req.body;
    var note = notes.find(function (note) { return note.id === Number(id); });
    if (!note) {
        return res.status(404).json({
            message: "Note with id:".concat(id, " not found"),
        });
    }
    var updatedNote = __assign(__assign({}, note), body);
    notes = notes.map(function (note) { return (note.id === Number(id) ? updatedNote : note); });
    return res.json(updatedNote);
});
var PORT = 9090;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
