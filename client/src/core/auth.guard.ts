import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from './account.service';
import { ToastService } from '../app/toast.service';

export const authGuard: CanActivateFn = () => {
 const accountService =  inject(AccountService);
 const toast = inject(ToastService);

  if(accountService.currentUser()) return true;
  else {
    toast.error('you shall not pass');
    return false;
  }
};
