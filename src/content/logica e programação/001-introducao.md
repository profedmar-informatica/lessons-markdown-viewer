# 001 - Números Primos de 1 a 50 em C

Este tutorial demonstra como encontrar e imprimir todos os números primos no intervalo de 1 a 50 usando a linguagem de programação C.

## O que é um Número Primo?

Um número primo é um número natural maior que 1 que não possui divisores positivos além de 1 e ele mesmo. Por exemplo, 2, 3, 5, 7 são números primos.

## Lógica por Trás do Algoritmo

Para verificar se um número é primo, precisamos testar se ele é divisível por qualquer número entre 2 e a sua raiz quadrada. Se não encontrarmos nenhum divisor nesse intervalo, o número é primo. Esta otimização reduz significativamente o número de verificações necessárias.

Vamos usar uma função auxiliar para verificar a primalidade e um laço principal para iterar de 1 a 50.

## Código em C

```c
#include <stdio.h>
#include <stdbool.h> // Para usar o tipo bool

// Função para verificar se um número é primo
bool isPrime(int num) {
    if (num <= 1) {
        return false; // Números menores ou iguais a 1 não são primos
    }
    for (int i = 2; i * i <= num; i++) { // Otimização: verificar até a raiz quadrada
        if (num % i == 0) {
            return false; // Se for divisível, não é primo
        }
    }
    return true; // Se não encontrou divisores, é primo
}

int main() {
    printf("Números primos de 1 a 50:\n");
    printf("--------------------------\n");

    for (int i = 1; i <= 50; i++) {
        if (isPrime(i)) {
            printf("%d\n", i);
        }
    }

    printf("--------------------------\n");
    printf("Fim da verificação.\n");

    return 0;
}
```

## Explicação do Código

1.  **`#include <stdio.h>`**: Inclui a biblioteca padrão de entrada e saída para funções como `printf`.
2.  **`#include <stdbool.h>`**: Inclui a biblioteca para usar o tipo booleano (`bool`, `true`, `false`).
3.  **`bool isPrime(int num)`**:
    *   Esta função recebe um inteiro `num` e retorna `true` se for primo, `false` caso contrário.
    *   `if (num <= 1)`: Números menores ou iguais a 1 não são primos por definição.
    *   `for (int i = 2; i * i <= num; i++)`: Este laço itera de 2 até a raiz quadrada de `num`. Se `num` tiver um divisor maior que sua raiz quadrada, ele necessariamente terá um divisor menor que sua raiz quadrada.
    *   `if (num % i == 0)`: Se `num` for divisível por `i` (o resto da divisão é 0), então `num` não é primo e a função retorna `false`.
    *   Se o laço terminar sem encontrar divisores, `num` é primo e a função retorna `true`.

4.  **Execute um teste**:
    ```pascal
        1
    2
    3
    4
    5
    6
    7
    8
    9
    10
    11
    12
    13
    14
    15
    16
    17
    18
    19
    20
    ```

5.  **`int main()`**: Esta é a função principal onde a execução do programa começa.
    `printf(...)`: Exibe mensagens no console.
    `for (int i = 1; i <= 50; i++)`: Um laço que itera de 1 a 50.
    `if (isPrime(i))`: Para cada número, chama a função `isPrime` para verificar se é primo.
    `printf("%d\n", i)`: Se o número for primo, ele é impresso.
    `return 0;`: Indica que o programa foi executado com sucesso.

## Como Compilar e Executar em C

Para compilar e executar este código, você precisará de um compilador C (como GCC).

1.  **Salve o código** em um arquivo chamado `primos.c`.
2.  **Abra um terminal** ou prompt de comando.
3.  **Compile o código** usando o GCC:
    ```bash
    gcc primos.c -o primos
    ```
4.  **Execute o programa**:
    ```bash
    ./primos
    ```


    Você verá a lista de números primos de 1 a 50 sendo impressa no console.