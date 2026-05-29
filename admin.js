
const sheetURL = "https://script.google.com/macros/s/AKfycbwQvvBmmIM5Wh05qoZUQWnRf_5FDahnJ7mku_zGlkczDAFaKdT0zJwh_CxJ0aZBaNYd/exec";

let membersData = [];

function loadMembers() {

  fetch(sheetURL)
    .then(res => res.json())
    .then(data => {

      membersData = data;

      const container = document.getElementById("adminMembers");

      container.innerHTML = "";

      data.forEach((member) => {

        container.innerHTML += `

          <div class="member-card">

            <h2>${member.ign}</h2>

            <p><strong>Rank:</strong> ${member.rank}</p>

            <p><strong>Role:</strong> ${member.role}</p>

            <button onclick="editMember(${member.id})">
              Edit
            </button>

            <button onclick="deleteMember(${member.id})">
              Remove
            </button>

          </div>

        `;
      });
    });
}

function addMember() {

  const ign = document.getElementById("ign").value;
  const rank = document.getElementById("rank").value;
  const role = document.getElementById("role").value;

  fetch(sheetURL, {

    method: "POST",

    body: JSON.stringify({
      action: "add",
      ign,
      rank,
      role
    })

  })
  .then(res => res.json())
  .then(() => {

    alert("Member Added!");

    loadMembers();

    document.getElementById("ign").value = "";
    document.getElementById("rank").value = "";
    document.getElementById("role").value = "";
  });
}

function deleteMember(row) {

  if(confirm("Remove this member?")) {

    fetch(sheetURL, {

      method: "POST",

      body: JSON.stringify({
        action: "delete",
        row: row
      })

    })
    .then(res => res.json())
    .then(() => {

      alert("Member Removed!");

      loadMembers();
    });
  }
}

function editMember(row) {

  const member = membersData.find(m => m.id === row);

  const newIGN = prompt("Edit IGN", member.ign);
  const newRank = prompt("Edit Rank", member.rank);
  const newRole = prompt("Edit Role", member.role);

  if(newIGN && newRank && newRole) {

    fetch(sheetURL, {

      method: "POST",

      body: JSON.stringify({
        action: "edit",
        row: row,
        ign: newIGN,
        rank: newRank,
        role: newRole
      })

    })
    .then(res => res.json())
    .then(() => {

      alert("Member Updated!");

      loadMembers();
    });
  }
}

loadMembers();
