import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private defaultConfig: Partial<IndividualConfig> = {
    closeButton: true,
    progressBar: true,
    progressAnimation: 'increasing',
    timeOut: 4000,
    enableHtml: true,
    newestOnTop: true,
    positionClass: 'toast-bottom-right'
  };

  constructor(private toastr: ToastrService) {}

  success(message: string, title = 'Success') {
    this.toastr.success(this.formatMessage(message, 'success'), title, this.defaultConfig);
  }

  error(message: string, title = 'Error') {
    this.toastr.error(this.formatMessage(message, 'error'), title, this.defaultConfig);
  }

  warning(message: string, title = 'Warning') {
    this.toastr.warning(this.formatMessage(message, 'warning'), title, this.defaultConfig);
  }

  info(message: string, title = 'Info') {
    this.toastr.info(this.formatMessage(message, 'info'), title, this.defaultConfig);
  }

  /** Automatically adds emoji based on type */
  private formatMessage(message: string, type: 'success' | 'error' | 'warning' | 'info'): string {
    const emojiMap: Record<typeof type, string> = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return `<span>${emojiMap[type]} ${message}</span>`;
  }
}
