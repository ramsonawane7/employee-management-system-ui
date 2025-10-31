import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datetime-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert alert-info mb-4 d-flex align-items-center justify-content-between shadow-sm rounded">
      <div>
        <strong>Date:</strong> {{ today }}
        <span class="mx-3"><strong>Day:</strong> {{ day }}</span>
      </div>
      <div class="fw-bold fs-5">
        <i class="bi bi-clock me-2"></i>{{ time }}
      </div>
    </div>
  `
})
export class DatetimeWidgetComponent implements OnInit, OnDestroy {
  today = '';
  day = '';
  time = '';
  #intervalId?: any;

  update() {
    const now = new Date();
    this.today = now.toISOString().slice(0, 10);
    this.day = now.toLocaleDateString(undefined, { weekday: 'long' });
    this.time = now.toLocaleTimeString();
  }
  ngOnInit() {
    this.update();
    this.#intervalId = setInterval(() => this.update(), 1000);
  }
  ngOnDestroy() { clearInterval(this.#intervalId); }
}
