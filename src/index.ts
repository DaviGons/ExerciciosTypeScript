import * as readline from "readline-sync";
import * as fs from "fs";
import * as path from "path";

// -----------------------------------------------------------
// 1. Funções de Apoio
// -----------------------------------------------------------

/**
 * Pede 8 notas para uma matéria e as armazena no array fornecido.
 * Valida se as notas estão entre 0 e 10.
 * @param materia O nome da matéria.
 * @param notasArray O array onde as notas serão armazenadas.
 */
function pedirNotas(materia: string, notasArray: number[]) {
  console.log(`\n--- Digite 8 notas para a matéria ${materia} ---`);
  for (let i = 0; i < 8; i++) {
    let notaStr = readline.question(`Nota ${i + 1}: `);
    let nota = parseFloat(notaStr);

    while (isNaN(nota) || nota < 0 || nota > 10) {
      console.log("Nota inválida! Digite uma nota entre 0 e 10.");
      notaStr = readline.question(`Nota ${i + 1}: `);
      nota = parseFloat(notaStr);
    }

    notasArray.push(nota);
  }
}

/**
 * Calcula a média aritmética das notas de um array.
 * @param notas O array de notas.
 * @returns A média das notas.
 */
function calcularMedia(notas: number[]): number {
    if (notas.length === 0) return 0;
    const soma = notas.reduce((acc, nota) => acc + nota, 0);
    return soma / notas.length;
}

/**
 * Determina a situação do aluno (Aprovado, Reprovado por Nota) em uma matéria.
 * @param media A média do aluno na matéria.
 * @param mediaMinima A média mínima para aprovação (geralmente 7.0).
 * @returns A string da situação.
 */
function determinarSituacao(media: number, mediaMinima: number = 7.0): string {
    return media >= mediaMinima ? "APROVADO" : "REPROVADO POR NOTA";
}


// -----------------------------------------------------------
// 2. Variáveis e Coleta de Dados
// -----------------------------------------------------------

const totalAulas = 100;
const presencaMinima = 0.75; // 75%
const mediaMinima = 7.0;

let matem: number[] = [];
let historia: number[] = [];
let geo: number[] = [];
let port: number[] = [];
let quimica: number[] = [];

console.log("==========================================");
console.log("  GERADOR DE BOLETIM ESCOLAR");
console.log("==========================================");

const nome = readline.question("Nome do aluno: ");
const serie = readline.question("Série do aluno: ");

let faltasStr = readline.question("Número de faltas (máx. 100): ");
let faltas = Number(faltasStr);

// Validação de faltas
while (isNaN(faltas) || faltas < 0 || faltas > totalAulas) {
    console.log(`Faltas inválidas! Digite um número entre 0 e ${totalAulas}.`);
    faltasStr = readline.question("Número de faltas: ");
    faltas = Number(faltasStr);
}

// Coleta das notas
pedirNotas("Matemática", matem);
pedirNotas("História", historia);
pedirNotas("Geografia", geo);
pedirNotas("Português", port);
pedirNotas("Química", quimica);


// -----------------------------------------------------------
// 3. Processamento dos Dados
// -----------------------------------------------------------

const taxaPresenca = (totalAulas - faltas) / totalAulas;
const situacaoGeralFaltas = taxaPresenca >= presencaMinima ? "OK" : `REPROVADO POR FALTA (${(taxaPresenca * 100).toFixed(2)}% de presença)`;

// Array de objetos para facilitar o processamento e a escrita
const disciplinas = [
    { nome: "Matemática", notas: matem },
    { nome: "História", notas: historia },
    { nome: "Geografia", notas: geo },
    { nome: "Português", notas: port },
    { nome: "Química", notas: quimica },
];

const resultados = disciplinas.map(disc => {
    const media = calcularMedia(disc.notas);
    const situacao = determinarSituacao(media, mediaMinima);
    return {
        ...disc,
        media: media,
        situacao: situacao
    };
});

// -----------------------------------------------------------
// 4. Geração do Arquivo de Boletim (TXT)
// -----------------------------------------------------------

const nomeArquivo = `Boletim_${nome.replace(/\s/g, '_')}.txt`;

// Constrói o conteúdo do arquivo
let conteudoBoletim = "================================================\n";
conteudoBoletim += `             BOLETIM ESCOLAR\n`;
conteudoBoletim += "================================================\n";
conteudoBoletim += `Aluno: ${nome}\n`;
conteudoBoletim += `Série: ${serie}\n`;
conteudoBoletim += "------------------------------------------------\n";
conteudoBoletim += `Faltas: ${faltas} / ${totalAulas} Aulas\n`;
conteudoBoletim += `Presença Mínima: ${presencaMinima * 100}%\n`;
conteudoBoletim += `Situação por Faltas: ${situacaoGeralFaltas}\n`;
conteudoBoletim += "================================================\n";
conteudoBoletim += `                NOTAS E RESULTADOS\n`;
conteudoBoletim += "================================================\n";

// Adiciona os resultados das disciplinas
resultados.forEach(res => {
    // Formata o array de notas para exibição
    const notasFormatadas = res.notas.map(n => n.toFixed(1)).join(', ');

    conteudoBoletim += `DISCIPLINA: ${res.nome}\n`;
    conteudoBoletim += `  Notas: [${notasFormatadas}]\n`;
    conteudoBoletim += `  Média: ${res.media.toFixed(2)}\n`;
    conteudoBoletim += `  Situação: ${res.situacao}\n`;
    conteudoBoletim += "------------------------------------------------\n";
});

// Mensagem final
let resultadoFinal = "APROVADO";
if (situacaoGeralFaltas.startsWith("REPROVADO")) {
    resultadoFinal = situacaoGeralFaltas;
} else if (resultados.some(res => res.situacao === "REPROVADO POR NOTA")) {
    resultadoFinal = "REPROVADO POR NOTA (em uma ou mais disciplinas)";
}

conteudoBoletim += `\nRESULTADO FINAL GERAL: ${resultadoFinal}\n`;
conteudoBoletim += "================================================\n";


// -----------------------------------------------------------
// 5. Escrita dos Arquivos (TXT e CSV)
// -----------------------------------------------------------

const csvFileName = 'registro_alunos.csv';
const csvPath = path.resolve(csvFileName);

try {
    // 5a. Escreve o arquivo de Boletim (TXT)
    const caminhoCompletoTxt = path.resolve(nomeArquivo);
    fs.writeFileSync(caminhoCompletoTxt, conteudoBoletim);
    console.log(`\n\n✅ BOLETIM (TXT) GERADO COM SUCESSO!`);
    console.log(`Arquivo salvo em: ${caminhoCompletoTxt}`);
    
    
    // 5b. Registra o Aluno no arquivo CSV
    
    // Verifica se o arquivo CSV existe para determinar se precisa do cabeçalho
    const fileExists = fs.existsSync(csvPath);
    let csvContent = "";
    
    if (!fileExists) {
        // Se o arquivo não existe, adiciona o cabeçalho
        csvContent = "Nome,Série\n";
    }
    
    // Adiciona a linha do aluno. (Envolve o nome e a série em aspas para garantir
    // que nomes com vírgulas ou espaços não quebrem o formato CSV)
    const nomeSeguro = `"${nome.replace(/"/g, '""')}"`; // Escapa aspas duplas
    const serieSegura = `"${serie.replace(/"/g, '""')}"`;
    csvContent += `NOME: ${nomeSeguro}, SÉRIE: ${serieSegura}\n`;
    
    // Anexa o conteúdo ao arquivo (cria se não existir)
    // O flag 'a' (append) é crucial aqui
    fs.appendFileSync(csvPath, csvContent);

    console.log(`✅ REGISTRO CSV ATUALIZADO COM SUCESSO!`);
    console.log(`Registro adicionado em: ${csvPath}`);
    console.log("================================================\n");

} catch (error) {
    console.error("❌ ERRO ao salvar os arquivos:", error);
}
