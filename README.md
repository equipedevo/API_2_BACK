# API_2_BACK

## Sumário
* [Empresa](#empresa)
* [Funcionario](#funcionario)
* [Chamado](#chamado)


<br><br><br><br><br>


# Empresa
## Cadastro
### POST - *hermezapi-back.vercel.app/*`empresa/cadastro`
Recebe os os parâmetros `nome`, `cnpj`, `email` e `senha`.
* `nome`: Um campo de texto com o nome da empresa.
* `cnpj`: Um campo de texto com o cnpj formatado.
* `email`: Um campo de texto com o email da empresa.
* `senha`: Um campo de texto com a senha não criptografada.

### Retornos
* `200` - Cadastro feito com sucesso.
* `500` - Erro. Um string descrevendo o erro será retornada.
<hr>

[Voltar ao topo](#sumário)

## Login
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

<br><br><br>

# Funcionario
## Cadastro
### POST - *hermezapi-back.vercel.app/*`funcionario/cadastro`
Recebe os os parâmetros `x`, `y`, `z` e `w`.
* `x`: Um campo de texto com ...
* `y`: Um campo de texto com ...
* `z`: Um campo de texto com ...
* `w`: Um campo de texto com ...

### Retornos
* `200` - Cadastro feito com sucesso.
* `500` - Erro. Um string descrevendo o erro será retornada.
<hr>

[Voltar ao topo](#sumário)

## Login
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


