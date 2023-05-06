document.addEventListener("DOMContentLoaded", function () {
  const status = document.getElementById("status");
  const equation = document.getElementById("equation");
  const answerInput = document.getElementById("answer");
  const submitButton = document.getElementById("submit");

  const a = Math.floor(Math.random() * 1000);
  const b = Math.floor(Math.random() * 1000);
  const c = Math.floor(Math.random() * 1000);
  const d = Math.floor(Math.random() * 1000);

  equation.textContent = `${a} + ${b} - ${c} + ${d} = ?`;

  const correctAnswer = a + b - c + d;

  submitButton.addEventListener("click", function () {
    const userAnswer = parseFloat(answerInput.value);

    if (userAnswer === correctAnswer) {
      status.textContent = "Correct answer! Unblocking YouTube...";
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { unblock: true });
      });
    } else {
      status.textContent = "Incorrect answer. Try again.";
    }
  });
});
