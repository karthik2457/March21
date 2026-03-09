import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  /* =========================
     ✨ Typing Animation
  ========================== */

  texts: string[] = [
    "Start Your Journey Today",
    "Let’s Build Something Smart",
    "Welcome To NeuroAgent"
  ];

  displayedText: string = '';
  textIndex = 0;
  charIndex = 0;
  typingSpeed = 80;
  deletingSpeed = 40;
  isDeleting = false;

  /* =========================
     🔐 Modal + Auth Logic
  ========================== */

  showCard = false;
  userName = '';
  errorMessage = '';
  loading = false;

  /* =========================
     🎙 Voice System
  ========================== */

  voices: SpeechSynthesisVoice[] = [];
  selectedVoice!: SpeechSynthesisVoice;

  ngOnInit(): void {
    this.typeEffect();
    this.loadVoices();
  }

  /* =========================
     ✨ Typing Effect Logic
  ========================== */

  typeEffect() {
    const currentText = this.texts[this.textIndex];

    if (this.isDeleting) {
      this.displayedText = currentText.substring(0, this.charIndex--);
    } else {
      this.displayedText = currentText.substring(0, this.charIndex++);
    }

    if (!this.isDeleting && this.charIndex === currentText.length + 1) {
      setTimeout(() => this.isDeleting = true, 1500);
    }

    if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
    }

    setTimeout(() =>
      this.typeEffect(),
      this.isDeleting ? this.deletingSpeed : this.typingSpeed
    );
  }

  /* =========================
     🔐 Open Modal
  ========================== */

  openCard() {
    this.showCard = true;
    this.errorMessage = '';
  }

  /* =========================
     🎙 Load Available Voices
  ========================== */

  loadVoices() {
    this.voices = window.speechSynthesis.getVoices();

    if (this.voices.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = window.speechSynthesis.getVoices();
        this.setFemaleVoice();
      };
    } else {
      this.setFemaleVoice();
    }
  }

  /* =========================
     👩 Select Female Voice
  ========================== */

  setFemaleVoice() {
    // Try to find English female voice
    const femaleVoice = this.voices.find(voice =>
      voice.lang.includes('en') &&
      (
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('susan')
      )
    );

    this.selectedVoice = femaleVoice || this.voices[0];
  }

  /* =========================
     🎤 Speak Helper
  ========================== */

  speak(message: string) {
    if (!this.selectedVoice) return;

    const speech = new SpeechSynthesisUtterance(message);
    speech.voice = this.selectedVoice;
    speech.rate = 1;
    speech.pitch = 1.2; // softer tone
    speech.lang = 'en-US';

    window.speechSynthesis.speak(speech);
  }

  /* =========================
     🚀 Submit Name Logic
  ========================== */

  submitName() {

    if (!this.userName) {
      this.errorMessage = "Please enter your name";
      this.speak("Please enter your name.");
      return;
    }

    if (this.userName.toLowerCase() === 'bingo') {

      this.loading = true;
      this.errorMessage = '';

      this.speak("Welcome Sri Manju Tulasi. Access granted.");
      this.speak("Iam your secret helper. My boss karthik designed me for your birthday.")

      setTimeout(() => {
        this.router.navigate(['/agent']);
      }, 2000);

    } else {

      this.errorMessage = "Access Denied ❌. Enter Your Nick Name?";
      this.speak("Do not waste your time. Go and study.");

      setTimeout(() => {
        this.errorMessage = '';
      }, 800);
    }
  }
}
