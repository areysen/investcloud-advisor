import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header';

@Component({
  selector: 'app-holdings',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './holdings.html',
  styleUrl: './holdings.scss'
})
export class HoldingsComponent {}