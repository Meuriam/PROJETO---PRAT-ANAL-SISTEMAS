const messages = {
    user: {
        type: {
            "string.base": `"Tipo" deve ser do tipo 'texto'`,
            "string.only": `"Tipo de usuário" deve ser contratante ou contratado`,
            "string.empty": `"Tipo" não pode estar vazio`,
            "any.required": `"Tipo" é obrigatório`,
        },
        name: {
            "string.base": `"Nome" deve ser do tipo 'texto'`,
            "string.min": `"Nome" deve ter no mínimo {#limit} caracteres`,
            "string.max": `"Nome" deve ter no máximo {#limit} caracteres`,
            "string.empty": `"Nome" não pode estar vazio`,
            "any.required": `"Nome" é obrigatório`,
        },
        email: {
            "string.base": `"Email" deve ser do tipo 'texto'`,
            "string.email": `"Email" deve ser válido`,
            "string.min": `"Email" deve ter no mínimo {#limit} caracteres`,
            "string.max": `"Email" deve ter no máximo {#limit} caracteres`,
            "string.empty": `"Email" não pode estar vazio`,
            "any.required": `"Email" é obrigatório`,
        },
        password: {
            "string.base": `"Senha" deve ser do tipo 'texto'`,
            "string.min": `"Senha" deve ter no mínimo {#limit} caracteres`,
            "string.max": `"Senha" deve ter no máximo {#limit} caracteres`,
            "string.empty": `"Senha" não pode estar vazio`,
            "any.required": `"Senha" é obrigatório`,
        },
        birthday: {
            "date.max": `Lamentamos mas é preciso ser maior de 18 anos para cadastrar-se`, 
            "date.base": `"Data de nascimento" deve ser uma data válida`,
            "any.required": `"Data de nascimento" é obrigatório`,
        },
        services: {
            "string.base": `"Escolaridade" deve ser do tipo 'texto'`,
            "string.empty": `"Escolaridade" não pode estar vazio`,
            "any.required": `"Escolaridade" é obrigatório`,
        },
        researchDate: {
            "date.base": `"Data de início" deve ser uma data válida`,
            "any.required": `"Data de início" é obrigatório`,
        },
        state:  { 
            "any.required": `"Nome do estado" é obrigatório`,
            "string.base": `"Nome do estado" deve ser do tipo 'texto'`,
            "string.empty": `"Nome do estado" não pode estar vazio`
        }
    }
}

module.exports = messages