import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconComponent } from '@ng-icons/core';
import { 
  HlmTableDirective,
  HlmTHeadDirective,
  HlmTBodyDirective,
  HlmTrDirective,
  HlmThDirective,
  HlmTdDirective
} from '../../ui/ui-table-helm/src/lib/hlm-table.directive';
import { HlmInputDirective } from '../../ui/ui-input-helm/src/lib/hlm-input.directive';
import { HlmButtonDirective } from '../../ui/ui-button-helm/src/lib/hlm-button.directive';
import { ValueIndicatorComponent } from '../value-indicator/value-indicator';
import {
  TableColumn,
  TableConfig,
  PaginationState,
  SortState,
  FilterState,
  SortDirection
} from './data-table.types';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIconComponent,
    ValueIndicatorComponent,
    HlmTableDirective,
    HlmTHeadDirective,
    HlmTBodyDirective,
    HlmTrDirective,
    HlmThDirective,
    HlmTdDirective,
    HlmInputDirective,
    HlmButtonDirective
  ],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss'
})
export class DataTableComponent<T> implements OnInit {
  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() config: TableConfig = {
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
    showPagination: true,
    showFilter: true,
    filterPlaceholder: 'Filter...',
    emptyMessage: 'No data to display'
  };
  
  @Output() rowClick = new EventEmitter<T>();
  @Output() actionClick = new EventEmitter<{ action: string; row: T }>();
  
  // Internal state
  filteredData: T[] = [];
  displayedData: T[] = [];
  showAllItems = false;
  
  sortState: SortState<T> = {
    active: null,
    direction: ''
  };
  
  filterState: FilterState = {};
  
  paginationState: PaginationState = {
    pageIndex: 0,
    pageSize: 10,
    length: 0
  };
  
  ngOnInit() {
    // Initialize pagination with config values
    this.paginationState.pageSize = this.config.pageSize || 10;
    
    // Apply initial sort if configured
    if (this.config.initialSort) {
      this.sortState.active = this.config.initialSort.active;
      this.sortState.direction = this.config.initialSort.direction;
    }
    
    this.updateDisplayedData();
  }
  
  ngOnChanges() {
    this.updateDisplayedData();
  }
  
  // Sorting
  sort(column: TableColumn<T>) {
    if (!column.sortable) return;
    
    const isAsc = this.sortState.active === column.key && this.sortState.direction === 'asc';
    this.sortState.active = column.key;
    this.sortState.direction = isAsc ? 'desc' : 'asc';
    
    this.updateDisplayedData();
  }
  
  getSortIcon(column: TableColumn<T>): string {
    if (!column.sortable) return '';
    if (this.sortState.active !== column.key) return '';
    return this.sortState.direction === 'asc' ? 'lucideChevronUp' : 'lucideChevronDown';
  }
  
  showSortIcon(column: TableColumn<T>): boolean {
    return !!column.sortable && this.sortState.active === column.key;
  }
  
  // Filtering
  onFilterChange(column: TableColumn<T>, value: string) {
    this.filterState[column.key as string] = value;
    this.paginationState.pageIndex = 0; // Reset to first page
    this.updateDisplayedData();
  }
  
  // Pagination
  onPageChange(pageIndex: number) {
    this.paginationState.pageIndex = pageIndex;
    this.updateDisplayedData();
  }
  
  get totalPages(): number {
    return Math.ceil(this.paginationState.length / this.paginationState.pageSize);
  }
  
  get pageNumbers(): number[] {
    const pages = [];
    const maxPages = 5;
    const halfPages = Math.floor(maxPages / 2);
    
    let start = Math.max(1, this.paginationState.pageIndex + 1 - halfPages);
    let end = Math.min(this.totalPages, start + maxPages - 1);
    
    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }
  
  // Data processing
  private updateDisplayedData() {
    let processedData = [...this.data];
    
    // Apply filters
    if (this.config.showFilter) {
      processedData = this.applyFilters(processedData);
    }
    
    // Apply sorting
    if (this.sortState.active && this.sortState.direction) {
      processedData = this.applySorting(processedData);
    }
    
    this.filteredData = processedData;
    this.paginationState.length = processedData.length;
    
    // Apply pagination
    if (this.config.showPagination && !this.showAllItems) {
      const start = this.paginationState.pageIndex * this.paginationState.pageSize;
      const end = start + this.paginationState.pageSize;
      this.displayedData = processedData.slice(start, end);
    } else {
      this.displayedData = processedData;
    }
  }
  
  private applyFilters(data: T[]): T[] {
    return data.filter(row => {
      return Object.keys(this.filterState).every(key => {
        const filterValue = this.filterState[key];
        if (!filterValue) return true;
        
        const column = this.columns.find(col => col.key === key);
        if (!column || !column.filterable) return true;
        
        const cellValue = this.getCellValue(row, column);
        return cellValue.toString().toLowerCase().includes(filterValue.toLowerCase());
      });
    });
  }
  
  private applySorting(data: T[]): T[] {
    const column = this.columns.find(col => col.key === this.sortState.active);
    if (!column) return data;
    
    return data.sort((a, b) => {
      const aValue = this.getCellValue(a, column);
      const bValue = this.getCellValue(b, column);
      
      let comparison = 0;
      if (column.type === 'number' || column.type === 'currency') {
        comparison = Number(aValue) - Number(bValue);
      } else if (column.type === 'date') {
        comparison = new Date(aValue).getTime() - new Date(bValue).getTime();
      } else {
        comparison = aValue.toString().localeCompare(bValue.toString());
      }
      
      return this.sortState.direction === 'asc' ? comparison : -comparison;
    });
  }
  
  // Helpers
  getCellValue(row: T, column: TableColumn<T>): any {
    const keys = (column.key as string).split('.');
    let value: any = row;
    
    for (const key of keys) {
      value = value[key];
      if (value === undefined || value === null) break;
    }
    
    return value;
  }
  
  formatCellValue(row: T, column: TableColumn<T>): string {
    const value = this.getCellValue(row, column);
    
    if (column.format) {
      return column.format(value, row);
    }
    
    switch (column.type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(value);
      case 'number':
        return new Intl.NumberFormat('en-US').format(value);
      case 'percent':
        return new Intl.NumberFormat('en-US', {
          style: 'percent',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(value);
      case 'date':
        return new Date(value).toLocaleDateString();
      default:
        return value?.toString() || '';
    }
  }
  
  onRowClicked(row: T) {
    this.rowClick.emit(row);
  }
  
  onActionClicked(column: TableColumn<T>, row: T, event: Event) {
    event.stopPropagation();
    if (column.onClick) {
      column.onClick(row);
    }
    this.actionClick.emit({ action: column.key as string, row });
  }
  
  onLinkClicked(event: Event, column: TableColumn<T>, row: T) {
    event.preventDefault();
    event.stopPropagation();
    if (column.onClick) {
      column.onClick(row);
    }
    this.rowClick.emit(row);
  }
  
  // Show all toggle
  onShowAllToggle() {
    if (this.showAllItems) {
      // Show all items
      this.displayedData = this.filteredData;
    } else {
      // Revert to paginated view
      this.paginationState.pageIndex = 0;
      this.updateDisplayedData();
    }
  }
  
  
  // Template helper for Math
  Math = Math;
}
