import { Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page';
import { TypeList } from './components/type-list/type-list/type-list';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'type/:name',
    component: TypeList,
  },
];
