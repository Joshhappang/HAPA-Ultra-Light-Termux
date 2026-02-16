async function loadLedger() {
  try {
    const res = await fetch('reward_ledger.json');
    const ledger = await res.json();

    const lastBlock = ledger.last_block?.message || 'Belum ada blok';
    const reward = ledger.last_block?.reward ?? 0;
    const deviceCount = ledger.device_count ?? 0;

    document.getElementById('lastBlock').innerText = lastBlock;
    document.getElementById('stakingAmt').innerText = reward + " USD";
    document.getElementById('deviceCount').innerText = deviceCount;

    const ctx = document.getElementById('rewardChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Block 1','Block 2','Block 3','Block 4','Block 5'],
        datasets: [{
          label: 'Reward USD',
          data: [reward-50, reward-20, reward-10, reward, reward+30],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
    });

  } catch(err) {
    console.warn("Ledger tidak ditemukan, gunakan fallback default");
    document.getElementById('lastBlock').innerText = 'Belum ada blok';
    document.getElementById('stakingAmt').innerText = '0 USD';
    document.getElementById('deviceCount').innerText = '0';
  }
}

// Auto-update setiap 5 detik
setInterval(loadLedger, 5000);

// Load pertama
loadLedger();
