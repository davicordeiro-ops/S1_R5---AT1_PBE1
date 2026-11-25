
import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT: number = 3000;

// Permite receber dados no formato JSON
app.use(express.json());

// Rota POST /mensagem
app.post("/mensagem", (req: Request, res: Response) => {

    // Recebe os dados enviados pelo cliente
    const { nome, idade, time } = req.body;

    // Verifica se os campos foram preenchidos
    if (
        typeof nome !== "string" ||
        !nome.trim() ||
        typeof idade !== "number" ||
        !Number.isInteger(idade) ||
        idade < 0 ||
        typeof time !== "string" ||
        !time.trim()
    ) {
        return res.status(400).json({
            erro: "Informe nome, idade válida e time favorito."
        });
    }

    // Cria a mensagem com os dados recebidos
    const mensagem = `Olá, ${nome}! Você tem ${idade} anos e torce para o ${time}!`;

    // Retorna a resposta
    res.status(200).json({
        mensagem: mensagem
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
