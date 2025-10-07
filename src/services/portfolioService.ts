import { PortfolioItem, PortfolioFilter } from '../types';

export class PortfolioService {
  private static instance: PortfolioService;
  private portfolioItems: PortfolioItem[] = [];

  private constructor() {
    this.initializePortfolio();
  }

  public static getInstance(): PortfolioService {
    if (!PortfolioService.instance) {
      PortfolioService.instance = new PortfolioService();
    }
    return PortfolioService.instance;
  }

  private initializePortfolio(): void {
    // Mock portfolio data - replace with actual API calls
    this.portfolioItems = [
      {
        id: '1',
        title: 'Urban Portrait Series',
        description: 'A collection of urban portraits capturing the essence of city life',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop',
        category: 'portrait',
        tags: ['urban', 'portrait', 'black-white', 'street'],
        metadata: {
          location: 'New York City',
          date: new Date('2024-01-15'),
          equipment: ['Canon EOS R5', '85mm f/1.4'],
          settings: {
            aperture: 'f/2.8',
            shutterSpeed: '1/125s',
            iso: 400,
            focalLength: '85mm'
          }
        },
        aiAnalysis: {
          dominantColors: ['#2c3e50', '#ecf0f1', '#e74c3c'],
          mood: 'contemplative',
          style: 'documentary',
          composition: 'rule-of-thirds',
          similarItems: ['2', '3']
        }
      },
      {
        id: '2',
        title: 'Wedding Day Moments',
        description: 'Intimate moments from a beautiful wedding celebration',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=400&fit=crop',
        category: 'documentary',
        tags: ['wedding', 'love', 'celebration', 'emotion'],
        metadata: {
          location: 'Tuscany, Italy',
          date: new Date('2024-02-20'),
          equipment: ['Sony A7R IV', '24-70mm f/2.8'],
          settings: {
            aperture: 'f/2.8',
            shutterSpeed: '1/250s',
            iso: 200,
            focalLength: '50mm'
          }
        },
        aiAnalysis: {
          dominantColors: ['#f8f9fa', '#e9ecef', '#6c757d'],
          mood: 'joyful',
          style: 'documentary',
          composition: 'center-focus',
          similarItems: ['1', '4']
        }
      },
      {
        id: '3',
        title: 'Dance in Motion',
        description: 'Capturing the fluidity and grace of contemporary dance',
        imageUrl: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=500&h=400&fit=crop',
        category: 'movement',
        tags: ['dance', 'motion', 'art', 'performance'],
        metadata: {
          location: 'Studio',
          date: new Date('2024-03-10'),
          equipment: ['Nikon D850', '70-200mm f/2.8'],
          settings: {
            aperture: 'f/4',
            shutterSpeed: '1/500s',
            iso: 800,
            focalLength: '135mm'
          }
        },
        aiAnalysis: {
          dominantColors: ['#1a1a1a', '#ffffff', '#ff6b6b'],
          mood: 'dynamic',
          style: 'artistic',
          composition: 'leading-lines',
          similarItems: ['5', '6']
        }
      },
      {
        id: '4',
        title: 'Street Life Documentary',
        description: 'Everyday moments in the urban landscape',
        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=400&fit=crop',
        category: 'documentary',
        tags: ['street', 'urban', 'life', 'documentary'],
        metadata: {
          location: 'Tokyo, Japan',
          date: new Date('2024-03-25'),
          equipment: ['Fujifilm X-T4', '35mm f/1.4'],
          settings: {
            aperture: 'f/5.6',
            shutterSpeed: '1/60s',
            iso: 1600,
            focalLength: '35mm'
          }
        },
        aiAnalysis: {
          dominantColors: ['#2c3e50', '#95a5a6', '#e74c3c'],
          mood: 'authentic',
          style: 'documentary',
          composition: 'street-photography',
          similarItems: ['1', '2']
        }
      },
      {
        id: '5',
        title: 'Fashion Editorial',
        description: 'High-fashion editorial shoot with dramatic lighting',
        imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=400&fit=crop',
        category: 'portrait',
        tags: ['fashion', 'editorial', 'portrait', 'studio'],
        metadata: {
          location: 'Studio',
          date: new Date('2024-04-05'),
          equipment: ['Canon EOS R5', '85mm f/1.2'],
          settings: {
            aperture: 'f/8',
            shutterSpeed: '1/125s',
            iso: 100,
            focalLength: '85mm'
          }
        },
        aiAnalysis: {
          dominantColors: ['#000000', '#ffffff', '#ffd700'],
          mood: 'dramatic',
          style: 'editorial',
          composition: 'studio-portrait',
          similarItems: ['1', '6']
        }
      },
      {
        id: '6',
        title: 'Nature in Motion',
        description: 'Capturing the movement of natural elements',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        category: 'motion',
        tags: ['nature', 'motion', 'landscape', 'water'],
        metadata: {
          location: 'Pacific Coast',
          date: new Date('2024-04-18'),
          equipment: ['Sony A7R IV', '16-35mm f/2.8'],
          settings: {
            aperture: 'f/11',
            shutterSpeed: '1/4s',
            iso: 100,
            focalLength: '24mm'
          }
        },
        aiAnalysis: {
          dominantColors: ['#0066cc', '#ffffff', '#87ceeb'],
          mood: 'serene',
          style: 'landscape',
          composition: 'long-exposure',
          similarItems: ['3', '5']
        }
      }
    ];
  }

  async getPortfolioItems(filter?: PortfolioFilter): Promise<PortfolioItem[]> {
    try {
      let filteredItems = [...this.portfolioItems];

      if (filter) {
        if (filter.category) {
          filteredItems = filteredItems.filter(item => item.category === filter.category);
        }

        if (filter.tags && filter.tags.length > 0) {
          filteredItems = filteredItems.filter(item =>
            filter.tags!.some(tag => item.tags.includes(tag))
          );
        }

        if (filter.dateRange) {
          filteredItems = filteredItems.filter(item => {
            if (!item.metadata.date) return false;
            return item.metadata.date >= filter.dateRange!.start &&
                   item.metadata.date <= filter.dateRange!.end;
          });
        }

        if (filter.mood) {
          filteredItems = filteredItems.filter(item =>
            item.aiAnalysis?.mood === filter.mood
          );
        }

        if (filter.style) {
          filteredItems = filteredItems.filter(item =>
            item.aiAnalysis?.style === filter.style
          );
        }
      }

      return filteredItems;
    } catch (error) {
      console.error('Portfolio Service Error:', error);
      throw new Error('Failed to fetch portfolio items');
    }
  }

  async getPortfolioItem(id: string): Promise<PortfolioItem | null> {
    try {
      const item = this.portfolioItems.find(item => item.id === id);
      return item || null;
    } catch (error) {
      console.error('Portfolio Service Error:', error);
      throw new Error('Failed to fetch portfolio item');
    }
  }

  async searchPortfolio(query: string): Promise<PortfolioItem[]> {
    try {
      const searchTerm = query.toLowerCase();
      return this.portfolioItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      console.error('Portfolio Service Error:', error);
      throw new Error('Failed to search portfolio');
    }
  }

  async getSimilarItems(itemId: string): Promise<PortfolioItem[]> {
    try {
      const item = await this.getPortfolioItem(itemId);
      if (!item || !item.aiAnalysis?.similarItems) {
        return [];
      }

      const similarItems = await Promise.all(
        item.aiAnalysis.similarItems.map(id => this.getPortfolioItem(id))
      );

      return similarItems.filter(item => item !== null) as PortfolioItem[];
    } catch (error) {
      console.error('Portfolio Service Error:', error);
      throw new Error('Failed to fetch similar items');
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const categories = [...new Set(this.portfolioItems.map(item => item.category))];
      return categories;
    } catch (error) {
      console.error('Portfolio Service Error:', error);
      throw new Error('Failed to fetch categories');
    }
  }

  async getTags(): Promise<string[]> {
    try {
      const allTags = this.portfolioItems.flatMap(item => item.tags);
      const uniqueTags = [...new Set(allTags)];
      return uniqueTags;
    } catch (error) {
      console.error('Portfolio Service Error:', error);
      throw new Error('Failed to fetch tags');
    }
  }
}

export const portfolioService = PortfolioService.getInstance();
