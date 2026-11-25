
import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT: number = 3001;

// Permite receber dados no formato JSON
app.use(express.json());

// Rota POST /soma
app.post("/soma", (req: Request, res: Response) => {

    // Recebe os três números
    const { numero1, numero2, numero3 } = req.body;

    // Verifica se os valores são números válidos
    if (
        typeof numero1 !== "number" ||
        typeof numero2 !== "number" ||
        typeof numero3 !== "number" ||
        !Number.isFinite(numero1) ||
        !Number.isFinite(numero2) ||
        !Number.isFinite(numero3)
    ) {
        return res.status(400).json({
            erro: "Os três campos devem conter valores numéricos."
        });
    }

    // Realiza a soma
    const resultado: number = numero1 + numero2 + numero3;

    // Retorna o resultado
    res.status(200).json({
        resultado: resultado
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
