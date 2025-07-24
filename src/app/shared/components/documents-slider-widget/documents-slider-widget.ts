import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { HlmButtonDirective } from '../../ui/ui-button-helm/src/lib/hlm-button.directive';
import { HlmBadgeDirective } from '../../ui/ui-badge-helm/src/lib/hlm-badge.directive';
import { 
  HlmCarouselComponent,
  HlmCarouselContentComponent,
  HlmCarouselItemComponent,
  HlmCarouselNextComponent,
  HlmCarouselPreviousComponent,
  HlmCarouselSlideDisplayComponent
} from '../../ui/ui-carousel-helm/src/index';
import { CmsService } from '../../../core/services/cms.service';
import type { EmblaOptionsType } from 'embla-carousel';

export interface CmsDocument {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'file' | 'external';
  thumbnailUrl?: string;
  fallbackImage?: string;
  url: string;
  fileSize?: string;
  fileType?: string;
  publishDate: Date;
  author?: string;
  tags?: string[];
  downloadCount?: number;
  readTime?: string;
  viewCount?: number;
}

@Component({
  selector: 'app-documents-slider-widget',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIconComponent,
    HlmButtonDirective,
    HlmBadgeDirective,
    HlmCarouselComponent,
    HlmCarouselContentComponent,
    HlmCarouselItemComponent,
    HlmCarouselNextComponent,
    HlmCarouselPreviousComponent,
    HlmCarouselSlideDisplayComponent
  ],
  templateUrl: './documents-slider-widget.html',
  styleUrl: './documents-slider-widget.scss'
})
export class DocumentsSliderWidgetComponent implements OnInit {
  @Input() documents: CmsDocument[] = [];
  @Input() title = '';
  @Input() showViewAll = false;
  @Input() loading = false;
  @Input() error: string | null = null;
  @Input() slidesPerView = 3;
  @Output() documentClick = new EventEmitter<CmsDocument>();

  private cmsService = inject(CmsService);

  carouselOptions: EmblaOptionsType = {
    align: 'start',
    loop: false,
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    skipSnaps: false
  };

  ngOnInit() {
    if (this.documents.length === 0 && !this.loading) {
      this.loadDocuments();
    }
  }

  loadDocuments() {
    this.loading = true;
    this.cmsService.getDocuments().subscribe({
      next: (docs: CmsDocument[]) => {
        this.documents = docs;
        this.loading = false;
      },
      error: (_err: any) => {
        this.error = 'Failed to load documents';
        this.loading = false;
      }
    });
  }

  onDocumentClick(document: CmsDocument) {
    this.documentClick.emit(document);
    
    switch (document.type) {
      case 'article':
        // Navigate to article viewer
        console.log('Opening article:', document.id);
        break;
      case 'file':
        // Download file
        this.downloadFile(document);
        break;
      case 'external':
        // Open in new tab
        window.open(document.url, '_blank', 'noopener,noreferrer');
        break;
    }
  }

  private downloadFile(doc: CmsDocument) {
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.title + (doc.fileType ? `.${doc.fileType}` : '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  getDocumentIcon(type: CmsDocument['type']): string {
    switch (type) {
      case 'article':
        return 'lucideFileText';
      case 'file':
        return 'lucideFile';
      case 'external':
        return 'lucideExternalLink';
      default:
        return 'lucideFile';
    }
  }

  getThumbnailUrl(document: CmsDocument): string {
    if (document.thumbnailUrl) {
      return document.thumbnailUrl;
    }
    
    // Use fallback images based on type
    switch (document.type) {
      case 'article':
        return document.fallbackImage || 'assets/images/cms/article-default.svg';
      case 'file':
        return document.fallbackImage || 'assets/images/cms/document-default.svg';
      case 'external':
        return document.fallbackImage || 'assets/images/cms/link-default.svg';
      default:
        return 'assets/images/cms/document-default.svg';
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  }

  trackByDocumentId(_index: number, document: CmsDocument): string {
    return document.id;
  }
}