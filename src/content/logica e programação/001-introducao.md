# 001 - Números Primos de 1 a 50 em Portugol

Este tutorial demonstra como encontrar e imprimir todos os números primos no intervalo de 1 a 50 usando Portugol Estruturado, com foco na sintaxe do Portugol Studio.

## O que é um Número Primo?

Um número primo é um número natural maior que 1 que não possui divisores positivos além de 1 e ele mesmo. Por exemplo, 2, 3, 5, 7 são números primos.

## Lógica por Trás do Algoritmo

Para verificar se um número é primo, precisamos testar se ele é divisível por qualquer número entre 2 e a sua raiz quadrada (ou até ele - 1, para simplificar). Se não encontrarmos nenhum divisor nesse intervalo, o número é primo.

Vamos usar dois laços de repetição:
1.  Um laço externo para iterar de 1 a 50 (os números que queremos verificar).
2.  Um laço interno para verificar se o número atual é primo.

## Código em Portugol Studio

```portugol
algoritmo "NumerosPrimosAte50"
// Autor : Dyad AI
// Data : 31/07/2024
// Objetivo : Encontrar e imprimir números primos de 1 a 50

var
   numero, divisor, contadorDivisores : inteiro

inicio
   escreval("Números primos de 1 a 50:")
   escreval("--------------------------")

   // Laço externo: itera de 1 a 50 para verificar cada número
   para numero de 1 ate 50 faca
      // Inicializa o contador de divisores para cada novo número
      contadorDivisores <- 0

      // Números menores ou iguais a 1 não são primos por definição
      se numero <= 1 entao
         // Não faz nada, apenas ignora
      senao
         // Laço interno: verifica divisores de 'numero' de 1 até ele mesmo
         para divisor de 1 ate numero faca
            // Se 'numero' é divisível por 'divisor'
            se (numero % divisor = 0) entao
               contadorDivisores <- contadorDivisores + 1
            fimse
         fimpara

         // Se o número tem exatamente 2 divisores (1 e ele mesmo), é primo
         se contadorDivisores = 2 entao
            escreval(numero)
         fimse
      fimse
   fimpara

   escreval("--------------------------")
   escreval("Fim da verificação.")

fimalgoritmo
```

## Explicação do Código

1.  **`algoritmo "NumerosPrimosAte50"`**: Define o nome do algoritmo.
2.  **`var`**: Declaração das variáveis:
    *   `numero`: Armazena o número atual que está sendo verificado (de 1 a 50).
    *   `divisor`: Usado no laço interno para testar a divisibilidade.
    *   `contadorDivisores`: Conta quantos divisores um `numero` possui.
3.  **`inicio` / `fimalgoritmo`**: Delimitam o bloco principal do algoritmo.
4.  **`escreval(...)`**: Exibe mensagens na tela.
5.  **`para numero de 1 ate 50 faca ... fimpara`**: Este é o laço principal. Ele faz com que a variável `numero` assuma valores de 1 a 50, um por vez.
6.  **`contadorDivisores <- 0`**: A cada novo `numero`, o contador de divisores é resetado.
7.  **`se numero <= 1 entao ... senao ... fimse`**: Condição para ignorar números menores ou iguais a 1, pois eles não são primos.
8.  **`para divisor de 1 ate numero faca ... fimpara`**: Este laço interno verifica todos os possíveis divisores para o `numero` atual.
9.  **`se (numero % divisor = 0) entao ... fimse`**: O operador `%` (módulo) retorna o resto da divisão. Se o resto for 0, significa que `numero` é divisível por `divisor`.
10. **`contadorDivisores <- contadorDivisores + 1`**: Se for divisível, incrementa o contador.
11. **`se contadorDivisores = 2 entao escreval(numero) fimse`**: Após verificar todos os divisores, se `contadorDivisores` for exatamente 2 (significando que os únicos divisores foram 1 e o próprio número), então o `numero` é primo e é impresso.

## Como Executar no Portugol Studio

1.  Abra o Portugol Studio.
2.  Crie um novo arquivo (`Arquivo -> Novo Arquivo`).
3.  Copie e cole o código acima no editor.
4.  Clique no botão "Executar" (o ícone de "play" verde).

Você verá a lista de números primos de 1 a 50 sendo impressa no console.