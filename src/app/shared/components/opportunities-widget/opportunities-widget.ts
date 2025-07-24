import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIconComponent } from '@ng-icons/core';
import {
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
  HlmCardContentDirective,
} from '../../ui/ui-card-helm/src/index';
import { HlmBadgeDirective } from '../../ui/ui-badge-helm/src/lib/hlm-badge.directive';

interface Opportunity {
  opportunity: string;
  primaryContact: string;
  stage: 'Won' | 'Active' | 'Lost';
  completionDate: string;
  nextAction: string;
  priority: 'High' | 'Medium' | 'Low';
}

@Component({
  selector: 'app-opportunities-widget',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgIconComponent,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    HlmBadgeDirective
  ],
  templateUrl: './opportunities-widget.html',
  styleUrl: './opportunities-widget.scss'
})
export class OpportunitiesWidgetComponent {
  opportunities: Opportunity[] = [
    // High Priority
    { 
      opportunity: "Education accounts", 
      primaryContact: "Mikayla", 
      stage: "Won", 
      completionDate: "03/22/2023", 
      nextAction: "Initial Email",
      priority: "High"
    },
    { 
      opportunity: "Investment Proposal", 
      primaryContact: "Lester", 
      stage: "Active", 
      completionDate: "05/01/2023", 
      nextAction: "Discuss Feedback...",
      priority: "High"
    },
    { 
      opportunity: "Financial Planning", 
      primaryContact: "Evan Harley", 
      stage: "Active", 
      completionDate: "05/15/2023", 
      nextAction: "Schedule Meeting",
      priority: "High"
    },
    // Medium Priority
    { 
      opportunity: "IRA rollover opportunity", 
      primaryContact: "Kenna Diaz", 
      stage: "Won", 
      completionDate: "03/29/2023", 
      nextAction: "Initial Email",
      priority: "Medium"
    },
    { 
      opportunity: "Real Estate Expansion", 
      primaryContact: "Cruz Young", 
      stage: "Active", 
      completionDate: "04/14/2023", 
      nextAction: "Follow-Up Call",
      priority: "Medium"
    },
    { 
      opportunity: "Trust fund set-up", 
      primaryContact: "Paul Goodwin", 
      stage: "Active", 
      completionDate: "04/25/2023", 
      nextAction: "Schedule Meeting",
      priority: "Medium"
    },
    // Additional opportunities
    { 
      opportunity: "Retirement Planning", 
      primaryContact: "Sarah Chen", 
      stage: "Active", 
      completionDate: "04/30/2023", 
      nextAction: "Send Proposal",
      priority: "Medium"
    },
    { 
      opportunity: "Tax Strategy Review", 
      primaryContact: "James Wilson", 
      stage: "Active", 
      completionDate: "05/10/2023", 
      nextAction: "Review Documents",
      priority: "Low"
    },
    { 
      opportunity: "Estate Planning", 
      primaryContact: "Maria Garcia", 
      stage: "Won", 
      completionDate: "03/15/2023", 
      nextAction: "Complete Setup",
      priority: "Low"
    },
    { 
      opportunity: "College Fund Setup", 
      primaryContact: "Robert Kim", 
      stage: "Active", 
      completionDate: "05/20/2023", 
      nextAction: "Initial Meeting",
      priority: "Low"
    }
  ];


  // Grouping configuration
  selectedGrouping = 'priority';
  groupingOptions = [
    { value: 'priority', label: 'Priority' },
    { value: 'stage', label: 'Stage' },
    { value: 'primaryContact', label: 'Contact' }
  ];

  get groupedOpportunities() {
    const groups: { [key: string]: Opportunity[] } = {};
    
    this.opportunities.forEach(opp => {
      const key = opp[this.selectedGrouping as keyof Opportunity] as string;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(opp);
    });

    // Sort groups based on priority order
    if (this.selectedGrouping === 'priority') {
      const priorityOrder = ['High', 'Medium', 'Low'];
      return Object.entries(groups).sort(([a], [b]) => 
        priorityOrder.indexOf(a) - priorityOrder.indexOf(b)
      );
    }

    return Object.entries(groups).sort();
  }

  onEditColumns() {
    console.log('Edit columns clicked');
    // Implement column editing functionality
  }

  onGroupingChange(value: string) {
    this.selectedGrouping = value;
  }

  onRowClick(opportunity: Opportunity) {
    console.log('Opportunity clicked:', opportunity);
  }

  onPageChange(page: number) {
    console.log('Page changed to:', page);
  }
}