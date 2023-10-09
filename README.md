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
Recebe os os parâmetros `nome`, `cnpj`, `email` e `senha`.
* `nome`: Um campo de texto com o nome da empresa.
* `cnpj`: Um campo de texto com o cnpj formatado.
* `email`: Um campo de texto com o email da empresa.
* `senha`: Um campo de texto com a senha não criptografada.

### Retornos
* `200` - Cadastro feito com sucesso.
* `500` - Erro. Uma string descrevendo o erro será retornada.
<hr>

[Voltar ao topo](#sumário)

## Login <span id="empresa.login"></span>
### POST - *hermezapi-back.vercel.app/*`empresa/login`
Recebe os os parâmetros `email` e `senha`.
* `email`: Um campo de texto com o email da empresa.
* `senha`: Um campo de texto com a senha não criptografada.

### Retornos
* `200` - Login feito com sucesso. Um `json` como o abaixo será retornado.
```
{
    nome: "Empresa abc",
    cnpj: "12.345.678/0002-00",
    email: "empresa.abc@gmail.com"
}
```
* `500` - Erro. Um string descrevendo o erro será retornada.
<hr>

[Voltar ao topo](#sumário)

<br>

# Funcionario <span id="funcionario"></span>
## Cadastro <span id="funcionario.cadastro"></span>
### POST - *hermezapi-back.vercel.app/*`funcionario/cadastro`
Recebe os os parâmetros `Nome`, <!-- `Função`,  --> `Email`, `Celular`, `Senha`, `Cargo` e `Emp_Cod`.
* `Nome`: Um campo de texto com o nome do funcionário.
* `Email`: Um campo de texto com o e-mail do funcionário.
* `Celular`: Um campo de texto com o número de celular do funcionário.
* `Senha`: Um campo de texto com a senha não criptografada.
* `Cargo`: Um campo de número com o número do cargo que aquele funcionário pertence (Funcionário padrão: 1, Técnico: 2, Admin: 3).
* `Emp_Cod`: Código da empresa que está cadastrando o usuário (Não será um campo para colocar qualquer código, será enviado para o back o código da empresa que está logada realizando o cadastro).
<!-- * `Função`: Um campo de número com o número do cargo que aquele funcionário pertence (). -->

### Retornos
* `200` - Cadastro feito com sucesso.
* `500` - Erro. Uma string descrevendo o erro será retornada.
<hr>

[Voltar ao topo](#sumário)

## Login <span id="funcionario.login"></span>
### POST - *hermezapi-back.vercel.app/*`funcionario/login`
Recebe os os parâmetros `x` e `y`.
* `x`: Um campo de texto com ...
* `y`: Um campo de texto com ...

### Retornos
* `200` - Login feito com sucesso. Um `json` como o abaixo será retornado.
```
{
    x: "a",
    y: "b",
    z: "c"
}
```
* `500` - Erro. Um string descrevendo o erro será retornada.
<hr>

[Voltar ao topo](#sumário)


