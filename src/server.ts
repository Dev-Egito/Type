import express from "express";

const app = express();
app.use(express.json());

const PORT: number = 3000;

interface Usuario {
    id: number;
    nome: String;
    telefone: String;
}

const usuarios: Usuario[] = [];
usuarios.push ({id: 1, nome: "Matheus", telefone: "1234567"}, {id: 2, nome: "Egito", telefone: "1234567"})

app.get("/usuarios", (req, res) => {
    res.json(usuarios);
});

app.get("/usuarios/:id", (req, res) => {
    const idUsuario: Number = Number(req.params.id);
    const usuarioEncontrado: Usuario | undefined = usuarios.find((u) => u.id === idUsuario);
    if (usuarioEncontrado) res.json(usuarioEncontrado);
    else res.status(404).json(`Úsuario de id ${idUsuario} não encontrado`);
})

app.listen(PORT, () => {
    console.log(`A API subiu na porta ${PORT}`)
});