# API_2_BACK

## Sumário
* [Empresa](#empresa)
    * [Cadastro](#empresa.cadastro)
    * [Login](#empresa.login)
* [Funcionario](#funcionario)
    * [Cadastro](#funcionario.cadastro)
    * [Login](#funcionario.login)
* [Chamado](#chamado)
    * [Chamado](#chamado)
    * [Chamado](#chamado)

<br>

# Empresa <span id="empresa"></span>
## Cadastro <span id="empresa.cadastro"></span>
### POST - *hermezapi-back.vercel.app/*`empresa/cadastro`
Recebe os os parâmetros `razaoSocial`, `cnpj`, `email` e `senha`.
* `razaoSocial`: Um campo de texto com a razão social da empresa.
* `cnpj`: Um campo de texto com o cnpj formatado.
* `email`: Um campo de texto com o email da empresa.
* `senha`: Um campo de texto com a senha não criptografada.

### Retornos
* `200` - Cadastro feito com sucesso.
```
{
    msg: "Sucesso"
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
Recebe os os parâmetros `email` e `senha`.
* `email`: Um campo de texto com o email da empresa.
* `senha`: Um campo de texto com a senha não criptografada.

### Retornos
* `200` - Login feito com sucesso.
```
{
    msg: "Sucesso",
    nome: "Empresa abc",
    cnpj: "12.345.678/0002-00",
    email: "empresa.abc@gmail.com"
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

# Funcionario <span id="funcionario"></span>
## Cadastro <span id="funcionario.cadastro"></span>
### POST - *hermezapi-back.vercel.app/*`funcionario/cadastro`
Recebe os os parâmetros `nome`, `funcao`, `email`, `celular`, `senha`, `cargo` e `emp_cod`.
* `nome`: Um campo de texto com o nome do funcionário.
* `email`: Um campo de texto com o e-mail do funcionário.
* `celular`: Um campo de texto com o número de celular do funcionário.
* `senha`: Um campo de texto com a senha não criptografada.
* `cargo`: Um campo de número com o número do cargo que aquele funcionário pertence (Funcionário padrão: 1, Técnico: 2, Admin: 3).
* `emp_cod`: Código da empresa que está cadastrando o usuário (Não será um campo para colocar qualquer código, será enviado para o back o código da empresa que está logada realizando o cadastro).
* `função`: Um campo de número com o número do cargo que aquele funcionário pertence ().

### Retornos
* `200` - Cadastro feito com sucesso.
```
{
    msg: "Sucesso"
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
Recebe os os parâmetros `Email` e `Senha`.
* `Email`: Um campo de texto com o email do funcionário.
* `Senha`: Um campo de texto com a senha não criptografada.

### Retornos
* `200` - Login feito com sucesso.
```
{
    msg: "Sucesso",
    nome: "Funcionário Tal",
    email: "funcemail@gmail.com",
    celular: "(12) 98899-5893",
    cargo: 1,
    emp_cod: 3
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