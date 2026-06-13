//O componente TaskManager vai herdar todos os comportamentos de uma tag nativa do HTML.
class TaskManager extends HTMLElement {
  constructor() {
    super();

    // Ativa Shadow DOM.
    this.attachShadow({ mode: "open" });

    // Array simples que vai funcionar como o estado do nosso componente
    this.tasks = ["Estudar Web Components", "Apresentar PoC com sucesso"];
  }

  /**
   * connectedCallback é um método nativo do ciclo de vida dos Custom Elements.
   * O navegador executa essa função automaticamente assim que a tag entra no DOM da página.
   */
  connectedCallback() {
    this.render(); // Desenha a tela inicial
    this.setupListeners(); // Ativa os cliques dos botões
  }

  /**
   * Função responsável por estruturar o HTML de dentro do componente.
   */
  render() {
    // Injeta o conteúdo direto no shadowRoot
    this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="style/task-manager.css">

            <div class="card">
                <h3 style="margin-top:0; color: #333;">📋 Minhas Tarefas</h3>
                
                <div style="display: flex; gap: 8px;">
                    <input type="text" id="taskInput" placeholder="Digite uma nova tarefa...">
                    <button id="addBtn">Adicionar</button>
                </div>
                
                <ul id="taskList">
                    ${this.tasks
                      .map(
                        (task, index) => `
                        <li>
                            <span>${task}</span>
                            <button class="delete-btn" data-index="${index}">Remover</button>
                        </li>
                    `,
                      )
                      .join("")}
                </ul>
            </div>
        `;
  }

  /**
   * Função que mapeia e escuta todas as interações do usuário (eventos de clique).
   */
  setupListeners() {
    const addBtn = this.shadowRoot.querySelector("#addBtn");
    const input = this.shadowRoot.querySelector("#taskInput");
    const taskList = this.shadowRoot.querySelector("#taskList");

    // Evento para adicionar uma nova tarefa
    addBtn.addEventListener("click", () => {
      const newTask = input.value.trim();
      if (newTask !== "") {
        this.tasks.push(newTask); // Adiciona a nova string no array
        this.updateView(); // Atualiza o componente para mostrar a mudança
      }
    });

    // Evento para remover tarefas
    taskList.addEventListener("click", (evento) => {
      if (evento.target.classList.contains("delete-btn")) {
        const indexToRemove = evento.target.getAttribute("data-index");
        this.tasks.splice(indexToRemove, 1); // Remove o item correspondente do array
        this.updateView(); // Atualiza a tela
      }
    });
  }

  //Componente se renderiza novamente com as mudanças dos dados
  updateView() {
    this.render();
    this.setupListeners();
  }
}

// Vincula o componente ao seu nome da tag
customElements.define("task-manager", TaskManager);
