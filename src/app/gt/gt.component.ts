import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gt',
  templateUrl: './gt.component.html',
  styleUrls: ['./gt.component.css']
})
export class GtComponent implements OnInit {
  messages = [

    "May your year be filled with the kind of magic found in old stories and new adventures. Happy Birthday, Bingo🥰🥰🥰!"

  ];

  displayText = "";
  voices: SpeechSynthesisVoice[] = [];

  ngOnInit() {

    speechSynthesis.onvoiceschanged = () => {
      this.voices = speechSynthesis.getVoices();
    };

  }


  generateWish() {

    const random =
      this.messages[Math.floor(Math.random() * this.messages.length)];

    this.typeText(random);

    this.speak(random);

  }


  typeText(text: string) {

    this.displayText = "";

    let i = 0;

    const interval = setInterval(() => {

      if (i < text.length) {

        this.displayText += text.charAt(i);
        i++;

      } else {

        clearInterval(interval);

      }

    }, 50);

  }


  speak(message: string) {

    const speech = new SpeechSynthesisUtterance(message);

    speech.rate = 0.85;   // romantic slow speed
    speech.pitch = 1;     // natural pitch
    speech.volume = 1;

    const maleVoice = this.voices.find(v =>
      v.name.toLowerCase().includes('male') ||
      v.name.includes('David') ||
      v.name.includes('Mark')
    );

    if (maleVoice) {
      speech.voice = maleVoice;
    }

    speechSynthesis.speak(speech);

  }
}
