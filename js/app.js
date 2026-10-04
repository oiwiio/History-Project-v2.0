const modal = document.getElementById('secretModal');
document.getElementById('secretBtn').addEventListener('click', () => modal.showModal());
document.getElementById('closeBtn').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
