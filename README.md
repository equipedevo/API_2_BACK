# API_2_BACK

## Sumário
* [Empresa](#empresa)
    * [Cadastro](#empresa.cadastro)
    * [Login](#empresa.login)
    * [Listar Funcionarios](#empresa.listar.funcionarios)
* [Funcionario](#funcionario)
    * [Cadastro](#funcionario.cadastro)
    * [Login](#funcionario.login)
    * [Trocar Senha](#funcionario.trocarSenha)
    * [Pegar](#funcionario.pegar)
    * [Atribuir Chamado](#funcionario.atribuir.chamado)
    * [Delete](#funcionario.delete)
    * [Atualizar](#funcionario.atualizar)
* [Chamado](#chamado)
    * [Cadastro](#chamado.cadastro)
    * [Listar Todos](#chamado.listar.todos)
    * [Listar Meus](#chamado.listar.meus)
    * [Listar Atribuidos a Mim](#chamado.listar.meus.atribuidos)
    * [Pegar um](#chamado.pegar)
    * [Filtro](#chamado.filtro)
    * [Atualizar Status](#chamado.statusAtua)
    * [Atualizar Prioridade](#chamado.prioriAtua)
* [Chat](#chat)
    * [Nova Mensagem](#chat.novaMensagem)
    * [Mensagens](#chat.mensagens)

<br>

# Empresa <span id="empresa"></span>
## Cadastro <span id="empresa.cadastro"></span>
### POST - *hermezapi-back.vercel.app/*`empresa/cadastro`
Recebe os parâmetros `razaoSocial`, `cnpj`, `email` e `senha`.
* `razaoSocial`: Um campo de texto com a razão social da empresa.
* `cnpj`: Um campo de texto com o cnpj formatado.
* `email`: Um campo de texto com o e-mail da empresa.
* `senha`: Um campo de texto com a senha não criptografada.

### Retornos
* `200` - Cadastro feito com sucesso.
```
{
    msg: "Sucesso"
}
```
* `400` - Erro relacionado aos dados enviados.
```
{
    msg: "Erro ..."
}
```
* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)

## Login <span id="empresa.login"></span>
### POST - *hermezapi-back.vercel.app/*`empresa/login`
Recebe os parâmetros `email` e `senha`.
* `email`: Um campo de texto com o e-mail da empresa.
* `senha`: Um campo de texto com a senha não criptografada.

### Retornos
* `200` - Login feito com sucesso.
```
{
    msg: "Sucesso",
    emp_cod: 3,
    nome: "Empresa abc",
    cnpj: "12.345.678/0002-00",
    email: "empresa.abc@gmail.com"
}
```
* `400` - Erro relacionado aos dados enviados.
```
{
    msg: "Erro ..."
}
```
* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)

## Listar Funcionarios <span id="empresa.listar.funcionarios"></span>
### POST - *hermezapi-back.vercel.app/*`empresa/listar/funcionarios`
Recebe o parâmetro `emp_cod`.
* `emp_cod`: O código da empresa.

### Retornos
* `200` - Sucesso.
```
{
    msg: "Sucesso",
    funcionarios: [
        {
            fun_cod: 0,
            fun_nome: "Nome do Funcionário",
            fun_funcao: "função",
            fun_email: "email@gmail.com",
            fun_celular: "(12) 99999-9999",
            car_cod: 3,
            fun_dataNasc: "dd/mm/aaaa"
        },
        ...
    ]
}
```
* `400` - Erro relacionado aos dados enviados.
```
{
    msg: "Erro ..."
}
```
* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)

# Funcionario <span id="funcionario"></span>
## Cadastro <span id="funcionario.cadastro"></span>
### POST - *hermezapi-back.vercel.app/*`funcionario/cadastro`
Recebe os parâmetros `nome`, `funcao`, `email`, `celular`, `senha`, `car_cod` e `emp_cod`.
* `nome`: Um campo de texto com o nome do funcionário.
* `email`: Um campo de texto com o e-mail do funcionário.
* `celular`: Um campo de texto com o número de celular do funcionário.
* `senha`: Um campo de texto com a senha não criptografada.
* `car_cod`: Um campo numérico com o id do cargo daquele funcionário (Funcionário padrão: 1, Técnico: 2, Admin: 3).
* `emp_cod`: Código da empresa que está cadastrando o usuário (Não será um campo para o usuário colocar qualquer código, será enviado para o back o código da empresa que está logada realizando o cadastro).
* `funcao`: Um campo de texto com uma descrição da função que o funcionário exerce.

### Retornos
* `200` - Cadastro feito com sucesso.
```
{
    msg: "Sucesso"
}
```
* `400` - Erro relacionado aos dados enviados.
```
{
    msg: "Erro ..."
}
```
* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)

## Login <span id="funcionario.login"></span>
### POST - *hermezapi-back.vercel.app/*`funcionario/login`
Recebe os parâmetros `email` e `senha`.
* `email`: Um campo de texto com o e-mail do funcionário.
* `senha`: Um campo de texto com a senha não criptografada.

### Retornos
* `200` - Login feito com sucesso.
```
{
    msg: "Sucesso",
    fun_cod: 2,
    nome: "Funcionário Tal",
    email: "funcemail@gmail.com",
    celular: "(12) 98899-5893",
    funcao: "TI",
    car_cod: 1,
    emp_cod: 3
}
```
* `400` - Erro relacionado aos dados enviados.
```
{
    msg: "Erro ..."
}
```
* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)

## Trocar Senha <span id="funcionario.trocarSenha"></span>
### POST - *hermezapi-back.vercel.app/*`funcionario/trocarSenha`
Recebe os parâmetros `email`, `senha` e `novaSenha`.
* `email`: Um campo de texto com o e-mail do funcionário.
* `senha`: Um campo de texto com a senha não criptografada.
* `novaSenha`: Um campo de texto com a nova senha não criptografada.

### Retornos
* `200` - Senha alterada com sucesso.
```
{
    msg: "Sucesso"
}
```
* `400` - Erro relacionado aos dados enviados.
```
{
    msg: "Erro ..."
}
```
* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)



## Pegar <span id="funcionario.pegar"></span>
### POST - *hermezapi-back.vercel.app/*`funcionario/pegar`
Recebe os parâmetros `fun_cod` e `emp_cod`.
* `fun_cod`: O código do funcionário.
* `emp_cod`: O código da empresa a que o funcionário pertence.

### Retornos
* `200` - Valores retornados.
```
{
    msg: "Sucesso",
    nome: "Nome do Funcionário",
    funcao: "Função",
    email: "email",
    celular: "(12) 99999-9999"
}
```
* `400` - Erro relacionado aos dados enviados.
```
{
    msg: "Erro ..."
}
```
* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)

## Atribuir Chamado <span id="funcionario.atribuir.chamado"></span>
### POST - *hermezapi-back.vercel.app/*`funcionario/atribuirChamado`
Recebe os parâmetros `fun_cod` e `cha_cod`.
* `fun_cod`: O código do funcionário.
* `cha_cod`: O código do chamado.

### Retornos
* `200` - Valores retornados.
```
{
    msg: "Sucesso"
}
```
* `400` - Erro relacionado aos dados enviados.
```
{
    msg: "Erro ..."
}
```
* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)

## Deletar <span id="funcionario.delete"></span>
### POST - *hermezapi-back.vercel.app/*`funcionario/delete`
Recebe o parâmetro `fun_cod`.
* `fun_cod`: Um campo de número com o código do funcionário.

### Retornos
* `200` - Usuário deletado com sucesso.
```
{
    msg: "Usuário deletado com sucesso!"
}
```
* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)

## Atualizar <span id="funcionario.atualizar"></span>
### POST - *hermezapi-back.vercel.app/*`funcionario/atualizar`
Recebe os parâmetros `fun_cod`, `nome`, `funcao`, `email`, `celular` e `car_cod`.
* `fun_cod`: Um campo de número com o código do funcionário.
* `nome`: Um campo de texto com o novo nome do funcionário.
* `funcao`: Um campo de texto com uma descrição da nova função que o funcionário exercerá.
* `email`: Um campo de texto com o novo e-mail do funcionário.
* `celular`: Um campo de texto com o novo número de celular do funcionário.
* `car_cod`: Um campo de número com o novo id do cargo do funcionário (Funcionário padrão: 1, Técnico: 2, Admin: 3).

### Retornos
* `200` - Atualização realizada com sucesso.
```
{
    msg: "Dados do usuário atualizados com sucesso!"
}
```
* `400` - Erro devido algum erro de preenchimento ou dado enviado para o back.
```
    msg: "Não foi possível atualizar dados do funcionário devido algum erro de preenchimento"
```
* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)

# Chamado <span id="chamado"></span>
## Cadastro <span id="chamado.cadastro"></span>
### POST - *hermezapi-back.vercel.app/*`chamado/cadastro`
Deve ser enviado como `FormData` e sem `Content-Type` caso envie uma imagem.
Recebe os parâmetros `desc`, `local`, `titulo`, `fun_cod`, `emp_cod`, `serv`.
* `desc`: Um campo de texto com uma descrição do problema que o chamado referência.
* `local`: Um campo de texto com uma descrição do local onde o problema referenciado está.
* `titulo`: Um campo de texto que contém um breve título do chamado.
* `fun_cod`: Um campo numérico que vai conter o código do funcíonario responsável pelo chamado.
* `emp_cod`: Um campo numérico com o código da empresa resposável pelo chamado.
* `serv`: Código do tipo.
* Pode receber também um arquivo.

### Retornos
* `200` - Cadastro feito com sucesso.
```
{
    msg: "Chamada iniciado com sucesso"
}
```
* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)

## Listar Todos <span id="chamado.listar.todos"></span>
### POST - *hermezapi-back.vercel.app/*`chamado/getTodos`
Recebe o parâmetro `emp_cod`.
* `emp_cod`: Um campo numérico com o código da empresa.

### Retornos
* `200` - Cadastro feito com sucesso.
```
        [
            {
                cha_cod: 1,
                cha_desc: "Problema do chamado",
                cha_dataInicio: "2001-09-11T03:55:59.000Z",
                cha_dataFim: "2002-10-21T03:55:59.000Z",
                cha_local: "Local do problema",
                cha_titulo: "Título do problema",
                cha_prioridade: "2",
                fun_nome: "Funcionario tal",
                sta_nome: "Status tal",
                tecnico: "Tecnico tal",
                ser_nome: "Serviço tal"
            },
                ...
        ]

```
* `400` - Erro relacionado aos dados enviados.
```
{
    msg: "Erro ..."
}
```

* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)

## Listar Meus <span id="chamado.listar.meus"></span>
### POST - *hermezapi-back.vercel.app/*`chamado/getMeus`
Recebe o parâmetro `emp_cod`, `fun_cod`
* `emp_cod`: Um campo numérico com o código da empresa.
* `fun_cod`: Um campo numérico com o código do funcionário.

### Retornos
* `200` - Cadastro feito com sucesso.
```
        [
            {
                cha_cod: 1,
                cha_desc: "Problema do chamado",
                cha_dataInicio: "2001-09-11T03:55:59.000Z",
                cha_dataFim: "2002-10-21T03:55:59.000Z",
                cha_local: "Local do problema",
                cha_titulo: "Título do problema",
                cha_prioridade: "2",
                sta_nome: "Status tal",
                tecnico: "Tecnico tal",
                ser_nome: "Serviço tal"
            },
                ...
        ]

```
* `400` - Erro relacionado aos dados enviados.
```
{
    msg: "Erro ..."
}
```

* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)

## Listar Atribuidos a Mim <span id="chamado.listar.meus.atribuidos"></span>
### POST - *hermezapi-back.vercel.app/*`chamado/getMeusAtribuidos`
Recebe o parâmetro `emp_cod`, `tec_cod`
* `emp_cod`: Um campo numérico com o código da empresa.
* `tec_cod`: Um campo numérico com o código do tecnico.

### Retornos
* `200` - Cadastro feito com sucesso.
```
        [
            {
                cha_cod: 1,
                cha_desc: "Problema do chamado",
                cha_dataInicio: "2001-09-11T03:55:59.000Z",
                cha_dataFim: "2002-10-21T03:55:59.000Z",
                cha_local: "Local do problema",
                cha_titulo: "Título do problema",
                cha_prioridade: "2",
                sta_nome: "Status tal",
                tecnico: "Tecnico tal",
                ser_nome: "Serviço tal"
            },
                ...
        ]

```
* `400` - Erro relacionado aos dados enviados.
```
{
    msg: "Erro ..."
}
```

* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)

## Pegar <span id="chamado.pegar"></span>
### POST - *hermezapi-back.vercel.app/*`chamado/pegarUmChamado`
Recebe o parâmetro `emp_cod`, `fun_cod`, `cha_cod`
* `emp_cod`: Um campo numérico com o código da empresa.
* `fun_cod`: Um campo numérico com o código do funcionário.
* `cha_cod`: Um campo numérico com o código do chamado.

### Retornos
* `200` - Chamado retornado com sucesso.
```
    {
        cha_cod: 1,
        cha_desc: "Problema do chamado",
        cha_dataInicio: "2001-09-11T03:55:59.000Z",
        cha_dataFim: "2002-10-21T03:55:59.000Z",
        cha_local: "Local do problema",
        cha_titulo: "Título do problema",
        cha_prioridade: "2",
        fun_nome: "Funcionario tal",
        sta_nome: "Status tal",
        tecnico: "Tecnico tal",
        ser_nome: "Serviço tal"
    }
```
* `400` - Erro relacionado aos dados enviados.
```
{
    msg: "Erro ..."
}
```

* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)

## Filtro <span id="chamado.filtro"></span>
### POST - *hermezapi-back.vercel.app/*`chamado/getComFiltro`
Recebe os parâmetros: `emp_cod`, `priori`, `func`, `status`, `tipo`.
* `emp_cod`: Um campo numérico com o código da empresa.
* `priori`: Um campo numérico com o número da prioridade do chamado.
* `func`: Um campo de texto com o nome do funcionário responsável pelo chamado.
* `status`: Um campo de texto com o status do chamado.
* `tipo`: Um campo de texto com o tipo de serviço do chamado.


### Retornos
* `200` - Chamado retornado com sucesso.
```
    [
            {
                cha_cod: 1,
                cha_desc: "Problema do chamado",
                cha_dataInicio: "2001-09-11T03:55:59.000Z",
                cha_dataFim: "2002-10-21T03:55:59.000Z",
                cha_local: "Local do problema",
                cha_titulo: "Título do problema",
                cha_prioridade: "2",
                fun_nome: "Funcionario tal",
                sta_nome: "Status tal",
                tecnico: "Tecnico tal",
                ser_nome: "Serviço tal"
            },
                ...
        ]
```
* `400` - Erro relacionado aos dados enviados.
```
{
    msg: "Erro ..."
}
```

* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)

## Atualizar Status <span id="chamado.statusAtua"></span>
### POST - *hermezapi-back.vercel.app/*`chamado/atualizarStatus`
Recebe os parâmetros: `sta_cod`, `cha_cod`.
* `sta_cod`: Um campo numérico com o código do status desejado.
* `cha_cod`: Um campo numérico com o código do chamado desejado.

### Retornos
* `200` - Chamado atualizado com sucesso.
```
    {
        msg: Chamado atualizado com sucesso
    }
```
* `400` - Erro relacionado aos dados enviados.
```
{
    msg: "Erro ..."
}
```

* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)

## Atualizar Prioridade <span id="chamado.prioriAtua"></span>
### POST - *hermezapi-back.vercel.app/*`chamado/mudarPrioridade`
Recebe os parâmetros: `priori`, `cha_cod`.
* `priori`: Um campo numérico com o número da prioridade desejada.
* `cha_cod`: Um campo numérico com o código do chamado desejado.

### Retornos
* `200` - Chamado atualizado com sucesso.
```
    {
        msg: Chamado atualizado com sucesso
    }
```
* `400` - Erro relacionado aos dados enviados.
```
{
    msg: "Erro ..."
}
```

* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)

# Chat <span id="chat"></span>
## Nova Mensagen <span id="chat.novaMensagem"></span>
### POST - *hermezapi-back.vercel.app/*`chat/novaMensagem`
Deve ser enviado como `FormData` e sem `Content-Type` caso envie uma imagem.
Recebe os parâmetros `msg_texto`, `fun_cod`, `ct_cod`, `arq_cod`.
* `msg_texto`: Um campo de texto com o texto da mensagem.
* `fun_cod`: Um campo numérico com o código do funcionário que enviou a mensagem.
* `ct_cod`: Um campo numérico com o código do chamado a que essa mensagem pertence.
* Pode receber também um arquivo.

### Retornos
* `200` - Mensagens retornadas com sucesso.
```
{
    msg: "Sucesso"
}
```
* `400` - Erro relacionado aos dados enviados.
```
{
    msg: "Erro ..."
}
```
* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)

## Mensagens <span id="chat.mensagens"></span>
### POST - *hermezapi-back.vercel.app/*`chat/mensagens`
Recebe os parâmetros `cha_cod` e `pag`.
* `cha_cod`: Um campo numérico com o código do chamado.
* `pag`: Um número de "páginação" para as mensagens.

### Retornos
* `200` - Mensagens retornadas com sucesso.
```
{
    msg: "Sucesso",
    mensagens: [
        {
            texto: "texto da mensagem",
            arquivo: "url/do/arquivo/da/mensagem",
            remetente: código do funcionário que enviou a mensagem,
            dataEnvio: "dd/mm/aaaa"
        },
        ...
    ]
}
```
* `400` - Erro relacionado aos dados enviados.
```
{
    msg: "Erro ..."
}
```
* `500` - Erro.
```
{
    msg: "Erro ..."
}
```
<hr>

[Voltar ao topo](#sumário)


