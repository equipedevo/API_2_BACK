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
* [Chamado](#chamado)
    * [Cadastro](#chamado.cadastro)
    * [Listar Todos](#chamado.listar.todos)
    * [Listar Meus](#chamado.listar.meus)
    * [Pegar um](#chamado.pegar)
    * [Filtro](#chamado.filtro)
    * [Atualizar status](#chamado.atualizar)
* [Chat](#chat)
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

## Login <span id="funcionario.trocarSenha"></span>
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

# Chamado <span id="chamado"></span>
## Cadastro <span id="chamado.cadastro"></span>
### POST - *hermezapi-back.vercel.app/*`chamado/cadastro`
Recebe os parâmetros `desc`, `local`, `titulo`, `codFun`, `codEmp`.
* `desc`: Um campo de texto com uma descrição do problema que o chamado referência.
* `local`: Um campo de texto com uma descrição do local onde o problema referenciado está.
* `titulo`: Um campo de texto que contém um breve título do chamado.
* `codFun`: Um campo numérico que vai conter o código do funcíonario responsável pelo chamado.
* `codEmp`: Um campo numérico com o código da empresa resposável pelo chamado.

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
Recebe o parâmetro `codEmp`.
* `codEmp`: Um campo numérico com o código da empresa.

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
Recebe o parâmetro `codEmp`, `fun_cod`
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
Recebe os parâmetros: `emp_cod`, `priori`, `data`, `func`, `status`, `tipo`.
* `emp_cod`: Um campo numérico com o código da empresa.
* `priori`: Um campo numérico com o número da prioridade do chamado.
* `data`: Um campo de texto com a data do chamado.
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

## Atualizar Status <span id="chamado.atualizar"></span>
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

# Chat <span id="chat"></span>
## Mensagens <span id="chat.mensagens"></span>
### POST - *hermezapi-back.vercel.app/*`chat/mensagens`
Recebe os parâmetros `cha_cod`, `pag`.
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
            remetente: "nome do remetente",
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

<br>
