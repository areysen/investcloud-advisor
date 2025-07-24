import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import {
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
  HlmCardContentDirective,
} from '../../ui/ui-card-helm/src/index';
import { DataTableComponent } from '../data-table/data-table';
import { TableColumn, TableConfig } from '../data-table/data-table.types';

interface StockItem {
  symbol: string;
  price: number;
  changePercent: number;
}

@Component({
  selector: 'app-watchlist-widget',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIconComponent,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    DataTableComponent
  ],
  templateUrl: './watchlist-widget.html',
  styleUrl: './watchlist-widget.scss'
})
export class WatchlistWidgetComponent {
  watchlistData: StockItem[] = [
    { symbol: "ECCF", price: 25.11, changePercent: 0.0 },
    { symbol: "AMUSX", price: 11.8, changePercent: 0.17 },
    { symbol: "D", price: 58.4, changePercent: -0.19 },
    { symbol: "FDBC", price: 44.68, changePercent: 0.51 },
    { symbol: "J", price: 140.8, changePercent: 0.98 },
    { symbol: "A", price: 119.86, changePercent: 3.15 },
    { symbol: "MAT", price: 20.07, changePercent: 0.88 },
    { symbol: "FXLG", price: 36.0, changePercent: 0.0 },
    { symbol: "WFWRX", price: 6.23, changePercent: 1.30 },
    { symbol: "AAPL", price: 212.89, changePercent: -0.70 },
    { symbol: "GE", price: 261.18, changePercent: 0.84 }
  ];

  columns: TableColumn<StockItem>[] = [
    {
      key: 'symbol',
      label: 'Symbol',
      type: 'text',
      sortable: true
    },
    {
      key: 'price',
      label: 'Price',
      type: 'currency',
      align: 'right',
      sortable: true,
      format: (value: number) => `$${value.toFixed(2)}`
    },
    {
      key: 'changePercent',
      label: 'Change %',
      type: 'custom',
      align: 'right',
      sortable: true
    }
  ];

  tableConfig: TableConfig = {
    pageSize: 5,
    pageSizeOptions: [5],
    showPagination: true,
    showFilter: false,
    emptyMessage: 'No stocks in watchlist'
  };

  onViewMarketData() {
    console.log('View Market Data clicked');
    // Implement navigation or action
  }

  onRowClick(item: StockItem) {
    console.log('Row clicked:', item);
  }

  onSort(event: any) {
    console.log('Sort event:', event);
  }

  onPageChange(event: any) {
    console.log('Page change:', event);
  }

  onFilter(event: any) {
    console.log('Filter event:', event);
  }
}