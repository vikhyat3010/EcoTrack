/* ================================
   ECO TRACK – MAIN JAVASCRIPT
   Beginner Safe | No Backend
================================ */

// ---------- HABIT TRACKING ----------
const habitButtons = document.querySelectorAll(".card button");
const progressText = document.querySelector(".progress p");
const progressFill = document.querySelector(".progress-fill");

let completedHabits = 0;

habitButtons.forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");

    if (!card.classList.contains("done")) {
      card.classList.add("done");
      button.textContent = "Completed ✔";
      completedHabits++;
    } else {
      card.classList.remove("done");
      button.textContent = "Mark Done";
      completedHabits--;
    }

    updateProgress();
  });
});

function updateProgress() {
  const totalHabits = document.querySelectorAll(".card").length;
  const percentage = Math.round((completedHabits / totalHabits) * 100);

  progressText.textContent = `Eco Score: ${percentage}%`;
  progressFill.style.width = `${percentage}%`;
}

// ---------- ADD NEW HABIT ----------
const addCardBtn = document.querySelector(".add-card-button");
const habitContainer = document.querySelector(".habit-cards");

addCardBtn.addEventListener("click", () => {
  const title = prompt("Enter new eco habit:");
  if (!title) return;

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="edit-icon">EDIT</div>
    <h3>${title}</h3>
    <p>Custom eco-friendly habit.</p>
    <button>Mark Done</button>
  `;

  habitContainer.insertBefore(card, addCardBtn);

  const newButton = card.querySelector("button");
  newButton.addEventListener("click", () => {
    if (!card.classList.contains("done")) {
      card.classList.add("done");
      newButton.textContent = "Completed ✔";
      completedHabits++;
    } else {
      card.classList.remove("done");
      newButton.textContent = "Mark Done";
      completedHabits--;
    }
    updateProgress();
  });
});

// ---------- AI CHATBOT ----------
const chatbot = document.createElement("div");
chatbot.innerHTML = `
  <div id="eco-chatbot">
    <div class="chat-header">🌱 Eco Assistant</div>
    <div class="chat-body" id="chatBody">
      <p><strong>Bot:</strong> Hi! Ask me eco-friendly tips 🌍</p>
    </div>
    <input id="chatInput" placeholder="Ask something..." />
  </div>
`;

document.body.appendChild(chatbot);

// Chatbot Styles (Injected safely)
const style = document.createElement("style");
style.innerHTML = `
#eco-chatbot {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 280px;
  background: rgba(255,255,255,0.95);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  font-family: sans-serif;
  overflow: hidden;
  z-index: 999;
}
.chat-header {
  background: #2d7a5a;
  color: white;
  padding: 12px;
  font-weight: 600;
  text-align: center;
}
.chat-body {
  padding: 10px;
  height: 150px;
  overflow-y: auto;
  font-size: 14px;
}
#chatInput {
  width: 100%;
  padding: 10px;
  border: none;
  border-top: 1px solid #ddd;
  outline: none;
}
`;
document.head.appendChild(style);

// Chat Logic (AI-like responses)
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

chatInput.addEventListener("keypress", e => {
  if (e.key === "Enter" && chatInput.value.trim()) {
    const userText = chatInput.value;
    chatBody.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;
    chatInput.value = "";

    setTimeout(() => {
      chatBody.innerHTML += `<p><strong>Bot:</strong> ${getEcoReply(userText)}</p>`;
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 600);
  }
});

function getEcoReply(message) {
  message = message.toLowerCase();

  if (message.includes("water"))
    return "Try reducing shower time and fixing leaks 💧";
  if (message.includes("plastic"))
    return "Use reusable bags and bottles ♻";
  if (message.includes("electric"))
    return "Switch off unused appliances ⚡";
  if (message.includes("help"))
    return "I help you build eco-friendly habits 🌱";

  return "Small habits make a big impact 🌍";
}
