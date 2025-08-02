let clientEnEdition = null; // pour stocker la ligne en cours d'édition

function ouvrirFormulaire() {
  document.getElementById("modalClient").style.display = "flex";
}

function fermerFormulaire() {
  document.getElementById("modalClient").style.display = "none";
  clientEnEdition = null; // reset
  document.querySelector(".modal-content h2").textContent = "Ajouter un Client";
  document.querySelector(".modal-content .btn-add").textContent = "Enregistrer";
  // vide les champs
  document.getElementById("nomClient").value = "";
  document.getElementById("emailClient").value = "";
  document.getElementById("telClient").value = "";
}

function ajouterClient() {
  const nom = document.getElementById("nomClient").value.trim();
  const email = document.getElementById("emailClient").value.trim();
  const tel = document.getElementById("telClient").value.trim();

  if (!nom || !email || !tel) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  if (clientEnEdition) {
    // Mise à jour de la ligne existante
    clientEnEdition.cells[0].textContent = nom;
    clientEnEdition.cells[1].textContent = email;
    clientEnEdition.cells[2].textContent = tel;

    fermerFormulaire();
  } else {
    // Ajout d'une nouvelle ligne
    const table = document.getElementById("clientsTable");
    const row = table.insertRow();

    row.innerHTML = `
      <td>${nom}</td>
      <td>${email}</td>
      <td>${tel}</td>
      <td>
        <button class="btn btn-edit" onclick="editerClient(this)">✏ Modifier</button>
        <button class="btn btn-delete" onclick="supprimerClient(this)">🗑 Supprimer</button>
      </td>
    `;

    fermerFormulaire();
  }
}

function editerClient(btn) {
  clientEnEdition = btn.parentElement.parentElement; // récupérer la ligne du tableau
  const nom = clientEnEdition.cells[0].textContent;
  const email = clientEnEdition.cells[1].textContent;
  const tel = clientEnEdition.cells[2].textContent;

  // remplir le formulaire avec les données existantes
  document.getElementById("nomClient").value = nom;
  document.getElementById("emailClient").value = email;
  document.getElementById("telClient").value = tel;

  // changer le titre et le bouton du modal
  document.querySelector(".modal-content h2").textContent = "Modifier un Client";
  document.querySelector(".modal-content .btn-add").textContent = "Mettre à jour";

  ouvrirFormulaire();
}

function supprimerClient(btn) {
  if (confirm("Voulez-vous vraiment supprimer ce client ?")) {
    btn.parentElement.parentElement.remove();
  }
}
