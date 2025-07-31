import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

const matImports = [
  MatCard, MatCardHeader, MatCardSubtitle, MatCardContent, MatCardActions, MatCardTitle, MatButton
]

@Component({
  selector: 'app-home-page',
  imports: [...matImports],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {

}
