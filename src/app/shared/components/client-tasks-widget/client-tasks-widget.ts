import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
  HlmCardContentDirective,
} from '../../ui/ui-card-helm/src/index';
import { HlmButtonDirective } from '../../ui/ui-button-helm/src/lib/hlm-button.directive';
import { DataTableComponent } from '../data-table/data-table';
import { TableColumn, TableConfig } from '../data-table/data-table.types';

interface ClientTask {
  client: string;
  task: string;
  dueDate: string;
}

@Component({
  selector: 'app-client-tasks-widget',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    HlmButtonDirective,
    DataTableComponent
  ],
  templateUrl: './client-tasks-widget.html',
  styleUrl: './client-tasks-widget.scss'
})
export class ClientTasksWidgetComponent {
  clientTasks: ClientTask[] = [
    { client: "Laura Harley", task: "Complete new tax doc...", dueDate: "3/1/2023" },
    { client: "Laura Harley", task: "Finish account setup", dueDate: "2/24/2023" },
    { client: "Evan Harley", task: "Add Beneficiaries", dueDate: "2/11/2023" },
    { client: "Camille Smith", task: "Complete Yearly Review", dueDate: "1/21/2023" },
    { client: "Andy Smith", task: "Complete new tax doc...", dueDate: "1/19/2023" }
  ];

  columns: TableColumn<ClientTask>[] = [
    {
      key: 'client',
      label: 'Client',
      type: 'text',
      sortable: true
    },
    {
      key: 'task',
      label: 'Task',
      type: 'text',
      sortable: true
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      type: 'text',
      align: 'right',
      sortable: true
    }
  ];

  tableConfig: TableConfig = {
    pageSize: 5,
    pageSizeOptions: [5],
    showPagination: false,
    showFilter: false,
    emptyMessage: 'No tasks available'
  };

  onViewAll() {
    console.log('View All clicked');
    // Implement navigation to all tasks
  }

  onRowClick(task: ClientTask) {
    console.log('Task clicked:', task);
  }
}