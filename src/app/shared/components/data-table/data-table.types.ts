export type ColumnType = 'text' | 'number' | 'currency' | 'date' | 'icon' | 'action' | 'link' | 'percent' | 'custom';

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  type: ColumnType;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  format?: (value: any, row: T) => string;
  icon?: string;
  iconColor?: string;
  onClick?: (row: T) => void;
}

export interface TableConfig {
  pageSize?: number;
  pageSizeOptions?: number[];
  showPagination?: boolean;
  showFilter?: boolean;
  filterPlaceholder?: string;
  emptyMessage?: string;
  initialSort?: {
    active: string;
    direction: SortDirection;
  };
  showAllToggle?: boolean;
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
  length: number;
}

export type SortDirection = 'asc' | 'desc' | '';

export interface SortState<T> {
  active: keyof T | string | null;
  direction: SortDirection;
}

export interface FilterState {
  [key: string]: string;
}