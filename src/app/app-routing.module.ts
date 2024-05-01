import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InterfaceComponent } from './interface/interface.component';
import { JournalFormComponent } from './journal-form/journal-form.component';
import { EditEntryComponent } from './edit-entry/edit-entry.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path: 'interface', component: InterfaceComponent},
  {path: 'journal-form', component: JournalFormComponent},
  {path: 'edit-entry/:entryId', component: EditEntryComponent},
  {path: 'update-password', component: UpdatePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
