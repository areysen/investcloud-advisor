import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import type { CmsDocument } from '../../shared/components/documents-slider-widget/documents-slider-widget';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  private mockDocuments: CmsDocument[] = [
    {
      id: '1',
      title: 'Q4 2024 Market Outlook: Navigating Volatility',
      description: 'Our comprehensive analysis of market trends and investment opportunities for the final quarter of 2024, including sector-specific recommendations.',
      type: 'article',
      thumbnailUrl: 'assets/images/whats-new.png',
      url: '/articles/q4-2024-market-outlook',
      publishDate: new Date('2024-10-15'),
      author: 'Research Team',
      tags: ['Market Research', 'Q4 2024', 'Investment Strategy'],
      readTime: '8 min read',
      viewCount: 33
    },
    {
      id: '2',
      title: 'Portfolio Performance Report - September 2024',
      description: 'Detailed breakdown of portfolio performance metrics, asset allocation, and comparative benchmarks for the month of September.',
      type: 'file',
      fileType: 'pdf',
      fileSize: '2.4 MB',
      url: '/downloads/portfolio-report-sep-2024.pdf',
      publishDate: new Date('2024-10-01'),
      tags: ['Performance', 'Monthly Report'],
      downloadCount: 142
    },
    {
      id: '3',
      title: 'Federal Reserve Economic Data',
      description: 'Access real-time economic data, statistics, and analysis from the Federal Reserve Economic Database (FRED).',
      type: 'external',
      url: 'https://fred.stlouisfed.org/',
      publishDate: new Date('2024-10-20'),
      tags: ['Economic Data', 'External Resource']
    },
    {
      id: '4',
      title: 'Understanding Alternative Investments',
      description: 'A beginner\'s guide to alternative investment strategies including private equity, hedge funds, and real estate investment trusts.',
      type: 'article',
      thumbnailUrl: 'assets/images/upcoming-event.png',
      url: '/articles/alternative-investments-guide',
      publishDate: new Date('2024-09-28'),
      author: 'Education Team',
      tags: ['Education', 'Alternative Investments', 'Guide'],
      readTime: '12 min read',
      viewCount: 30
    },
    {
      id: '5',
      title: 'Tax Planning Strategies for 2025',
      description: 'Essential tax planning strategies and considerations for high-net-worth individuals as we approach the new tax year.',
      type: 'file',
      fileType: 'pdf',
      fileSize: '1.8 MB',
      url: '/downloads/tax-planning-2025.pdf',
      publishDate: new Date('2024-10-18'),
      tags: ['Tax Planning', 'Guide', '2025'],
      downloadCount: 89
    },
    {
      id: '6',
      title: 'ESG Investment Opportunities',
      description: 'Explore sustainable and socially responsible investment opportunities that align with environmental, social, and governance principles.',
      type: 'article',
      url: '/articles/esg-investment-opportunities',
      publishDate: new Date('2024-10-10'),
      author: 'ESG Research Team',
      tags: ['ESG', 'Sustainable Investing', 'Market Research'],
      readTime: '10 min read',
      viewCount: 24
    },
    {
      id: '7',
      title: 'Client Onboarding Forms',
      description: 'Complete set of forms required for new client onboarding including KYC documentation and investment policy statements.',
      type: 'file',
      fileType: 'zip',
      fileSize: '5.2 MB',
      url: '/downloads/client-onboarding-forms.zip',
      publishDate: new Date('2024-10-05'),
      tags: ['Forms', 'Onboarding', 'Compliance'],
      downloadCount: 67
    },
    {
      id: '8',
      title: 'Bloomberg Terminal Access',
      description: 'Direct access to Bloomberg Terminal for real-time market data, news, and analytics. Requires authentication.',
      type: 'external',
      url: 'https://terminal.bloomberg.com/',
      publishDate: new Date('2024-10-22'),
      tags: ['Market Data', 'Bloomberg', 'External']
    },
    {
      id: '9',
      title: 'Retirement Planning Calculator',
      description: 'Interactive tool to help clients plan for retirement by calculating savings needs, withdrawal rates, and income projections.',
      type: 'external',
      url: 'https://investcloud.com/tools/retirement-calculator',
      publishDate: new Date('2024-10-12'),
      tags: ['Tools', 'Retirement', 'Calculator']
    },
    {
      id: '10',
      title: 'Japan\'s Hokkaido to get advanced chipmaking',
      description: 'Japanese chip foundry venture Rapidus Corp said it will build a plant in Chitose City on Japan.',
      type: 'article',
      thumbnailUrl: 'assets/images/whats-new.png',
      url: '/articles/japan-hokkaido-chipmaking',
      publishDate: new Date('2022-01-01'),
      author: 'News Team',
      tags: ['Trending News', 'Technology', 'Japan'],
      readTime: '5 min read',
      viewCount: 33
    },
    {
      id: '11',
      title: 'Adidas has $742 million worth of Kanye West sneakers and no...',
      description: 'Sell them as \'Zombie Yeezeys\' or just destroy them. Adidas is facing an expensive predicament.',
      type: 'article',
      thumbnailUrl: 'assets/images/upcoming-event.png',
      url: '/articles/adidas-kanye-west-sneakers',
      publishDate: new Date('2022-01-01'),
      author: 'Business Team',
      tags: ['Trending News', 'Business', 'Retail'],
      readTime: '6 min read',
      viewCount: 30
    },
    {
      id: '12',
      title: 'Albemarle Stock Is a \'Signature Pick\' and a Bet on Lithium',
      description: 'Wells Fargo analyst Michael Sison says the stock is worth $350 a share, up about 35%.',
      type: 'article',
      url: '/articles/albemarle-stock-lithium',
      publishDate: new Date('2022-01-01'),
      author: 'Market Analysis Team',
      tags: ['Market Research', 'Stocks', 'Commodities'],
      readTime: '7 min read',
      viewCount: 24
    },
    {
      id: '13',
      title: 'Shares of new emphysema rally',
      description: 'In two days, the three major indices have risen between 5.5%.',
      type: 'article',
      url: '/articles/shares-emphysema-rally',
      publishDate: new Date('2022-01-01'),
      author: 'Markets Team',
      tags: ['Market Research', 'Healthcare', 'Stocks'],
      readTime: '4 min read',
      viewCount: 20
    },
    {
      id: '14',
      title: 'Best Practices for Portfolio Diversification',
      description: 'Learn the key strategies for building a well-diversified investment portfolio that can weather market volatility.',
      type: 'article',
      url: '/articles/portfolio-diversification-best-practices',
      publishDate: new Date('2024-10-08'),
      author: 'Investment Strategy Team',
      tags: ['Best Practices', 'Portfolio Management', 'Risk Management'],
      readTime: '15 min read',
      viewCount: 45
    },
    {
      id: '15',
      title: 'Digital Transformation in Wealth Management',
      description: 'A comprehensive white paper on how digital technologies are reshaping the wealth management industry.',
      type: 'file',
      fileType: 'pdf',
      fileSize: '3.2 MB',
      url: '/downloads/digital-transformation-whitepaper.pdf',
      publishDate: new Date('2024-09-20'),
      tags: ['White Papers', 'Digital Transformation', 'Technology'],
      downloadCount: 215
    },
    {
      id: '16',
      title: 'Internal Market Commentary - October 2024',
      description: 'Our investment committee\'s monthly commentary on market conditions and positioning.',
      type: 'article',
      url: '/articles/internal-commentary-october-2024',
      publishDate: new Date('2024-10-01'),
      author: 'Investment Committee',
      tags: ['Commentary', 'Internal Commentary', 'Market Analysis'],
      readTime: '10 min read',
      viewCount: 18
    }
  ];

  getDocuments(): Observable<CmsDocument[]> {
    // Simulate API call with delay
    return of(this.mockDocuments).pipe(delay(500));
  }

  getDocumentsByType(type: CmsDocument['type']): Observable<CmsDocument[]> {
    const filtered = this.mockDocuments.filter(doc => doc.type === type);
    return of(filtered).pipe(delay(300));
  }

  getDocumentsByTags(tags: string[]): Observable<CmsDocument[]> {
    const filtered = this.mockDocuments.filter(doc => 
      doc.tags?.some(tag => tags.includes(tag))
    );
    return of(filtered).pipe(delay(300));
  }

  getRecentDocuments(limit: number = 6): Observable<CmsDocument[]> {
    const sorted = [...this.mockDocuments]
      .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime())
      .slice(0, limit);
    return of(sorted).pipe(delay(300));
  }

  searchDocuments(query: string): Observable<CmsDocument[]> {
    const lowercaseQuery = query.toLowerCase();
    const filtered = this.mockDocuments.filter(doc =>
      doc.title.toLowerCase().includes(lowercaseQuery) ||
      doc.description.toLowerCase().includes(lowercaseQuery) ||
      doc.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
    return of(filtered).pipe(delay(400));
  }

  getDocumentsByCategory(category: string): Observable<CmsDocument[]> {
    // For demo purposes, filter by tags that match the category
    const filtered = this.mockDocuments.filter(doc => 
      doc.tags?.some(tag => tag.toLowerCase().includes(category.toLowerCase())) ||
      doc.type === 'article' && category.toLowerCase().includes('research') ||
      doc.type === 'article' && category.toLowerCase().includes('news') ||
      doc.type === 'article' && category.toLowerCase().includes('commentary') ||
      doc.type === 'file' && category.toLowerCase().includes('white paper') ||
      doc.tags?.includes('Education') && category.toLowerCase().includes('education') ||
      doc.tags?.includes('Best Practices') && category.toLowerCase().includes('best practices')
    );
    return of(filtered).pipe(delay(300));
  }
}