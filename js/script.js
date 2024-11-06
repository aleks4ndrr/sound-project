document.addEventListener("DOMContentLoaded", () => {
  AOS.init();

  const titleH1 = document.querySelector(".title__h1");
  const arrow = document.getElementById("arrow");
  const mainPanel = document.getElementById("main__panel");
  const draggableImage = document.getElementById("cassette-tape");
  const dropZone = document.getElementById("dropZone");
  const openPlayer = document.getElementById("open_cassette_player");
  const closedPlayer = document.getElementById("closed_cassette_player");
  const audioPlayer = document.getElementById("audioPlayer");
  const playButton = document.getElementById("play");
  const pauseButton = document.getElementById("pause");
  const stopButton = document.getElementById("stop");
  let isDragging = false;

  arrow.addEventListener("click", () => {
    mainPanel.scrollIntoView({ behavior: "smooth" });
  });

  // Listen to the scroll event
  window.addEventListener("scroll", () => {
    const mainPanelTop = mainPanel.getBoundingClientRect().top;

    // Check if the main panel is reached and apply the class
    if (mainPanelTop <= 0) {
      titleH1.classList.add("title__h1--side");
    } else {
      titleH1.classList.remove("title__h1--side");
    }
  });
  // Play button
  playButton.addEventListener("click", () => {
    audioPlayer.play();
  });

  // Pause button
  pauseButton.addEventListener("click", () => {
    audioPlayer.pause();
  });

  // Stop button - pauses and resets the audio to the beginning
  stopButton.addEventListener("click", () => {
    audioPlayer.pause();
    audioPlayer.currentTime = 0; // Reset to start
  });
  // Start dragging - track the initial offset
  draggableImage.addEventListener("mousedown", (e) => {
    isDragging = true;
    // Get initial mouse and element positions
    const offsetX = e.offsetX;
    const offsetY = e.offsetY;

    // Set styles to enable dragging
    draggableImage.style.position = "absolute";
    draggableImage.style.pointerEvents = "none"; // Prevents image from blocking mousemove events

    function onMouseMove(event) {
      if (isDragging) {
        // Calculate the new position
        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;

        // Move the image
        draggableImage.style.left = `${x}px`;
        draggableImage.style.top = `${y}px`;
      }
    }

    // Stop dragging and check if it's in the drop zone
    function onMouseUp(event) {
      isDragging = false;
      draggableImage.style.pointerEvents = "auto"; // Re-enable pointer events

      // Check if the mouse is over the drop zone
      const dropZoneRect = dropZone.getBoundingClientRect();
      const imageRect = draggableImage.getBoundingClientRect();

      if (
        imageRect.left < dropZoneRect.right &&
        imageRect.right > dropZoneRect.left &&
        imageRect.top < dropZoneRect.bottom &&
        imageRect.bottom > dropZoneRect.top
      ) {
        draggableImage.style.display = "none";
        closedPlayer.style.display = "flex";
        openPlayer.style.display = "none";
        playButton.style.display = "flex";
        pauseButton.style.display = "flex";
        stopButton.style.display = "flex";
      }

      // Clean up event listeners
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    // Attach mousemove and mouseup listeners to the document
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
});
