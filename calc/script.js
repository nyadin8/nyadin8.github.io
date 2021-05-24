const TARGETS = [[0, 3], [3, 2], [5, 1]];

const calculateCoeff = (errorPerc) => {
  if (errorPerc >= R.last(TARGETS)[0]) {
    return 1;
  };

  const targetIndex = R.findLastIndex(R.compose(R.gte(errorPerc), R.nth(0)), TARGETS);
  const [x0, y0] = TARGETS[targetIndex];
  const [x1, y1] = TARGETS[targetIndex+1];

  const x = errorPerc;
  const y = (y0 * (x1 - x) + y1 * (x - x0)) / (x1 - x0);

  return y;
};

document.addEventListener("DOMContentLoaded", () => {
  const numberInput = document.querySelector('#number');
  const errorPercInput = document.querySelector('#errorPerc');
  const calculateButton = document.querySelector('#calculate');
  const resultContainer = document.querySelector('#result');

  calculateButton.addEventListener('click', () => {
    const numberValue = parseInt(numberInput.value);
    const errorPercValue = parseFloat(errorPercInput.value);
    const coeff = calculateCoeff(errorPercValue)
    const result = numberValue * coeff;
    const taxResult = result - result * 0.13;

    resultContainer.innerHTML = `
      <div>Сумма за карточку: ${coeff.toFixed(2)} руб.</div>
      <div>Сумма до вычета: ${result.toFixed(2)} руб.</div>
      <div>Сумма с вычетом: ${taxResult.toFixed(2)} руб.</div>
    `;
  });
});
