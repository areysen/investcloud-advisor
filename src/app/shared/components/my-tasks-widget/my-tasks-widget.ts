import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmCardDirective, HlmCardHeaderDirective, HlmCardTitleDirective, HlmCardContentDirective } from '../../ui/ui-card-helm/src/index';
import { HlmButtonDirective } from '../../ui/ui-button-helm/src/lib/hlm-button.directive';
import { HlmCheckboxComponent } from '../../ui/ui-checkbox-helm/src/lib/hlm-checkbox.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucidePlus, lucideTriangleAlert } from '@ng-icons/lucide';

export interface Task {
  id: string;
  name: string;
  person: string;
  date: string;
  completed: boolean;
  hasWarning: boolean;
}

@Component({
  selector: 'app-my-tasks-widget',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    HlmButtonDirective,
    HlmCheckboxComponent,
    NgIconComponent
  ],
  providers: [
    provideIcons({ lucidePlus, lucideTriangleAlert })
  ],
  templateUrl: './my-tasks-widget.html',
  styleUrl: './my-tasks-widget.scss'
})
export class MyTasksWidgetComponent {
  @Input() tasks: Task[] = [
    {
      id: '1',
      name: 'Follow-Up Call',
      person: 'Laura Harley',
      date: '03/14/2023',
      completed: false,
      hasWarning: true
    },
    {
      id: '2',
      name: 'Follow-Up Email',
      person: 'Don Sims',
      date: '03/14/2023',
      completed: false,
      hasWarning: true
    },
    {
      id: '3',
      name: 'Follow-Up Email',
      person: 'Jim Hogan',
      date: '03/14/2023',
      completed: false,
      hasWarning: false
    },
    {
      id: '4',
      name: 'Schedule Meeting',
      person: 'Adam Smith',
      date: '03/14/2023',
      completed: false,
      hasWarning: false
    },
    {
      id: '5',
      name: 'Schedule Meeting',
      person: 'Sam Smith',
      date: '03/14/2023',
      completed: false,
      hasWarning: false
    }
  ];

  onTaskToggle(task: Task) {
    task.completed = !task.completed;
    console.log(`Task ${task.id} toggled:`, task.completed);
    // Implement task update logic
  }

  onNewTask() {
    console.log('New task clicked');
    // Implement new task creation
  }

  onViewAll() {
    console.log('View all tasks clicked');
    // Implement navigation to tasks page
  }
}