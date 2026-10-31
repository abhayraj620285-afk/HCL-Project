import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container" aria-live="polite" aria-relevant="additions text" aria-atomic="false">
      <div
        *ngFor="let toast of toastService.toasts()"
        class="toast"
        [ngClass]="'toast-' + toast.type"
        [attr.role]="toast.type === 'error' ? 'alert' : 'status'"
      >
        <i
          class="toast-icon"
          [class]="
            toast.type === 'success'
              ? 'toast-icon icon-success ri-checkbox-circle-fill'
              : toast.type === 'error'
              ? 'toast-icon icon-error ri-error-warning-fill'
              : toast.type === 'warning'
              ? 'toast-icon icon-warning ri-alert-fill'
              : 'toast-icon icon-info ri-information-fill'
          "
          aria-hidden="true"
        ></i>
        <div class="toast-body">
          <div *ngIf="toast.title" class="toast-title">{{ toast.title }}</div>
          <div class="toast-message">{{ toast.message }}</div>
        </div>
        <button
          type="button"
          (click)="toastService.remove(toast.id)"
          class="toast-close"
          aria-label="Dismiss notification"
        >
          <i class="ri-close-line" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toast-icon { flex: 0 0 auto; margin-top: 1px; font-size: 1.15rem; }
    .icon-success { color: var(--color-success); }
    .icon-error { color: var(--color-danger); }
    .icon-warning { color: var(--color-warning); }
    .icon-info { color: var(--text-secondary); }
    .toast-body { flex: 1; min-width: 0; }
    .toast-title { font-size: 0.86rem; font-weight: 600; color: var(--text-primary); margin-bottom: 2px; }
    .toast-message { font-size: 0.84rem; color: var(--text-secondary); line-height: 1.45; overflow-wrap: anywhere; }
    .toast-close {
      display: grid;
      place-items: center;
      width: 28px;
      height: 28px;
      flex: 0 0 auto;
      margin: -4px -6px 0 0;
      border: 0;
      border-radius: var(--radius-sm);
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
    }
    .toast-close:hover { background: var(--bg-card-hover); color: var(--text-primary); }
    .toast-close:focus-visible { outline: 2px solid var(--border-focus); outline-offset: 1px; }
  `]
})
export class ToastComponent {
  public toastService = inject(ToastService);
}
