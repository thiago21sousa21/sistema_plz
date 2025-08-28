import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

// Importa um módulo especial do docxtemplater para inspeção
import InspectModule from 'docxtemplater/js/inspect-module.js';

try {
    // 1. Carrega seu modelo do Word
    const templatePath = path.join(process.cwd(), 'templates', 'modelo-laudo.docx');
    const content = fs.readFileSync(templatePath);
    
    const zip = new PizZip(content);
    
    // 2. Cria o "inspetor"
    const iModule = new InspectModule();
    
    // 3. Prepara o docxtemplater com o módulo de inspeção
    const doc = new Docxtemplater(zip, { 
        modules: [iModule],
        nullGetter: () => "" // Evita erros de "tag não encontrada"
    });

    // 4. Renderiza um documento "vazio" apenas para que o inspetor possa ler as tags
    doc.render();

    // 5. Pede ao inspetor para nos dizer todas as tags que ele encontrou
    const tags = iModule.getAllTags();

    console.log("--- Tags Encontradas no Template ---");
    console.log(tags);
    console.log("------------------------------------");

} catch (error) {
    console.error("Ocorreu um erro ao inspecionar o template:");
    console.error(error);
}