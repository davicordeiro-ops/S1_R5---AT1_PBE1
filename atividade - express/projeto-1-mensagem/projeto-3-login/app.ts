
import express from "express";
import type { Request, Response } from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT: number = 3002;

// Permite receber dados no formato JSON
app.use(express.json());

// Rota POST /login
app.post("/login", (req: Request, res: Response) => {

    // Recebe usuário e senha
    const { usuario, senha } = req.body;

    // Verifica se os campos foram preenchidos
    if (
        typeof usuario !== "string" ||
        !usuario.trim() ||
        typeof senha !== "string" ||
        !senha
    ) {
        return res.status(400).json({
            erro: "Informe usuário e senha."
        });
    }

    try {

        // Lê o arquivo usuarios.json
        const caminho = path.join(__dirname, "usuarios.json");
        const dados = fs.readFileSync(caminho, "utf8");

        // Converte o JSON em objeto JavaScript
        const usuarioCorreto: { usuario: string; senha: string } = JSON.parse(dados);

        // Compara usuário e senha
        if (
            usuario === usuarioCorreto.usuario &&
            senha === usuarioCorreto.senha
        ) {
            return res.status(200).json({
                mensagem: "Login realizado com sucesso!"
            });
        }

        // Retorna erro se os dados estiverem incorretos
        return res.status(401).json({
            erro: "Usuário ou senha incorretos.",
            usuario: usuario
        });

    } catch (erro) {

        // Trata possíveis erros na leitura do arquivo
        return res.status(500).json({
            erro: "Erro ao verificar os dados do usuário."
        });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

