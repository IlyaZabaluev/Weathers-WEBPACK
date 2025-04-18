"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./styles.css");
class SoundsApp {
    constructor() {
        this.currentAudio = null;
        this.currentButton = null;
        this.originalIcons = new Map();
        this.init();
    }
    init() {
        const volumeControl = document.getElementById("volume");
        const buttons = document.querySelectorAll(".buttons button");
        volumeControl.addEventListener("input", () => {
            if (this.currentAudio) {
                this.currentAudio.volume = parseFloat(volumeControl.value);
            }
        });
        buttons.forEach((button) => {
            const htmlButton = button;
            const icon = htmlButton.querySelector("img");
            if (icon) {
                this.originalIcons.set(htmlButton, icon.src);
            }
            htmlButton.addEventListener("click", () => this.handleButtonClick(htmlButton));
        });
    }
    handleButtonClick(button) {
        const sound = button.getAttribute("data-sound");
        const background = button.getAttribute("data-background");
        if (!sound)
            return;
        if (this.currentAudio && this.currentButton === button) {
            if (!this.currentAudio.paused) {
                this.currentAudio.pause();
                this.updateButtonIcon(button, "original");
            }
            else {
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
        this.currentAudio.volume = parseFloat(document.getElementById("volume").value);
        this.currentAudio.play();
        this.currentButton = button;
        this.updateButtonIcon(button, "pause");
        const container = document.querySelector(".container");
        if (container) {
            container.style.backgroundImage = `url(${background})`;
        }
    }
    updateButtonIcon(button, iconType) {
        const icon = button.querySelector("img");
        if (icon) {
            if (iconType === "original") {
                icon.src = this.originalIcons.get(button) || "";
            }
            else if (iconType === "pause") {
                icon.src = "icons/pause.svg";
            }
        }
    }
}
new SoundsApp();
