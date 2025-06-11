const btn = document.getElementById("btn-marcar");
const modal = document.getElementById("modal-agendamento");
const horaSelect = document.getElementById("hora-select");
const diaSelect = document.getElementById("dia-select");

const horariosReservados = new Set();

btn.addEventListener("click", () => {
  modal.style.display = "flex";
  atualizarHorarios();
});

diaSelect.addEventListener("change", atualizarHorarios);

function fecharModal() {
  modal.style.display = "none";
}

function atualizarHorarios() {
  horaSelect.innerHTML = '<option value=""> Selecionar horário</option>';
  const diaSelecionado = diaSelect.value;
  if (!diaSelecionado) return;

  for (let h = 8; h <= 18; h++) {
    const hora = h.toString().padStart(2, "0") + ":00";
    const chave = `${diaSelecionado}-${hora}`;
    if (!horariosReservados.has(chave)) {
      const option = document.createElement("option");
      option.textContent = hora;
      horaSelect.appendChild(option);
    }
  }
}

function confirmarAgendamento() {
  const nome = document.getElementById("nome-cliente").value.trim();
  const servico = document.getElementById("servico").value.trim();
  const dia = diaSelect.value;
  const hora = horaSelect.value;

  if (!nome || !servico || !dia || !hora) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (servico.length > 15) {
    alert("O serviço deve ter no máximo 15 caracteres.");
    return;
  }

  const chave = `${dia}-${hora}`;
  horariosReservados.add(chave);

  alert(`Agendamento confirmado para ${nome} às ${hora} de ${dia}, para o serviço: ${servico}.`);
  fecharModal();
}