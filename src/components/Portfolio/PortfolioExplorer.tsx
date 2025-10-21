import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, Heart, Eye, Download } from 'lucide-react';
import { PortfolioItem, PortfolioFilter } from '../../types';

const PortfolioExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Mock portfolio data
  const portfolioItems: PortfolioItem[] = [
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

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'portrait', label: 'Portrait' },
    { value: 'documentary', label: 'Documentary' },
    { value: 'movement', label: 'Movement' },
    { value: 'motion', label: 'Motion' }
  ];

  const filteredItems = useMemo(() => {
    return portfolioItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, portfolioItems]);

  const handleItemClick = (item: PortfolioItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Portfolio Explorer</h1>
        <p className="text-lg text-gray-600">
          Discover our photography collection with AI-powered insights
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search portfolio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 input-field"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between py-4">
        <p className="text-sm text-gray-600">
          Showing {filteredItems.length} of {portfolioItems.length} items
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>AI-Powered Search</span>
          <span>•</span>
          <span>Smart Recommendations</span>
        </div>
      </div>

      {/* Portfolio Grid/List */}
      <div className={viewMode === 'grid' ? 'portfolio-grid' : 'space-y-4'}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`portfolio-item cursor-pointer group ${viewMode === 'list' ? 'flex items-center space-x-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200' : ''}`}
            onClick={() => handleItemClick(item)}
          >
            {viewMode === 'grid' ? (
              <>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                  <div className="p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span className="text-xs">View</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  <div className="flex items-center space-x-3 mt-3">
                    <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-3 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-3 text-gray-400 hover:text-primary-500 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedItem.title}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">{selectedItem.description}</p>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedItem.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-2 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {selectedItem.metadata && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Photo Details</h3>
                      <div className="space-y-2 text-sm">
                        {selectedItem.metadata.location && (
                          <p><span className="font-medium">Location:</span> {selectedItem.metadata.location}</p>
                        )}
                        {selectedItem.metadata.date && (
                          <p><span className="font-medium">Date:</span> {selectedItem.metadata.date.toLocaleDateString()}</p>
                        )}
                        {selectedItem.metadata.settings && (
                          <div>
                            <p><span className="font-medium">Settings:</span></p>
                            <ul className="ml-4 space-y-1">
                              {selectedItem.metadata.settings.aperture && (
                                <li>Aperture: {selectedItem.metadata.settings.aperture}</li>
                              )}
                              {selectedItem.metadata.settings.shutterSpeed && (
                                <li>Shutter Speed: {selectedItem.metadata.settings.shutterSpeed}</li>
                              )}
                              {selectedItem.metadata.settings.iso && (
                                <li>ISO: {selectedItem.metadata.settings.iso}</li>
                              )}
                              {selectedItem.metadata.settings.focalLength && (
                                <li>Focal Length: {selectedItem.metadata.settings.focalLength}</li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {selectedItem.aiAnalysis && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Mood:</span> {selectedItem.aiAnalysis.mood}</p>
                        <p><span className="font-medium">Style:</span> {selectedItem.aiAnalysis.style}</p>
                        <p><span className="font-medium">Composition:</span> {selectedItem.aiAnalysis.composition}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-4 pt-6">
                    <button className="btn-primary px-6 py-3">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                    <button className="btn-secondary px-6 py-3">
                      <Heart className="w-4 h-4 mr-2" />
                      Add to Favorites
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioExplorer;
