# Sistema de Sorteio de Ingressos

Este projeto é um sistema web para realizar sorteios de ingressos com base em uma lista de participantes fornecida em um arquivo `.xlsx`. O sistema permite o upload de um arquivo contendo informações de participantes e sorteia os ingressos de forma aleatória para cada diretoria.

## Funcionalidades

- **Upload de Arquivo**: Permite o upload de um arquivo `.xlsx` contendo informações dos participantes.
- **Validação de Dados**: Verifica se o arquivo contém todas as colunas obrigatórias e se os dados estão corretos.
- **Sorteio Aleatório**: Realiza o sorteio de ingressos usando o algoritmo Fisher-Yates para garantir aleatoriedade.
- **Exibição de Resultados**: Mostra os resultados do sorteio na página web.

## Formatação da Planilha

Para garantir que o sistema funcione corretamente, a planilha `.xlsx` deve estar formatada de acordo com as seguintes diretrizes:

1. **Folha Única**: A planilha deve conter apenas uma aba (folha). O sistema não processa arquivos com múltiplas abas.

2. **Colunas Obrigatórias**: A planilha deve incluir as seguintes colunas com os nomes exatos:
   - **Carimbo de Data/Hora**: Registra o carimbo de data e hora da entrada do participante. Esta coluna deve ser intitulada exatamente como `carimbo de data/hora`.
   - **Nome Completo**: Nome completo do participante. A coluna deve ser intitulada exatamente como `nome completo`.
   - **Diretoria**: Nome da diretoria à qual o participante pertence. A coluna deve ser intitulada exatamente como `diretoria`.
   - **Setor**: Setor em que o participante trabalha. A coluna deve ser intitulada exatamente como `setor`.
   - **Telefone**: Número de telefone do participante. A coluna deve ser intitulada exatamente como `telefone`.

3. **Dados Limpios**: Certifique-se de que os dados estejam limpos e formatados corretamente. Evite células vazias nas colunas obrigatórias e remova quaisquer caracteres especiais ou espaços extras.

### Exemplo de Formato de Planilha

| carimbo de data/hora | nome completo | diretoria   | setor       | telefone      |
|----------------------|---------------|-------------|-------------|---------------|
| 2024-08-01 08:00:00  | João Silva    | Marketing   | Vendas      | (11) 98765-4321|
| 2024-08-01 09:00:00  | Maria Oliveira | Recursos Humanos | Administrativo | (11) 98765-4322|
| 2024-08-01 10:00:00  | Pedro Santos  | TI          | Suporte     | (11) 98765-4323|

Certifique-se de seguir essas diretrizes para garantir que o arquivo seja processado corretamente e o sorteio seja realizado de maneira justa.

## Como o Sorteio Garante Aleatoriedade

O sistema de sorteio utiliza o algoritmo Fisher-Yates para garantir que a seleção dos ingressos seja completamente aleatória e justa. Aqui está um detalhamento de como isso é alcançado:

### Algoritmo Fisher-Yates

Para garantir que os ingressos sejam sorteados de forma verdadeiramente aleatória, o sistema aplica o algoritmo Fisher-Yates, também conhecido como algoritmo de embaralhamento de Fisher-Yates. Este algoritmo é um método eficiente para embaralhar uma lista de itens e garantir que cada permutação possível seja igualmente provável.

#### Funcionamento do Algoritmo Fisher-Yates

1. **Inicialização**: Começa com uma lista de itens (neste caso, os nomes dos participantes).
2. **Iteração Reversa**: O algoritmo percorre a lista de itens do final para o início.
3. **Troca Aleatória**: Para cada item, escolhe um índice aleatório de um subarray que ainda não foi embaralhado e troca o item atual com o item nesse índice aleatório.
4. **Continuação**: Repete o processo até que todos os itens tenham sido considerados e a lista esteja completamente embaralhada.

Este processo garante que cada item na lista tenha a mesma probabilidade de aparecer em qualquer posição final, resultando em uma distribuição uniforme e justa dos ingressos.

No código, a função `shuffleArray` aplica o algoritmo Fisher-Yates para embaralhar os nomes dos participantes de cada diretoria. O código é o seguinte:

```javascript
// Função de embaralhamento Fisher-Yates
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
    return array;
}
