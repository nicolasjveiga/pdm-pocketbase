# 🚗 Projeto PDM PocketBase + Expo

Aplicativo com backend portátil usando PocketBase e frontend em React Native com Expo.

---

## 🔧 Configurando a API

Este projeto utiliza a API REST do PocketBase como backend.

1. Faça o download do PocketBase no site oficial:  
   👉 https://pocketbase.io/

2. Extraia o arquivo compactado em uma pasta vazia

3. No Linux, execute o seguinte comando no terminal:

   ```bash
   ./pocketbase serve --http="0.0.0.0:8090"
   ```

4. Acesse o painel de administração:  
   👉 http://127.0.0.1:8090/_/

5. No painel do PocketBase, crie um usuário com os seguintes dados:
   - **Usuário:** fulano  
   - **Senha:** pdm123pdm

6. Crie uma coleção chamada `cars` com os seguintes campos:

   | Campo  | Tipo         |
   |--------|--------------|
   | brand  | string (Texto) |
   | model  | string (Texto) |
   | hp     | number (Número) |

7. Adicione alguns registros manualmente na coleção `cars` pela interface do PocketBase.

8. Configure as **regras de acesso** da coleção `cars` (ícone de engrenagem) com a regra:

   ```
   @request.auth.id != ""
   ```

---

## 🚀 Configurando o App

Este aplicativo está pré-configurado para rodar em um emulador Android ou celular real usando Expo.

### 1. Edite o IP local da sua máquina

Abra o arquivo:  
`src/services/api.ts`

Encontre esta linha:

```ts
const LOCAL_IP = "";
```

Para descobrir seu IP local, execute no terminal da máquina onde o PocketBase está rodando:

```bash
ip -4 a | grep inet
```

ou

```bash
hostname -I
```

Copie o IP da sua rede (geralmente algo como `192.168.0.x` ou `10.0.0.x`) e edite o arquivo assim:

```ts
const LOCAL_IP = "192.168.0.109"; // Exemplo
```

O código completo do `api.ts` deve ficar assim:

```ts
import { Platform } from "react-native";
import axios from "axios";

const LOCAL_IP = "192.168.0.109"; // Substitua pelo seu IP

const baseURL =
  Platform.OS === "web"
    ? "http://127.0.0.1:8090"
    : `http://${LOCAL_IP}:8090`;

export const api = axios.create({ baseURL });
```

---

### 2. Inicie o Expo com modo túnel

Isso garante que seu celular consiga acessar o projeto mesmo fora da rede local:

```bash
npx expo start --tunnel
```

---

## ✅ Teste

Após configurar o IP e rodar o backend e frontend:

- Acesse o app no seu celular com o app **Expo Go**
- Verifique se os dados da coleção `cars` estão sendo carregados corretamente

Se aparecer **"Network Error"**, certifique-se de:
- Ter usado o IP correto
- O backend estar rodando com `0.0.0.0:8090`
- O firewall estar liberando a porta
- O Expo estar rodando com `--tunnel`
