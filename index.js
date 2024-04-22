const { default: OpenAI } = require("openai");

const openai = new OpenAI();

const sector = 'energia'
const process = 'Emissão'
const subprocess_level = 1 // can be modified in the future
const description = 'Processo de emissão de nota fiscal'
const language = 'EN-US'

const object = 
`
interface ISubprocesses: {
  index,
  name: string,
  description: string,
  areas: string[]
}

mainProcesses: [{
  index: number,
  name: string,
  description: string,
  areas: string[],
  subprocesses: ISubprocesses[],
}]
`

const format = `json, no idioma ${language} e conter o nome dos processos e subprocessos, descrição detalhada e áreas correlacionadas. Único porém é para o campo 'name' trazer apenas o nome do processo
${object}`

// content_text = `Processos detalhados das áreas de uma empresa do setor de ${sector} com até ${subprocess_level} níveis de subprocessos. Algumas informações adicionais: ${details}.
// A resposta deve ser no seguinte formato json, no idioma ${language} e conter o nome dos processos e subprocessos, descrição detalhada e áreas correlacionadas. Único porém é para o campo 'name' trazer apenas o nome do processo

// content_text = `Processos detalhados das áreas de uma empresa do setor de ${sector} com até ${subprocess_level} níveis de subprocessos. Algumas informações adicionais: ${details}.
// A resposta deve ser no seguinte formato json, no idioma ${language} e conter o nome dos processos e subprocessos, descrição detalhada e áreas correlacionadas. Único porém é para o campo 'name' trazer apenas o nome do processo
// ${object}
// `

// content_text2 = `Preciso dos subprocessos sugeridos e detalhados do processo de ${process} de uma empresa do setor de ${sector}, uma breve descrição deste processo seria ${description}
// A resposta deve ser no seguinte formato json, no idioma ${language} e conter o nome dos processos e subprocessos, descrição detalhada e áreas correlacionadas. Único porém é para o campo 'name' trazer apenas o nome do processo
// ${object}
// `

content_text3 = `Assuma o papel de um especialista em ${process} de uma empresa do setor de ${sector}. Estou interessado em saber os processos e subprocessos desta área em detalhes, segue alguns detalhes para auxiliar na sua conclusão ${description}.
A resposta deve ser no seguinte formato: ${format}`

async function main() {
  console.log('>>>>>>>>> START <<<<<<<<<')
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: content_text3 }],
    model: "gpt-3.5-turbo",
    // model: "gpt-4.0", it is not working in this version
  });

  console.log('full-completion:', completion)

  console.log('choices:', completion.choices[0]);

  clean_object = completion.choices[0].message.content.replace("\n' +", '')
  console.log(clean_object)
  jsonCleanObject = JSON.parse(clean_object)
  // console.log(typeof jsonCleanObject)
  // console.log(jsonCleanObject)
}

main();