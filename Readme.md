
## 🔧 Configurando a API

Este projeto utiliza a API REST do PocketBase como backend.

1. Faça o download do PocketBase no site oficial: https://pocketbase.io/
2. Extraia o arquivo compactado em uma pasta vazia
3. No Linux, execute o seguinte comando no terminal:

   ```
   ./pocketbase serve --http="0.0.0.0:8090"
   ```

4. Acesse o painel de administração: http://127.0.0.1:8090/_/
5. No painel do PocketBase, crie um usuário com os seguintes dados:
   - Usuário: fulano
   - Senha: pdm123pdm
6. Crie uma coleção chamada `cars` com os seguintes campos:

   ```
   brand: string (Texto simples)
   model: string (Texto simples)
   hp: number (Número)
   ```

7. Adicione alguns registros manualmente na coleção `cars` pela interface do PocketBase.
8. Configure as regras de acesso da coleção (ícone de engrenagem) com a regra:

   ```
   @request.auth.id != ""
   ```

---

## 🚀 Configurando o App

Este aplicativo está pré-configurado para rodar em um emulador Android no Linux.

1. Abra o arquivo: `src/services/api.ts`
2. Edite ou descomente a linha `baseUrl` e insira o IP local do seu computador.

   Para descobrir seu IP local, execute no terminal:

   ```
   ip a | grep inet
   ```

   ou

   ```
   hostname -I
   ```

   Copie o IP da sua rede (geralmente começa com 192. ou 10.) e use assim:

   ```ts
   const baseUrl = "http://SEU_IP_LOCAL:8090";
   ```

3. Inicie o Expo em modo túnel:

   ```
   npx expo start --tunnel
   ```

---

## 💤 Está com preguiça?

Há uma instância PocketBase já configurada na pasta `pocketbase/`.

Basta descompactar e rodar com:

```
./pocketbase serve --http="0.0.0.0:8090"
```

Conta de administrador já criada:

- E-mail: admin@example.com  
- Senha: 123123123123