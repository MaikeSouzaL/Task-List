const input = document.querySelector(".container-input input");
const btnAdd = document.querySelector(".container-input img");
const fullList = document.querySelector(".container-lista");
const del = document.querySelector(".container-edit");

let itens = [];
let editIndex = null;
// adicionando as listas no array
function addTask() {
  const inputValue = input.value.trim(); // Removendo espaços em branco no início e no final

  if (inputValue == "") {
    alert("Insira algum dado");
  } else {
    if (editIndex !== null) {
      itens[editIndex].data = inputValue;
      input.value = "";
      editIndex = null;
    } else {
      itens.push({
        data: inputValue,
        status: false,
      });
      input.value = "";
    }

    showtasks();
  }
}

function showtasks() {
  let newTask = "";
  itens.forEach((item, index) => {
    newTask =
      newTask +
      `
    <div class="task-show">
            <div class="task">
              <div class="status">
                
                <img src="${
                  item.status ? "./assets/feito.png" : "./assets/nao_feito.png"
                }" alt="botao de concluido" onClick="concludeTask(${index})" >
              </div>
            </div>

            <p class="${item.status && "nf"}" >${item.data}</p>

            <div class="container-edit">
              <div class="editar">
                <img src="./assets/editar.png" alt="Botao de editar" onClick="altera(${index})">
              </div>
              <div class="excluir">
                <img src="./assets/deletar.png" alt="Botão de excluir"  onClick="deletTask(${index})">
              </div>
            </div>
          </div>
    `;
  });
  fullList.innerHTML = newTask;
  // salvando na memoria
  localStorage.setItem("lista", JSON.stringify(itens));
}
// concluindo task
function concludeTask(index) {
  itens[index].status = !itens[index].status;
  console.log(itens[index].status);
  showtasks();
}
// deletando tasks
function deletTask(index) {
  itens.splice(index, 1);
  showtasks();
}
// alterando task
function altera(index) {
  input.value = itens[index].data; // Preenche o input com o texto atual da tarefa
  editIndex = index; // Define o índice da tarefa em edição
}

// buscando namemoria a lista
function getLit() {
  let tarefasDoLocalStorage = localStorage.getItem("lista");
  if (tarefasDoLocalStorage) {
    itens = JSON.parse(tarefasDoLocalStorage);
  }
  // convertendo em jason e salvando no array
  showtasks();
}

getLit(); // executa esta função assim que a tela abrir

// adicionando a tecla enter se for apertada
input.addEventListener("keyup", function (evento) {
  if (evento.key === "Enter") {
    addTask();
  }
});
btnAdd.addEventListener("click", addTask);
