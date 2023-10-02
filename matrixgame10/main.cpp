#include<stdio.h>
#include<stdlib.h>
#include<iostream>

bool serchoptions(char matrix[10][21], char value);
bool possibleplay(char matrix[10][21], int y, int x, char value);
void game(char matrix[10][21], char value, int y, int x);
void player1(char matrix[10][21]);
void player2(char matrix[10][21]);
void add(char matrix[10][21], int valuey, int valuex, char value);
void printmatrix(char matrix[10][21]);
void creatematrix(char matrix[10][21]);
int changevaluey(int valuex);

int main() {
    char matrix[10][21];
    char player = 'x';
    creatematrix(matrix);
    printmatrix(matrix);
    while (1) {
        if (player == 'x') {
            if (serchoptions(matrix, player)) {
                player1(matrix);
                player = 'o';
            } else {
                std::cout << "Jugador 2 es el ganador";
                break;
            }
        } else if (player == 'o') {
            if (serchoptions(matrix, player)) {
                player2(matrix);
                player = 'x';
            } else {
                std::cout << "Jugador 1 es el ganador";
                break;
            }
        }
    }
    return 0;
}

void printmatrix(char matrix[10][21]) {
    for (int i = 0; i < 10; i++) {
        printf("\n");
        for (int x = 0; x < 21; x++)
            printf("%c", matrix[i][x]);
    }
}

void creatematrix(char matrix[10][21]) {
    for (int i = 0; i < 10; i++) {
        for (int x = 0; x < 21; x++)
            if (x % 2 == 0)
                matrix[i][x] = '|';
            else
                matrix[i][x] = ' ';
    }
    matrix[4][9] = 'x';
    matrix[4][11] = 'o';
    matrix[5][9] = 'x';
    matrix[5][11] = 'o';
}

void add(char matrix[10][21], int valuey, int valuex, char value) {
    matrix[valuey][valuex] = value;
}

void player1(char matrix[10][21]) {
    int valuey, valuex;
    char value = 'x';
    while (true) {
        while (true) {
            std::cout << "\nEl jugador 1 digite la posicion en el eje de la y: ";
            std::cin >> valuey;
            if (valuey < 10 && valuey >= 0)
                break;
            else
                std::cout << "\nEl numero digitado no es posible";
            continue;
        }
        while (true) {
            std::cout << "\nEl jugador 1 digite la posicion en el eje de las x: ";
            std::cin >> valuex;
            if (valuex < 10 && valuex >= 0) {
                valuex = changevaluey(valuex);
                break;
            } else {
                std::cout << "\nEl numero digitado no es posible";
                continue;
            }
        }
        if (matrix[valuey][valuex] == 'x' || matrix[valuey][valuex] == 'o') {
            std::cout << "\nEsa posicion ya esta ocupada";
            continue;
        } else if (!possibleplay(matrix, valuey, valuex, value)) {
            std::cout << "\nPosicion no valdia";
        } else {
            break;
        }
    }
    add(matrix, valuey, valuex, value);
    game(matrix, value, valuey, valuex);
    printmatrix(matrix);
}

void player2(char matrix[10][21]) {
    int valuey, valuex;
    char value = 'o';
    while (true) {
        while (true) {
            std::cout << "\nEl jugador 2 digite la posicion en el eje de la y: ";
            std::cin >> valuey;
            if (valuey < 10 && valuey >= 0)
                break;
            else
                std::cout << "\nEl numero digitado no es posible";
            continue;
        }
        while (true) {
            std::cout << "El jugador 2 digite la posicion en el eje de las x: ";
            std::cin >> valuex;
            if (valuex < 10 && valuex >= 0) {
                valuex = changevaluey(valuex);
                break;
            } else {
                std::cout << "\nEl numero digitado no es posible";
                continue;
            }
        }
        if (matrix[valuey][valuex] == 'x' || matrix[valuey][valuex] == 'o') {
            std::cout << "\nEsa posicion ya esta ocupada";
            continue;
        } else if (!possibleplay(matrix, valuey, valuex, value)) {
            std::cout << "\nPosicion no valdia";
        } else {
            break;
        }
    }
    add(matrix, valuey, valuex, value);
    game(matrix, value, valuey, valuex);
    printmatrix(matrix);
}

int changevaluey(int valuex) {
    switch (valuex) {
        case 0:
            valuex = 1;
            break;
        case 1:
            valuex = 3;
            break;
        case 2:
            valuex = 5;
            break;
        case 3:
            valuex = 7;
            break;
        case 4:
            valuex = 9;
            break;
        case 5:
            valuex = 11;
            break;
        case 6:
            valuex = 13;
            break;
        case 7:
            valuex = 15;
            break;
        case 8:
            valuex = 17;
            break;
        case 9:
            valuex = 19;
            break;
    }
    return valuex;
}

void game(char matrix[10][21], char value, int y, int x) {
    char covalue;
    if (value == 'x') {
        covalue = 'o';
    } else if (value == 'o') {
        covalue = 'x';
    }
    if (matrix[y - 1][x - 2] == covalue) {
        if (matrix[y - 2][x - 4] == value)
            matrix[y - 1][x - 2] = value;
    }
    if (matrix[y - 1][x] == covalue) {
        if (matrix[y - 2][x] == value)
            matrix[y - 1][x] = value;
    }
    if (matrix[y - 1][x + 2] == covalue) {
        if (matrix[y - 2][x + 4] == value)
            matrix[y - 1][x + 2] = value;
    }
    if (matrix[y][x - 2] == covalue) {
        if (matrix[y][x - 4] == value)
            matrix[y][x - 2] = value;
    }
    if (matrix[y][x + 2] == covalue) {
        if (matrix[y][x + 4] == value)
            matrix[y][x + 2] = value;
    }
    if (matrix[y + 1][x - 2] == covalue) {
        if (matrix[y + 2][x - 4] == value)
            matrix[y + 1][x - 2] = value;
    }
    if (matrix[y + 1][x] == covalue) {
        if (matrix[y + 2][x] == value)
            matrix[y + 1][x] = value;
    }
    if (matrix[y + 1][x + 2] == covalue) {
        if (matrix[y + 2][x + 4] == value)
            matrix[y + 1][x + 2] = value;
    }
}

bool serchoptions(char matrix[10][21], char value) {
    char covalue;
    bool playable = false;
    if (value == 'x') {
        covalue = 'o';
    } else if (value == 'o') {
        covalue = 'x';
    }
    for (int y = 0; y < 10; y++) {
        for (int x = 0; x < 21; x++) {
            if (matrix[y][x] == value) {
                if (matrix[y - 1][x - 2] == covalue) {
                    if (matrix[y - 2][x - 4] == ' ')
                        playable = true;
                }
                if (matrix[y - 1][x] == covalue) {
                    if (matrix[y - 2][x] == ' ')
                        playable = true;
                }
                if (matrix[y - 1][x + 2] == covalue) {
                    if (matrix[y - 2][x + 4] == ' ')
                        playable = true;
                }
                if (matrix[y][x - 2] == covalue) {
                    if (matrix[y][x - 4] == ' ')
                        playable = true;
                }
                if (matrix[y][x + 2] == covalue) {
                    if (matrix[y][x + 4] == ' ')
                        playable = true;
                }
                if (matrix[y + 1][x - 2] == covalue) {
                    if (matrix[y + 2][x - 4] == ' ')
                        playable = true;
                }
                if (matrix[y + 1][x] == covalue) {
                    if (matrix[y + 2][x] == ' ')
                        playable = true;
                }
                if (matrix[y + 1][x + 2] == covalue) {
                    if (matrix[y + 2][x + 4] == ' ')
                        playable = true;
                }
            }
        }
    }
    return playable;
}

bool possibleplay(char matrix[10][21], int y, int x, char value) {
    bool playable = false;
    char covalue;
    if (value == 'x') {
        covalue = 'o';
    } else if (value == 'o') {
        covalue = 'x';
    }
    if (matrix[y - 1][x - 2] == covalue) {
        if (matrix[y - 2][x - 4] == value)
            playable = true;
    }
    if (matrix[y - 1][x] == covalue) {
        if (matrix[y - 2][x] == value)
            playable = true;
    }
    if (matrix[y - 1][x + 2] == covalue) {
        if (matrix[y - 2][x + 4] == value)
            playable = true;
    }
    if (matrix[y][x - 2] == covalue) {
        if (matrix[y][x - 4] == value)
            playable = true;
    }
    if (matrix[y][x + 2] == covalue) {
        if (matrix[y][x + 4] == value)
            playable = true;
    }
    if (matrix[y + 1][x - 2] == covalue) {
        if (matrix[y + 2][x - 4] == value)
            playable = true;
    }
    if (matrix[y + 1][x] == covalue) {
        if (matrix[y + 2][x] == value)
            playable = true;
    }
    if (matrix[y + 1][x + 2] == covalue) {
        if (matrix[y + 2][x + 4] == value)
            playable = true;
    }
    return playable;
}
