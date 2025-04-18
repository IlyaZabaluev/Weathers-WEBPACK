import "./styles.css";

class SoundsApp {
  currentAudio: HTMLAudioElement | null = null;
  currentButton: HTMLButtonElement | null = null;
  originalIcons: Map<HTMLButtonElement, string> = new Map();

  constructor() {
    this.init();
  }

  init(): void {
    const volumeControl = document.getElementById("volume") as HTMLInputElement;
    const buttons =
      document.querySelectorAll<HTMLButtonElement>(".buttons button");
    volumeControl.addEventListener("input", () => {
      if (this.currentAudio) {
        this.currentAudio.volume = parseFloat(volumeControl.value);
      }
    });
    buttons.forEach((button) => {
      const htmlButton = button;
      const icon = htmlButton.querySelector<HTMLImageElement>("img");
      if (icon) {
        this.originalIcons.set(htmlButton, icon.src);
      }
      htmlButton.addEventListener("click", () =>
        this.handleButtonClick(htmlButton)
      );
    });
  }
  handleButtonClick(button: HTMLButtonElement): void {
    const sound = button.getAttribute("data-sound");
    const background = button.getAttribute("data-background");

    if (!sound) return;

    if (this.currentAudio && this.currentButton === button) {
      if (!this.currentAudio.paused) {
        this.currentAudio.pause();
        this.updateButtonIcon(button, "original");
      } else {
        this.currentAudio.play();
        this.updateButtonIcon(button, "pause");
      }
      return;
    }
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      if (this.currentButton) {
        this.updateButtonIcon(this.currentButton, "original");
      }
    }
    this.currentAudio = new Audio(sound);
    this.currentAudio.volume = parseFloat(
      (document.getElementById("volume") as HTMLInputElement).value
    );
    this.currentAudio.play();
    this.currentButton = button;
    this.updateButtonIcon(button, "pause");
    const container = document.querySelector<HTMLElement>(".container");
    if (container) {
      container.style.backgroundImage = `url(${background})`;
    }
  }
  updateButtonIcon(
    button: HTMLButtonElement,
    iconType: "original" | "pause"
  ): void {
    const icon = button.querySelector<HTMLImageElement>("img");
    if (icon) {
      if (iconType === "original") {
        icon.src = this.originalIcons.get(button) || "";
      } else if (iconType === "pause") {
        icon.src = "icons/pause.svg";
      }
    }
  }
}
new SoundsApp();
