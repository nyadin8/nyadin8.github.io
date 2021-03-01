const updateDone = () => {
  const results = document.querySelector('#result');
  const resultsList = results.querySelectorAll('.result-item');
  const doneList = results.querySelectorAll('.result-item[data-done=true]');

  const progressDone = document.querySelector('#progress-done');
  const progressText = document.querySelector('#progress-text');

  const total = resultsList.length;
  const done = doneList.length;

  progressDone.style.width = `${done / total * 100}%`;
  progressText.textContent = `${done}/${total}`;
};

document.addEventListener('click', (event) => {
  const target = event.target;

  if (event.target.matches('button.cpy')) {
    target.parentElement.dataset.done = true;
    target.parentElement.style.background = '#ffee93';
    updateDone();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const inputArea = document.querySelector('#template');
  const results = document.querySelector('#result');

  const myCodeMirror = CodeMirror.fromTextArea(inputArea, { mode: { name: 'handlebars' } });
  new ClipboardJS('.cpy');

  const changedAndRender = () => {
    const template = myCodeMirror.getValue();
    results.innerHTML = '';

    updateDone();

    window.data.forEach((data, index) => {
      const rendered = Mustache.render(template, data);
      results.innerHTML += `<div class="result-item">
        <div class="city">${data.city}</div>
        <button class="cpy" data-clipboard-target="#content${index}">Copy</button>
        <span class="content" id="content${index}">${rendered}</span>
        </div>`;
    });
  };

  // inputArea.addEventListener('keydown', changedAndRender);
  myCodeMirror.on('change', changedAndRender);

  changedAndRender();
});
