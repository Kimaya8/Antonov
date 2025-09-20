const confettiViz = {
  render: (data, config, element) => {
    // Clear existing content
    element.innerHTML = "";

    // Create a canvas for confetti
    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    element.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    // Load the confetti library
    if (!window.confetti) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js";
      script.onload = () => {
        runConfetti();
      };
      document.body.appendChild(script);
    } else {
      runConfetti();
    }

    function runConfetti() {
      if (!data || !data.tables || !data.tables.DEFAULT) return;

      // Check if all Remarks are "Congratulations"
      const remarks = data.tables.DEFAULT.map(row => row["dim0"]?.value);
      const allCongrats = remarks.every(r => r === "Congratulations");

      if (allCongrats) {
        // Trigger confetti animation
        const myConfetti = confetti.create(canvas, { resize: true });
        myConfetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }
};

google.visualization?.viz?.register("confettiViz", confettiViz);
