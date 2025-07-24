import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmCardDirective } from '../../ui/ui-card-helm/src/index';
import { HlmTabsComponent, HlmTabsListComponent, HlmTabsTriggerDirective, HlmTabsContentDirective } from '../../ui/ui-tabs-helm/src/index';
import { DocumentsSliderWidgetComponent, type CmsDocument } from '../documents-slider-widget/documents-slider-widget';
import { CmsService } from '../../../core/services/cms.service';

interface DocumentTab {
  id: string;
  label: string;
  category: string;
  documents: CmsDocument[];
  loading: boolean;
}

@Component({
  selector: 'app-tabbed-documents-widget',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,
    DocumentsSliderWidgetComponent
  ],
  templateUrl: './tabbed-documents-widget.html',
  styleUrl: './tabbed-documents-widget.scss'
})
export class TabbedDocumentsWidgetComponent implements OnInit {
  private cmsService = inject(CmsService);
  private _activeTab = 'market-research';
  
  tabs: DocumentTab[] = [
    {
      id: 'market-research',
      label: 'Market Research',
      category: 'Market Research',
      documents: [],
      loading: false
    },
    {
      id: 'trending-news',
      label: 'Trending News',
      category: 'News',
      documents: [],
      loading: false
    },
    {
      id: 'best-practices',
      label: 'Best Practices',
      category: 'Best Practices',
      documents: [],
      loading: false
    },
    {
      id: 'white-papers',
      label: 'White Papers',
      category: 'White Papers',
      documents: [],
      loading: false
    },
    {
      id: 'internal-commentary',
      label: 'Internal Commentary',
      category: 'Commentary',
      documents: [],
      loading: false
    }
  ];

  ngOnInit() {
    // Load documents for the initially active tab
    this.loadTabDocuments(this.activeTab);
  }

  set activeTab(tabId: string) {
    this._activeTab = tabId;
    const tab = this.tabs.find(t => t.id === tabId);
    
    // Load documents for tab if not already loaded
    if (tab && tab.documents.length === 0 && !tab.loading) {
      this.loadTabDocuments(tabId);
    }
  }

  get activeTab(): string {
    return this._activeTab;
  }

  private loadTabDocuments(tabId: string) {
    const tab = this.tabs.find(t => t.id === tabId);
    if (!tab) return;

    tab.loading = true;
    
    // Use the category to filter documents
    this.cmsService.getDocumentsByCategory(tab.category).subscribe({
      next: (documents) => {
        tab.documents = documents;
        tab.loading = false;
      },
      error: (_err) => {
        tab.loading = false;
        // Could show error state here
      }
    });
  }

  onDocumentClick(document: CmsDocument, tabId: string) {
    console.log(`Document clicked in ${tabId} tab:`, document);
    // Handle document click based on tab context if needed
  }
}