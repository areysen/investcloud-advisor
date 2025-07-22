import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmCardDirective, HlmCardHeaderDirective, HlmCardTitleDirective, HlmCardContentDirective } from '../../ui/ui-card-helm/src/index';
import { HlmButtonDirective } from '../../ui/ui-button-helm/src/lib/hlm-button.directive';
import { NgIconComponent } from '@ng-icons/core';

export interface Transaction {
  id: string;
  person: string;
  amount: number;
  type: 'contribution' | 'withdrawal';
  description: string;
  date: string;
}

@Component({
  selector: 'app-contributions-withdrawals-widget',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    HlmButtonDirective,
    NgIconComponent
  ],
  templateUrl: './contributions-withdrawals-widget.html',
  styleUrl: './contributions-withdrawals-widget.scss'
})
export class ContributionsWithdrawalsWidgetComponent {
  @Input() transactions: Transaction[] = [
    { 
      id: '1', 
      person: 'Laura Harley', 
      amount: 35000, 
      type: 'contribution',
      description: 'Contribution to XXXXX593',
      date: '03/14/2023' 
    },
    { 
      id: '2', 
      person: 'Evan Harley', 
      amount: 15000, 
      type: 'withdrawal',
      description: 'Withdrawal from XXXXX2810',
      date: '03/14/2023' 
    },
    { 
      id: '3', 
      person: 'Evan Harley', 
      amount: 5000, 
      type: 'withdrawal',
      description: 'Withdrawal from XXXXX2810',
      date: '03/14/2023' 
    },
    { 
      id: '4', 
      person: 'Laura Harley', 
      amount: 5000, 
      type: 'contribution',
      description: 'Contribution to XXXXX593',
      date: '03/14/2023' 
    }
  ];

  formatAmount(amount: number): string {
    return amount.toLocaleString('en-US');
  }

  onViewAll() {
    console.log('View all contributions/withdrawals clicked');
    // Implement navigation to contributions/withdrawals page
  }

  onCopy() {
    console.log('Copy contributions/withdrawals data');
    // Implement copy functionality
    const data = this.transactions.map(t => 
      `${t.person} made a ${this.formatAmount(t.amount)} ${t.type} - ${t.description} (${t.date})`
    ).join('\n');
    
    navigator.clipboard.writeText(data).then(() => {
      console.log('Data copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }
}