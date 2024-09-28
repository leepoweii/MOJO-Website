// Show the agreement modal on page load
window.onload = () => {
  document.getElementById("agreement").style.display = "flex";
};

// Handle agreement acceptance
document.getElementById("agreement-accept").addEventListener("click", () => {
  document.getElementById("agreement").style.display = "none";
  // Trigger content load after agreement is accepted
  loadContent();
});
