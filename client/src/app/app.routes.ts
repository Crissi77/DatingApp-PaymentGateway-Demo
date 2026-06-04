import { Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home.component';
import { MembersListComponent } from '../features/members/members-list/members-list.component';
import { MembersDetailedComponent } from '../features/members/members-detailed/members-detailed.component';
import { ListsComponent } from '../features/lists/lists.component';
import { MessagesComponent } from '../features/messages/messages.component';
import { authGuard } from '../core/auth.guard';
import { PaymentGatewayComponent } from '../features/features/payment-gateway/payment-gateway.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },

    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'members', component: MembersListComponent },
            { path: 'members/:id', component: MembersDetailedComponent },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent },
            {path:'payment',component:PaymentGatewayComponent}
        ]
    },
    { path: '**', component: HomeComponent },

];
