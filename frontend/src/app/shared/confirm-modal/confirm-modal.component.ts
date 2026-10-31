import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen" class="modal-backdrop" (click)="onCancel()" role="dialog" aria-modal="true">
      <div class="modal-card" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <div class="modal-icon" [ngClass]="danger ? 'icon-danger' : 'icon-info'">
            <i [class]="danger ? 'ri-error-warning-line' : 'ri-question-line'" aria-hidden="true"></i>
          </div>
          <div>
            <h3 class="modal-title">{{ title }}</h3>
            <p class="modal-message">{{ message }}</p>
          </div>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" (click)="onCancel()">
            {{ cancelText }}
          </button>
          <button
            type="button"
            class="btn"
            [ngClass]="danger ? 'btn-danger' : 'btn-primary'"
            (click)="onConfirm()"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: var(--bg-overlay);
      display: grid;
      place-items: center;
      z-index: 1050;
      padding: 1rem;
    }
    .modal-card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      max-width: 440px;
      width: 100%;
      box-shadow: var(--shadow-pop);
      animation: modal-enter 0.15s ease-out;
    }
    .modal-header { display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1.5rem; }
    .modal-icon { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; font-size: 1.25rem; flex-shrink: 0; }
    .icon-danger { background: var(--color-danger-bg); color: var(--color-danger); }
    .icon-info { background: var(--bg-card-hover); color: var(--text-secondary); }
    .modal-title { font-size: 1.05rem; font-weight: 600; color: var(--text-primary); margin: 0 0 0.3rem 0; }
    .modal-message { font-size: 0.9rem; color: var(--text-secondary); margin: 0; line-height: 1.5; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 0.6rem; }
    .btn-danger { background-color: var(--color-danger); color: #ffffff; border: 1px solid var(--color-danger); }
    .btn-danger:hover { background-color: var(--accent-glow); border-color: var(--accent-glow); color: #ffffff; }
    @keyframes modal-enter {
      from { opacity: 0; transform: scale(0.97); }
      to { opacity: 1; transform: scale(1); }
    }
  `]
})
export class ConfirmModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed?';
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';
  @Input() danger = true;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
