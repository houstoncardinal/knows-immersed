import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Plus,
  Image,
  Palette,
  Upload,
  Download,
  Search,
  Grid3X3,
  List,
  Eye,
  Edit3,
  Trash2,
  Copy,
  Heart,
  Star,
  Tag,
  Filter,
  Camera,
  Video,
  Music,
  Lightbulb,
} from "lucide-react";
import { toast } from "sonner";

interface MoodBoardItem {
  id: string;
  type: 'image' | 'video' | 'color' | 'text' | 'audio';
  title: string;
  description: string;
  url?: string;
  color?: string;
  tags: string[];
  category: string;
  favorite: boolean;
  createdAt: Date;
}

interface MoodBoard {
  id: string;
  name: string;
  description: string;
  items: MoodBoardItem[];
  createdAt: Date;
  updatedAt: Date;
}

const categories = [
  'Colors',
  'Textures',
  'Lighting',
  'Composition',
  'Style',
  'Mood',
  'Props',
  'Locations',
  'Costumes',
  'Music',
  'Sound',
  'Effects'
];

const sampleItems: MoodBoardItem[] = [
  {
    id: '1',
    type: 'color',
    title: 'Cinematic Blue',
    description: 'Deep ocean blue for dramatic scenes',
    color: '#1e3a8a',
    tags: ['blue', 'dramatic', 'cinematic'],
    category: 'Colors',
    favorite: true,
    createdAt: new Date()
  },
  {
    id: '2',
    type: 'color',
    title: 'Golden Hour',
    description: 'Warm golden tones for sunset scenes',
    color: '#f59e0b',
    tags: ['gold', 'warm', 'sunset'],
    category: 'Colors',
    favorite: false,
    createdAt: new Date()
  },
  {
    id: '3',
    type: 'text',
    title: 'Film Noir Inspiration',
    description: 'Dark, mysterious atmosphere with high contrast',
    tags: ['noir', 'contrast', 'mystery'],
    category: 'Style',
    favorite: true,
    createdAt: new Date()
  }
];

export const Moodboard = () => {
  const [moodBoards, setMoodBoards] = useState<MoodBoard[]>([
    {
      id: '1',
      name: 'Summer Commercial',
      description: 'Bright, energetic mood for summer product campaign',
      items: sampleItems,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  const [selectedBoard, setSelectedBoard] = useState<MoodBoard>(moodBoards[0]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MoodBoardItem>>({
    type: 'color',
    title: '',
    description: '',
    tags: [],
    category: 'Colors',
    favorite: false
  });

  const filteredItems = selectedBoard.items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchTerm === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const addItem = () => {
    if (!newItem.title || !newItem.description) {
      toast.error("Please fill in title and description");
      return;
    }

    const item: MoodBoardItem = {
      id: Date.now().toString(),
      type: newItem.type as MoodBoardItem['type'] || 'color',
      title: newItem.title,
      description: newItem.description,
      url: newItem.url,
      color: newItem.color,
      tags: newItem.tags || [],
      category: newItem.category || 'Colors',
      favorite: newItem.favorite || false,
      createdAt: new Date()
    };

    const updatedBoard = {
      ...selectedBoard,
      items: [...selectedBoard.items, item],
      updatedAt: new Date()
    };

    setMoodBoards(moodBoards.map(board =>
      board.id === selectedBoard.id ? updatedBoard : board
    ));
    setSelectedBoard(updatedBoard);
    setNewItem({
      type: 'color',
      title: '',
      description: '',
      tags: [],
      category: 'Colors',
      favorite: false
    });
    setIsAddingItem(false);
    toast.success("Item added to mood board");
  };

  const toggleFavorite = (itemId: string) => {
    const updatedBoard = {
      ...selectedBoard,
      items: selectedBoard.items.map(item =>
        item.id === itemId ? { ...item, favorite: !item.favorite } : item
      ),
      updatedAt: new Date()
    };

    setMoodBoards(moodBoards.map(board =>
      board.id === selectedBoard.id ? updatedBoard : board
    ));
    setSelectedBoard(updatedBoard);
  };

  const deleteItem = (itemId: string) => {
    const updatedBoard = {
      ...selectedBoard,
      items: selectedBoard.items.filter(item => item.id !== itemId),
      updatedAt: new Date()
    };

    setMoodBoards(moodBoards.map(board =>
      board.id === selectedBoard.id ? updatedBoard : board
    ));
    setSelectedBoard(updatedBoard);
    toast.success("Item removed from mood board");
  };

  const renderItem = (item: MoodBoardItem) => {
    const getItemIcon = () => {
      switch (item.type) {
        case 'image': return <Image className="w-6 h-6" />;
        case 'video': return <Video className="w-6 h-6" />;
        case 'audio': return <Music className="w-6 h-6" />;
        case 'color': return <Palette className="w-6 h-6" />;
        case 'text': return <Lightbulb className="w-6 h-6" />;
        default: return <Image className="w-6 h-6" />;
      }
    };

    const getItemContent = () => {
      switch (item.type) {
        case 'color':
          return (
            <div
              className="w-full h-32 rounded-lg border-4 border-white shadow-lg"
              style={{ backgroundColor: item.color }}
            />
          );
        case 'image':
          return (
            <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
              <Image className="w-12 h-12 text-muted-foreground" />
            </div>
          );
        case 'text':
          return (
            <div className="w-full h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-12 h-12 text-primary" />
            </div>
          );
        default:
          return (
            <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
              {getItemIcon()}
            </div>
          );
      }
    };

    return (
      <Card key={item.id} className="group relative overflow-hidden hover:shadow-lg transition-all duration-200">
        <div className="p-4">
          {getItemContent()}
          <div className="mt-3 space-y-2">
            <div className="flex items-start justify-between">
              <h4 className="font-semibold text-sm line-clamp-1">{item.title}</h4>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => toggleFavorite(item.id)}
                className="ml-2 p-1 h-auto"
              >
                <Heart className={`w-4 h-4 ${item.favorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">{item.category}</Badge>
              <div className="flex items-center gap-1">
                {item.tags.slice(0, 2).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 2 && (
                  <span className="text-xs text-muted-foreground">+{item.tags.length - 2}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hover Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <Button size="sm" variant="secondary" onClick={() => deleteItem(item.id)} className="p-1 h-6 w-6">
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient-neon">Mood Board</h1>
          <p className="text-muted-foreground">Visual inspiration and creative direction</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Mood Board Selector */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Current Board: {selectedBoard.name}</h3>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Board
          </Button>
        </div>
        <p className="text-muted-foreground text-sm">{selectedBoard.description}</p>
      </Card>

      <Tabs defaultValue="inspiration" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inspiration">Inspiration</TabsTrigger>
          <TabsTrigger value="palette">Color Palette</TabsTrigger>
          <TabsTrigger value="references">References</TabsTrigger>
        </TabsList>

        <TabsContent value="inspiration" className="space-y-6">
          {/* Filters and Search */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search inspiration..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  className="px-3 py-2 border border-border rounded-md bg-background text-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <Button onClick={() => setIsAddingItem(true)} className="bg-gradient-to-r from-neon-cyan to-neon-pink">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>
          </Card>

          {/* Items Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Inspiration Items ({filteredItems.length})</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="w-4 h-4 text-red-500" />
                {filteredItems.filter(item => item.favorite).length} favorites
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredItems.map(renderItem)}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 flex-shrink-0">
                        {item.type === 'color' ? (
                          <div
                            className="w-full h-full rounded-lg border-2 border-white shadow-lg"
                            style={{ backgroundColor: item.color }}
                          />
                        ) : (
                          <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                            {item.type === 'image' && <Image className="w-6 h-6 text-muted-foreground" />}
                            {item.type === 'video' && <Video className="w-6 h-6 text-muted-foreground" />}
                            {item.type === 'text' && <Lightbulb className="w-6 h-6 text-muted-foreground" />}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{item.title}</h4>
                          <Badge variant="outline" className="text-xs">{item.category}</Badge>
                          {item.favorite && <Heart className="w-4 h-4 fill-red-500 text-red-500" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        <div className="flex items-center gap-2">
                          {item.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => toggleFavorite(item.id)}>
                          <Heart className={`w-4 h-4 ${item.favorite ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => deleteItem(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="palette" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Color Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredItems
                .filter(item => item.type === 'color')
                .map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div
                      className="w-full aspect-square rounded-lg border-4 border-white shadow-lg cursor-pointer hover:scale-105 transition-transform"
                      style={{ backgroundColor: item.color }}
                      onClick={() => navigator.clipboard.writeText(item.color || '')}
                    />
                    <div className="text-center">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground font-mono">{item.color}</p>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="references" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Reference Materials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems
                .filter(item => item.type !== 'color')
                .map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-16 h-16 flex-shrink-0 bg-muted rounded-lg flex items-center justify-center">
                      {item.type === 'image' && <Image className="w-8 h-8 text-muted-foreground" />}
                      {item.type === 'video' && <Video className="w-8 h-8 text-muted-foreground" />}
                      {item.type === 'text' && <Lightbulb className="w-8 h-8 text-muted-foreground" />}
                      {item.type === 'audio' && <Music className="w-8 h-8 text-muted-foreground" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{item.category}</Badge>
                        {item.favorite && <Heart className="w-4 h-4 fill-red-500 text-red-500" />}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Item Modal */}
      {isAddingItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Add Inspiration Item</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Type</label>
                  <select
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value as MoodBoardItem['type'] })}
                  >
                    <option value="color">Color</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="text">Text/Idea</option>
                    <option value="audio">Audio</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    placeholder="Item title"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {newItem.type === 'color' && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Color</label>
                    <Input
                      type="color"
                      value={newItem.color}
                      onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                      className="w-full h-12"
                    />
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Describe this inspiration..."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Tags (comma separated)</label>
                  <Input
                    value={newItem.tags?.join(', ')}
                    onChange={(e) => setNewItem({ ...newItem, tags: e.target.value.split(',').map(tag => tag.trim()) })}
                    placeholder="color, dramatic, cinematic"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsAddingItem(false)}>
                  Cancel
                </Button>
                <Button onClick={addItem} className="bg-gradient-to-r from-neon-cyan to-neon-pink">
                  Add Item
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
      </div>
    </AdminLayout>
  );
};
