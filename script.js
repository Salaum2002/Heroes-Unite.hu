const sheetURL = "https://script.google.com/macros/s/AKfycbwQvvBmmIM5Wh05qoZUQWnRf_5FDahnJ7mku_zGlkczDAFaKdT0zJwh_CxJ0aZBaNYd/exec";

fetch(sheetURL)
.then(res => res.json())
.then(data => {
    const container = document.getElementById("membersContainer");

    data.forEach(member => {
        container.innerHTML += `
        <div class="member-card" onclick="toggleInfo(this)">
            <h2>${member.ign}</h2>

            <div class="info-box" style="display:none;">
                <p><strong>Rank:</strong> ${member.rank}</p>
                <p><strong>Role:</strong> ${member.role}</p>
            </div>
        </div>
        `;
    });
});

function toggleInfo(card){
    const info = card.querySelector(".info-box");

    if(info.style.display === "none"){
        info.style.display = "block";
    } else {
        info.style.display = "none";
    }
}