import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit{
   showSurprise = false;
  isBirthdayToday = false;

  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;

  nextBirthday!: number;

  ngOnInit(): void {
    this.initializeBirthdayLogic();
  }

  initializeBirthdayLogic() {
    const today = new Date();
    const currentYear = today.getFullYear();

    const birthdayThisYear = new Date(currentYear, 2, 21); // March = 2

    // 🎉 If today is March 21 → Full celebration mode
    if (
      today.getFullYear() === birthdayThisYear.getFullYear() &&
      today.getMonth() === birthdayThisYear.getMonth() &&
      today.getDate() === birthdayThisYear.getDate()
    ) {
      this.isBirthdayToday = true;
      return; // STOP here → No countdown today
    }

    // 📅 If birthday already passed → set next year
    if (today > birthdayThisYear) {
      this.nextBirthday = new Date(currentYear + 1, 2, 21, 0, 0, 0).getTime();
    } else {
      this.nextBirthday = new Date(currentYear, 2, 21, 0, 0, 0).getTime();
    }

    this.startCountdown();
  }

  startCountdown() {
    setInterval(() => {

      const now = new Date().getTime();
      const distance = this.nextBirthday - now;

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

    }, 1000);
  }
  showOptions = false;
  revealSurprise() {
    this.showSurprise = true;
    this.showOptions = true;
  }
}
