function generateRandomNumbers(n) {
  const randomNumbers = [];
  const lista = {};

  for (let i = 0; i < 1000; i++) {
    lista[i] = 0;
  }

  for (let i = 0; i < n; i++) {
    const randomNum = Math.floor(Math.random() * 1000);
    randomNumbers.push(randomNum);
    lista[randomNum] += 1;
  }
  return lista;
}

process.on("message", (num) => {
  const numbers = generateRandomNumbers(num);
  process.send(numbers);
});
