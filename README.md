
-----

# 📚 Gerador de Boletim Escolar (TypeScript CLI)

Este projeto é um script de linha de comando (CLI) simples, escrito em **TypeScript** e executado no ambiente **Node.js**, que realiza o processamento de notas e faltas de um aluno para gerar um boletim de avaliação e registrar os dados em um arquivo CSV.

## ✨ Funcionalidades

O script realiza as seguintes tarefas:

1.  **Coleta de Dados:** Solicita o nome, série e o número de faltas do aluno via terminal.
2.  **Entrada de Notas:** Coleta 8 notas individualmente para 5 matérias obrigatórias: Matemática, Português, Geografia, História e Química.
3.  **Validação:** Garante que todas as notas inseridas estejam no intervalo de 0 a 10.
4.  **Cálculo e Regras:**
      * Média mínima para aprovação por disciplina: **7.0**.
      * Presença mínima obrigatória: **75%** (em cima de 100 aulas totais).
5.  **Geração de Boletim (.txt):** Cria um arquivo de texto detalhado com todas as notas, médias e a situação final do aluno.
6.  **Registro de Alunos (.csv):** Adiciona os dados básicos do aluno (Nome e Série) a um arquivo de registro geral (`registro_alunos.csv`).

## 🚀 Como Executar o Projeto

Para rodar este script, você precisa ter o **Node.js** (que inclui o `npm`) e o **TypeScript** configurados.

### 1\. Pré-requisitos (Instalação Global)

Certifique-se de que o Node.js e o TypeScript estão instalados:

```bash
# Verifique a instalação
node -v
npm -v
tsc -v
```

### 2\. Instalação de Dependências

Navegue até o diretório do projeto e instale as dependências necessárias para entrada de dados (`readline-sync`) e as tipagens do Node.js:

```bash
# Instala a biblioteca para leitura síncrona do console
npm install readline-sync

# Instala as tipagens do Node.js e do readline-sync para o TypeScript
npm install --save-dev @types/node @types/readline-sync ts-node typescript
```

### 3\. Execução

Use o `ts-node` para compilar e executar o arquivo TypeScript diretamente:

```bash
npx ts-node seu_arquivo_principal.ts
```

*(Substitua `seu_arquivo_principal.ts` pelo nome real do seu arquivo, como `boletim.ts` ou `index.ts`.)*

## ⚙️ Estrutura de Arquivos e Configuração

### `tsconfig.json`

A configuração do TypeScript é otimizada para o ambiente Node.js, garantindo compatibilidade com as bibliotecas nativas e a sintaxe de importação moderna:

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "esModuleInterop": true,         // Permite o 'import * as ...' com módulos CommonJS
    "strict": true,
    "skipLibCheck": true,
    // ...
  }
}
```

*(Se você encontrar o aviso `MODULE_TYPELESS_PACKAGE_JSON`, a solução é adicionar `"type": "module"` ao seu `package.json`.)*

### Arquivos de Saída

Após a execução, os seguintes arquivos serão gerados no diretório raiz do projeto:

| Arquivo | Formato | Conteúdo |
| :--- | :--- | :--- |
| `Boletim_[Nome do Aluno].txt` | TXT | Boletim completo e formatado com todas as notas, médias e o status final (Aprovado / Reprovado). |
| `registro_alunos.csv` | CSV | Arquivo de registro geral que armazena os dados de **todos** os alunos processados (adiciona uma linha a cada execução). |

-----

## 📝 Regras de Aprovação

| Critério | Regra | Mínimo Exigido |
| :--- | :--- | :--- |
| **Média por Disciplina** | Média aritmética das 8 notas | $\ge 7.0$ |
| **Frequência** | Presença em 75% das aulas | $\ge 75\%$ (Máximo de 25 faltas em 100 aulas) |
| **Situação Final** | **Aprovado** se atender aos dois critérios (Média $\ge 7.0$ em todas as disciplinas E Frequência OK). | |

-----