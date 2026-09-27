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

app.post("/usuarios", (req, res) => {
    const {nome, telefone} = req.body;

    if (!nome || !telefone){
        return res.status(400).json({mensagem: "Nome e telefone são obrigatórios"});
    }

    const usuarioNovo: Usuario = {
        id: usuarios.length + 1,
        nome: nome,
        telefone: telefone
    };

    usuarios.push(usuarioNovo);

    return res.status(201).json(usuarioNovo);
})

app.delete("/usuarios/:id", (req, res) => {
    const idUsuario = Number(req.params.id);

    const indexUsuarios = usuarios.findIndex((u) => u.id === idUsuario);

    if (indexUsuarios === -1){
        return res.status(404).json({mensagem: `Usuário de id ${idUsuario} não encontrado`});
    }

    usuarios.splice(indexUsuarios, 1); 
    
    return res.json({mensagem: `Usuário de id ${idUsuario} deletado`});
})

app.put("/usuarios/:id", (req, res) => {
    const idUsuario = Number(req.params.id);
    const {nome, telefone} = req.body;

    const usuarioEncontrado = usuarios.find((u) => u.id === idUsuario);

    if (!usuarioEncontrado) {
        return res.status(404).json({mensagem: `Usuário de id ${idUsuario} não encontrado`});
    }

    if (nome) usuarioEncontrado.nome = nome;
    if (telefone) usuarioEncontrado.telefone = telefone;

    return res.json({
        mensagem: `Usuário atualizado com sucesso!`,
        usuario: usuarioEncontrado
    })
})

app.listen(PORT, () => {
    console.log(`A API subiu na porta ${PORT}`)
});