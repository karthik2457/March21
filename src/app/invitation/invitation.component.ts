import { Component, ViewChild, ElementRef  } from '@angular/core';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent {
  @ViewChild('bgMusic') bgMusic!: ElementRef;

  opened = false;
  isOpening = false;

  senderName = "Bingo";

  message = `Hey Karthik ❤️ 
I’m celebrating my birthday and it would mean a lot if you come and celebrate with me.
Your presence will make my day even more special. Soo many budweisers are waiting for your presence 🍻.

`;

  displayText = "";
  index = 0;

  openInvitation() {

    this.isOpening = true;

    setTimeout(() => {

      this.opened = true;

      this.startTyping();
      this.playVoice();
      this.launchConfetti();
      this.playMusic();

    }, 1200);

  }

  startTyping() {

    const interval = setInterval(() => {

      if (this.index < this.message.length) {

        this.displayText += this.message.charAt(this.index);
        this.index++;

      } else {

        clearInterval(interval);

      }

    }, 40);

  }

  playMusic() {

    const audio = new Audio("assets/music.mp3");
    audio.play();

  }

  launchConfetti() {

    (confetti as any)({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 }
    });

  }

  playVoice() {

    const speech = new SpeechSynthesisUtterance(
      `Hi Karthik. This is ${this.senderName}. 
      I'm inviting you to my birthday celebration. 
      Please come and celebrate with me.`
    );

    const loadVoices = () => {

      const voices = speechSynthesis.getVoices();

      const femaleVoice = voices.find(v =>
        v.name.includes('Female') ||
        v.name.includes('Zira') ||
        v.name.includes('Samantha') ||
        v.name.includes('Google UK English Female')
      );

      if (femaleVoice) {
        speech.voice = femaleVoice;
      }

      speech.pitch = 1.2;
      speech.rate = 0.9;

      speechSynthesis.speak(speech);

    };

    if (speechSynthesis.getVoices().length === 0) {

      speechSynthesis.onvoiceschanged = loadVoices;

    } else {

      loadVoices();

    }

  }

  /* own words */
  showCard = false;
  displayText1 = '';
showHighlight = false;

message1 = `Hii,

It all started with a small New Year message on January 1st, 2025.

From that moment, we began talking for hours, sharing stories, and slowly building a bond.

There were times when things became silent between us, but somehow we always found our way back to talking again.

Through everything, I realized one simple truth — our connection means a lot to me.

And today, I just wanted to say…

I'm really glad that message was sent.`;

highlightText = "Happy Birthday BINGO";

openCard(){

  this.showCard = true;
   this.bgMusic.nativeElement.play();
  let i = 0;

  const typing = setInterval(() => {

    if(i < this.message1.length){
      this.displayText1 += this.message1.charAt(i);
      i++;
    } else {

      clearInterval(typing);

      setTimeout(()=>{
        this.showHighlight = true;
      },500);

    }

  },35);

}
}
