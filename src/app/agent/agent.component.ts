  import { Component } from '@angular/core';
  import { FormBuilder, FormGroup } from '@angular/forms';

  // interface Message {
  //   text?: string;
  //   sender: 'user' | 'bot';
  //   options?: string[];
  //   sticker?: string;
  // }


  @Component({
    selector: 'app-agent',
    templateUrl: './agent.component.html',
    styleUrls: ['./agent.component.css']
  })
  export class AgentComponent {
    started = false;
    showIntro = false;
    finished = false;
    currentIndex = 0;
    userAnswer = '';
    answers: string[] = [];

    questions = [
      {
        text: "Iam Your Secret Helper... Say Hi",
        type: "video",
        media: "assets/stickers/hii.mp4"
      },
      {
        text: "How To Perform Like This? Give Me Some Advice ?",
        type: "image",
        media: "assets/stickers/bingo.jpeg"
      },
      {
        text: "Why Are You Looking Soo Cute? 👀 Like This...",
        type: "image",
        media: "assets/stickers/Twinsis.webp"
      },
      {
        text: "Why Are You Looking Soo Serious Everytime ? 😡",
        type: "image",
        media: "assets/stickers/serious.webp"
      },
      {
        text: "Can we make more memories together? 💕",
        type: "gif",
        media: "assets/stickers/cute-dog.gif"
      }
    ];

    // celebrationOptions: AnimationOptions = {
    //   path: 'assets/stickers/celebration.json'
    // };

    startFlow(choice: 'yes' | 'no') {
      if (choice === 'no') {
        this.showIntro = true;
      } else {
        this.started = true;
      }
    }

    beginQuestions() {
      this.showIntro = false;
      this.started = true;
    }

    submitAnswer() {
      if (!this.userAnswer.trim()) return;

      // Save answer at correct index
      this.answers[this.currentIndex] = this.userAnswer;

      this.userAnswer = '';
      this.currentIndex++;

      if (this.currentIndex >= this.questions.length) {
        this.started = false;
        this.finished = true;
      } else {
        // preload next question answer if already exists
        this.userAnswer = this.answers[this.currentIndex] || '';
      }
    }

    goPrevious() {
      if (this.currentIndex > 0) {
        this.currentIndex--;

        // restore previous answer into input field
        this.userAnswer = this.answers[this.currentIndex] || '';
      }
    }
    restart() {
      this.started = false;
      this.showIntro = false;
      this.finished = false;
      this.currentIndex = 0;
      this.answers = [];
    }
  }
