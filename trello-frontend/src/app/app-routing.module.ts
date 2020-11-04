import { EditBoardComponent } from './edit-board/edit-board.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'workspace', pathMatch: 'full' },
  { path: 'workspace', component: WorkspaceComponent },
  { path: 'edit/:id', component: EditBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
