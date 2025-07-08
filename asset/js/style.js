
        // Mobile menu toggle
        const menuBtn = document.getElementById("menuBtn");
        const navLinks = document.getElementById("navLinks");
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        // Fetch Minecraft server status every 30 seconds
        async function fetchServerStatus() {
            try {
                const response = await fetch("https://api.mcsrvstat.us/2/play.lalimc.fun");
                const data = await response.json();

                const versionEl = document.getElementById("serverVersion");
                const playersEl = document.getElementById("playersOnline");
                const statusEl = document.getElementById("serverStatus");

                if (data.online) {
                    versionEl.textContent = data.version || "Unknown";
                    playersEl.textContent = `${data.players.online} / ${data.players.max}`;
                    statusEl.textContent = "Online";
                    statusEl.style.color = "var(--success)";
                } else {
                    versionEl.textContent = "-";
                    playersEl.textContent = "0 / 0";
                    statusEl.textContent = "Offline";
                    statusEl.style.color = "var(--danger)";
                }
            } catch (error) {
                console.error("Failed to fetch server status:", error);
                document.getElementById("serverVersion").textContent = "-";
                document.getElementById("playersOnline").textContent = "-";
                const statusEl = document.getElementById("serverStatus");
                statusEl.textContent = "Error";
                statusEl.style.color = "var(--warning)";
            }
        }

        fetchServerStatus();
        setInterval(fetchServerStatus, 30000);
        // Vote Modal Control with Tabs
        function openVoteModal() {
            document.getElementById("voteModal").style.display = "flex";
            showVoteSite('site1');  // Show first tab by default
        }

        function closeVoteModal() {
            document.getElementById("voteModal").style.display = "none";
        }

        window.addEventListener("click", function (e) {
            const modal = document.getElementById("voteModal");
            if (e.target === modal) {
                closeVoteModal();
            }
        });

        function showVoteSite(siteId) {
            const sites = ['site1', 'site2', 'site3', 'site4'];
            sites.forEach(id => {
                document.getElementById(id).style.display = (id === siteId) ? 'block' : 'none';
                document.getElementById('btn-' + id).style.fontWeight = (id === siteId) ? 'bold' : 'normal';
                document.getElementById('btn-' + id).style.backgroundColor = (id === siteId) ? '#3a0ca3' : '';
                document.getElementById('btn-' + id).style.color = (id === siteId) ? 'white' : '';
            });
        }

        // Show discount popup when page loads
        window.addEventListener('load', () => {
            const popup = document.getElementById('discountPopup');
            popup.style.display = 'flex'; // show popup as flex container to center content
        });

        // Close popup button
        document.getElementById('closeDiscountBtn').addEventListener('click', () => {
            const popup = document.getElementById('discountPopup');
            popup.style.display = 'none';
        });
        // Open payment modal when any Buy Now button clicked
        document.querySelectorAll('.buy-now-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.getElementById('paymentModal').style.display = 'flex';
            });
        });

        // Close payment modal
        document.getElementById('closePaymentBtn').addEventListener('click', () => {
            document.getElementById('paymentModal').style.display = 'none';
        });

        // Optional: Close modal if clicking outside the modal content
        window.addEventListener('click', (event) => {
            const modal = document.getElementById('paymentModal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
  window.onload = function () {
    document.getElementById('serverPopup').style.display = 'flex';
  };

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied: " + text);
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
  const buyButtons = document.querySelectorAll('.buy-now-btn');
  const paymentModal = document.getElementById('paymentFormModal');
  const closePaymentBtn = document.getElementById('closePaymentForm');
  const selectedRankInput = document.getElementById('selectedRank');

  buyButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Get the rank title from the same card as the clicked button
      const rankCard = button.closest('.rank-card');
      const rankTitle = rankCard.querySelector('.rank-title').textContent.trim();

      // Set hidden input value
      selectedRankInput.value = rankTitle;

      // Show modal
      paymentModal.style.display = 'flex';
    });
  });

  // Close modal on cancel click
  closePaymentBtn.addEventListener('click', () => {
    paymentModal.style.display = 'none';
  });

  // Close modal if clicking outside modal content
  paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
      paymentModal.style.display = 'none';
    }
  });
});

 // Default winners data
  const defaultWinners = [
    {
      name: "ZaxxCraft",
      event: "🎯 Parkour Champion",
      image: "asset/image/event_winner1.jpg"
    },
    {
      name: "Pitareloard",
      event: "⚔️ PvP Tournament Winner",
      image: "asset/image/event_winner2.jpg"
    },
    {
      name: "Ender_Filtex",
      event: "💰 Treasure Hunt Master",
      image: "asset/image/event_winner3.jpg"
    }
  ];

  // Load winners from localStorage or use default
  function loadWinners() {
    const stored = localStorage.getItem('laliMcWinners');
    if (stored) return JSON.parse(stored);
    return defaultWinners;
  }

  // Save winners to localStorage
  function saveWinners(data) {
    localStorage.setItem('laliMcWinners', JSON.stringify(data));
  }

  // Render winners cards
  function renderWinners() {
    const winners = loadWinners();
    const container = document.getElementById('winners-container');
    container.innerHTML = '';

    winners.forEach((winner, index) => {
      const card = document.createElement('div');
      card.style.width = '220px';
      card.style.textAlign = 'center';

      const img = document.createElement('img');
      img.src = winner.image;
      img.alt = `Event Winner ${index+1}`;
      img.style.width = '100%';
      img.style.borderRadius = '12px';
      img.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)';
      card.appendChild(img);

      const name = document.createElement('h3');
      name.textContent = winner.name;
      name.style.marginTop = '0.75rem';
      card.appendChild(name);

      const event = document.createElement('p');
      event.textContent = winner.event;
      event.style.fontSize = '0.9rem';
      event.style.color = 'gray';
      card.appendChild(event);

      container.appendChild(card);
    });
  }

  // Initialize render
  renderWinners();

  // Modal Elements
  const editBtn = document.getElementById('editWinnersBtn');
  const editModal = document.getElementById('editModal');
  const winnersForm = document.getElementById('winnersForm');
  const saveBtn = document.getElementById('saveBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  // Open modal and generate form inputs
  editBtn.addEventListener('click', () => {
    editModal.style.display = 'flex';
    winnersForm.innerHTML = '';

    const winners = loadWinners();
    winners.forEach((winner, i) => {
      const div = document.createElement('div');
      div.style.borderBottom = '1px solid #ddd';
      div.style.paddingBottom = '1rem';

      div.innerHTML = `
        <label><strong>Winner ${i+1} Name:</strong><br><input type="text" name="name${i}" value="${winner.name}" required style="width: 100%; padding: 6px; margin-top: 4px; border-radius: 6px; border: 1px solid #ccc;"></label>
        <label style="margin-top: 0.5rem;"><strong>Event Title:</strong><br><input type="text" name="event${i}" value="${winner.event}" required style="width: 100%; padding: 6px; margin-top: 4px; border-radius: 6px; border: 1px solid #ccc;"></label>
        <label style="margin-top: 0.5rem;"><strong>Image URL:</strong><br><input type="url" name="image${i}" value="${winner.image}" placeholder="Image URL or path" required style="width: 100%; padding: 6px; margin-top: 4px; border-radius: 6px; border: 1px solid #ccc;"></label>
      `;

      winnersForm.appendChild(div);
    });
  });

  // Close modal
  cancelBtn.addEventListener('click', () => {
    editModal.style.display = 'none';
  });

  // Save form data
  saveBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const winners = [];
    const formData = new FormData(winnersForm);
    const count = winnersForm.children.length;

    for(let i=0; i < count; i++) {
      const name = formData.get(`name${i}`);
      const event = formData.get(`event${i}`);
      const image = formData.get(`image${i}`);
      if (!name || !event || !image) {
        alert('Please fill all fields.');
        return;
      }
      winners.push({ name, event, image });
    }

    saveWinners(winners);
    renderWinners();
    editModal.style.display = 'none';
  });
