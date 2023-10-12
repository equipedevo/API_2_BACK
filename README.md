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
Recebe os os parâmetros `email` e `senha`.
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

# Funcionario <span id="funcionario"></span>
## Cadastro <span id="funcionario.cadastro"></span>
### POST - *hermezapi-back.vercel.app/*`funcionario/cadastro`
Recebe os os parâmetros `nome`, `funcao`, `email`, `celular`, `senha`, `car_cod` e `emp_cod`.
* `nome`: Um campo de texto com o nome do funcionário.
* `email`: Um campo de texto com o e-mail do funcionário.
* `celular`: Um campo de texto com o número de celular do funcionário.
* `senha`: Um campo de texto com a senha não criptografada.
* `car_cod`: Um campo de número com o id do cargo daquele funcionário (Funcionário padrão: 1, Técnico: 2, Admin: 3).
* `emp_cod`: Código da empresa que está cadastrando o usuário (Não será um campo para o usuário colocar qualquer código, será enviado para o back o código da empresa que está logada realizando o cadastro).
* `função`: Um campo de texto com uma descrição da função que o funcionário exerce.

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
Recebe os os parâmetros `Email` e `Senha`.
* `Email`: Um campo de texto com o e-mail do funcionário.
* `Senha`: Um campo de texto com a senha não criptografada.

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