import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [ngClass]="getBadgeClass()">
      <span class="badge-dot" aria-hidden="true"></span>
      {{ status | titlecase }}
    </span>
  `,
  styles: [`
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.18rem 0.6rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      border: 1px solid transparent;
    }
    .badge-dot { width: 6px; height: 6px; border-radius: 50%; background-color: currentColor; }
    .badge-info { background: var(--color-info-bg); color: var(--color-info); border-color: var(--color-info-border); }
    .badge-purple { background: #F1EFFD; color: #5B47C9; border-color: #DDD8F7; }
    .badge-success { background: var(--color-success-bg); color: var(--color-success); border-color: var(--color-success-border); }
    .badge-danger { background: var(--color-danger-bg); color: var(--color-danger); border-color: var(--color-danger-border); }
    .badge-warning { background: var(--color-warning-bg); color: var(--color-warning); border-color: var(--color-warning-border); }
    .badge-neutral { background: var(--bg-card-hover); color: var(--text-secondary); border-color: var(--border-subtle); }
    :host-context([data-theme="dark"]) .badge-purple { background: #1F1B3A; color: #B4A8FF; border-color: #372F66; }
  `]
})
export class StatusBadgeComponent {
  @Input({ required: true }) status = '';

  getBadgeClass(): string {
    const s = this.status?.toUpperCase() || '';
    switch (s) {
      case 'PLACED':
      case 'ORDERED':
        return 'badge-info';
      case 'SHIPPED':
        return 'badge-purple';
      case 'DELIVERED':
      case 'RECEIVED':
        return 'badge-success';
      case 'CANCELLED':
        return 'badge-danger';
      case 'PENDING':
      default:
        return 'badge-neutral';
    }
  }
}
