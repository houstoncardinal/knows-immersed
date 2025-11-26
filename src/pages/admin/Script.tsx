import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Plus,
  FileText,
  Upload,
  Download,
  Search,
  Users,
  Clock,
  MapPin,
  Camera,
  Mic,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Eye,
  Edit3,
  Trash2,
  Copy,
  BarChart3,
  Calendar,
  Target,
} from "lucide-react";
import { toast } from "sonner";

interface Scene {
  id: string;
  number: number;
  title: string;
  description: string;
  location: string;
  timeOfDay: string;
  characters: string[];
  props: string[];
  notes: string;
  duration: number;
  status: 'planned' | 'filmed' | 'reviewed' | 'approved';
  pageCount: number;
}

interface Character {
  id: string;
  name: string;
  description: string;
  appearance: string;
  personality: string;
  relationships: string[];
}

interface ScriptAnalysis {
  totalScenes: number;
  totalPages: number;
  totalCharacters: number;
  estimatedDuration: number;
  locationCount: number;
  complexity: 'low' | 'medium' | 'high';
  shootingDays: number;
}

const timeOfDayOptions = [
  'Dawn',
  'Morning',
  'Day',
  'Afternoon',
  'Evening',
  'Dusk',
  'Night',
  'Interior',
  'Exterior'
];

const sampleScenes: Scene[] = [
  {
    id: '1',
    number: 1,
    title: 'Opening Scene',
    description: 'Establishing shot of the studio exterior',
    location: 'EXT. KNOWS STUDIOS - DAY',
    timeOfDay: 'Day',
    characters: ['Director', 'Assistant'],
    props: ['Camera', 'Lighting Equipment'],
    notes: 'Wide establishing shot to show the studio environment',
    duration: 30,
    status: 'planned',
    pageCount: 1
  },
  {
    id: '2',
    number: 2,
    title: 'Director Introduction',
    description: 'Director explains the project vision',
    location: 'INT. STUDIO OFFICE - DAY',
    timeOfDay: 'Day',
    characters: ['Director', 'Client'],
    props: ['Coffee', 'Storyboard'],
    notes: 'Medium shots alternating between director and client',
    duration: 120,
    status: 'planned',
    pageCount: 2
  }
];

const sampleCharacters: Character[] = [
  {
    id: '1',
    name: 'Director',
    description: 'Lead director of the project',
    appearance: 'Professional attire, glasses',
    personality: 'Passionate, detail-oriented',
    relationships: ['Assistant: Mentor', 'Client: Collaborator']
  },
  {
    id: '2',
    name: 'Client',
    description: 'Brand representative for the commercial',
    appearance: 'Business casual',
    personality: 'Enthusiastic, results-driven',
    relationships: ['Director: Partner']
  }
];

export const Script = () => {
  const [scenes, setScenes] = useState<Scene[]>(sampleScenes);
  const [characters, setCharacters] = useState<Character[]>(sampleCharacters);
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [isEditingScene, setIsEditingScene] = useState(false);
  const [isAddingCharacter, setIsAddingCharacter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPlayback, setCurrentPlayback] = useState<number | null>(null);

  const [newScene, setNewScene] = useState<Partial<Scene>>({
    title: '',
    description: '',
    location: '',
    timeOfDay: 'Day',
    characters: [],
    props: [],
    notes: '',
    duration: 30,
    status: 'planned',
    pageCount: 1
  });

  const [newCharacter, setNewCharacter] = useState<Partial<Character>>({
    name: '',
    description: '',
    appearance: '',
    personality: '',
    relationships: []
  });

  const analysis: ScriptAnalysis = {
    totalScenes: scenes.length,
    totalPages: scenes.reduce((sum, scene) => sum + scene.pageCount, 0),
    totalCharacters: characters.length,
    estimatedDuration: scenes.reduce((sum, scene) => sum + scene.duration, 0),
    locationCount: new Set(scenes.map(scene => scene.location)).size,
    complexity: scenes.length > 20 ? 'high' : scenes.length > 10 ? 'medium' : 'low',
    shootingDays: Math.ceil(scenes.reduce((sum, scene) => sum + scene.duration, 0) / (8 * 60)) // 8 hours per day
  };

  const addScene = () => {
    if (!newScene.title || !newScene.description || !newScene.location) {
      toast.error("Please fill in required fields");
      return;
    }

    const scene: Scene = {
      id: Date.now().toString(),
      number: scenes.length + 1,
      title: newScene.title,
      description: newScene.description,
      location: newScene.location,
      timeOfDay: newScene.timeOfDay || 'Day',
      characters: newScene.characters || [],
      props: newScene.props || [],
      notes: newScene.notes || '',
      duration: newScene.duration || 30,
      status: newScene.status as Scene['status'] || 'planned',
      pageCount: newScene.pageCount || 1
    };

    setScenes([...scenes, scene]);
    setNewScene({
      title: '',
      description: '',
      location: '',
      timeOfDay: 'Day',
      characters: [],
      props: [],
      notes: '',
      duration: 30,
      status: 'planned',
      pageCount: 1
    });
    toast.success("Scene added to script");
  };

  const addCharacter = () => {
    if (!newCharacter.name || !newCharacter.description) {
      toast.error("Please fill in required fields");
      return;
    }

    const character: Character = {
      id: Date.now().toString(),
      name: newCharacter.name,
      description: newCharacter.description,
      appearance: newCharacter.appearance || '',
      personality: newCharacter.personality || '',
      relationships: newCharacter.relationships || []
    };

    setCharacters([...characters, character]);
    setNewCharacter({
      name: '',
      description: '',
      appearance: '',
      personality: '',
      relationships: []
    });
    setIsAddingCharacter(false);
    toast.success("Character added to script");
  };

  const updateScene = (updatedScene: Scene) => {
    setScenes(scenes.map(scene => scene.id === updatedScene.id ? updatedScene : scene));
    setSelectedScene(null);
    setIsEditingScene(false);
    toast.success("Scene updated");
  };

  const deleteScene = (sceneId: string) => {
    setScenes(scenes.filter(scene => scene.id !== sceneId));
    if (selectedScene?.id === sceneId) {
      setSelectedScene(null);
    }
    toast.success("Scene deleted");
  };

  const getStatusColor = (status: Scene['status']) => {
    switch (status) {
      case 'planned': return 'bg-yellow-500';
      case 'filmed': return 'bg-blue-500';
      case 'reviewed': return 'bg-purple-500';
      case 'approved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient-neon">Script Analysis</h1>
          <p className="text-muted-foreground">Break down scripts and plan your production</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Script
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Breakdown
          </Button>
        </div>
      </div>

      {/* Script Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{analysis.totalScenes}</p>
              <p className="text-sm text-muted-foreground">Scenes</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{formatDuration(analysis.estimatedDuration)}</p>
              <p className="text-sm text-muted-foreground">Runtime</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{analysis.totalCharacters}</p>
              <p className="text-sm text-muted-foreground">Characters</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{analysis.shootingDays}</p>
              <p className="text-sm text-muted-foreground">Shooting Days</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="scenes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scenes">Scenes</TabsTrigger>
          <TabsTrigger value="characters">Characters</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="scenes" className="space-y-6">
          {/* Add Scene */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Scene
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Scene Title</label>
                <Input
                  placeholder="Opening Scene"
                  value={newScene.title}
                  onChange={(e) => setNewScene({ ...newScene, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Input
                  placeholder="INT. STUDIO - DAY"
                  value={newScene.location}
                  onChange={(e) => setNewScene({ ...newScene, location: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Time of Day</label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  value={newScene.timeOfDay}
                  onChange={(e) => setNewScene({ ...newScene, timeOfDay: e.target.value })}
                >
                  {timeOfDayOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Duration (sec)</label>
                <Input
                  type="number"
                  placeholder="30"
                  value={newScene.duration}
                  onChange={(e) => setNewScene({ ...newScene, duration: parseInt(e.target.value) || 30 })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Page Count</label>
                <Input
                  type="number"
                  placeholder="1"
                  value={newScene.pageCount}
                  onChange={(e) => setNewScene({ ...newScene, pageCount: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  placeholder="Describe what happens in this scene..."
                  value={newScene.description}
                  onChange={(e) => setNewScene({ ...newScene, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={addScene} className="bg-gradient-to-r from-neon-cyan to-neon-pink">
                <Plus className="w-4 h-4 mr-2" />
                Add Scene
              </Button>
            </div>
          </Card>

          {/* Scenes List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Script Breakdown ({scenes.length} scenes)</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                Planned
                <div className="w-3 h-3 rounded-full bg-blue-500 ml-2"></div>
                Filmed
                <div className="w-3 h-3 rounded-full bg-green-500 ml-2"></div>
                Approved
              </div>
            </div>

            <div className="space-y-3">
              {scenes.map((scene) => (
                <Card key={scene.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">{scene.number}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg">{scene.title}</h4>
                          <p className="text-sm text-muted-foreground">{scene.location} • {scene.timeOfDay}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{formatDuration(scene.duration)}</Badge>
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(scene.status)}`}></div>
                        </div>
                      </div>
                      <p className="text-sm mb-3">{scene.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {scene.characters.map(character => (
                          <Badge key={character} variant="secondary" className="text-xs">
                            <Users className="w-3 h-3 mr-1" />
                            {character}
                          </Badge>
                        ))}
                        {scene.props.map(prop => (
                          <Badge key={prop} variant="outline" className="text-xs">
                            <Target className="w-3 h-3 mr-1" />
                            {prop}
                          </Badge>
                        ))}
                      </div>
                      {scene.notes && (
                        <p className="text-xs text-muted-foreground italic">{scene.notes}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" onClick={() => { setIsEditingScene(true); setSelectedScene(scene); }}>
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => deleteScene(scene.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="characters" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Character Breakdown</h3>
            <Button onClick={() => setIsAddingCharacter(true)} className="bg-gradient-to-r from-neon-cyan to-neon-pink">
              <Plus className="w-4 h-4 mr-2" />
              Add Character
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {characters.map((character) => (
              <Card key={character.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {character.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{character.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{character.description}</p>
                    {character.appearance && (
                      <p className="text-xs mb-1"><strong>Appearance:</strong> {character.appearance}</p>
                    )}
                    {character.personality && (
                      <p className="text-xs mb-1"><strong>Personality:</strong> {character.personality}</p>
                    )}
                    {character.relationships.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium mb-1">Relationships:</p>
                        <div className="flex flex-wrap gap-1">
                          {character.relationships.map((relationship, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {relationship}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Production Timeline</h3>
            <div className="space-y-4">
              {scenes.map((scene, index) => (
                <div key={scene.id} className="flex items-center gap-4">
                  <div className="w-16 text-center">
                    <div className="text-sm font-medium">Day {Math.floor(index / 3) + 1}</div>
                    <div className="text-xs text-muted-foreground">Scene {scene.number}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className={`w-4 h-4 rounded-full ${getStatusColor(scene.status)}`}></div>
                      <div className="flex-1">
                        <h4 className="font-medium">{scene.title}</h4>
                        <p className="text-sm text-muted-foreground">{scene.location} • {formatDuration(scene.duration)}</p>
                      </div>
                      <Badge variant="outline">{scene.status}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Production Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Scenes</span>
                  <span className="font-bold">{analysis.totalScenes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Pages</span>
                  <span className="font-bold">{analysis.totalPages}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Unique Locations</span>
                  <span className="font-bold">{analysis.locationCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Complexity</span>
                  <Badge variant={analysis.complexity === 'high' ? 'destructive' : analysis.complexity === 'medium' ? 'default' : 'secondary'}>
                    {analysis.complexity}
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Shooting Schedule</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Estimated Days</span>
                  <span className="font-bold">{analysis.shootingDays}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average per Day</span>
                  <span className="font-bold">{Math.round(analysis.totalScenes / analysis.shootingDays)} scenes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Daily Runtime</span>
                  <span className="font-bold">{formatDuration(Math.round(analysis.estimatedDuration / analysis.shootingDays))}</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Scene Modal */}
      {isEditingScene && selectedScene && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Edit Scene {selectedScene.number}</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Scene Title</label>
                    <Input
                      value={selectedScene.title}
                      onChange={(e) => setSelectedScene({ ...selectedScene, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Input
                      value={selectedScene.location}
                      onChange={(e) => setSelectedScene({ ...selectedScene, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Time of Day</label>
                    <select
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      value={selectedScene.timeOfDay}
                      onChange={(e) => setSelectedScene({ ...selectedScene, timeOfDay: e.target.value })}
                    >
                      {timeOfDayOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Duration (sec)</label>
                    <Input
                      type="number"
                      value={selectedScene.duration}
                      onChange={(e) => setSelectedScene({ ...selectedScene, duration: parseInt(e.target.value) || 30 })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Status</label>
                    <select
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      value={selectedScene.status}
                      onChange={(e) => setSelectedScene({ ...selectedScene, status: e.target.value as Scene['status'] })}
                    >
                      <option value="planned">Planned</option>
                      <option value="filmed">Filmed</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="approved">Approved</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Page Count</label>
                    <Input
                      type="number"
                      value={selectedScene.pageCount}
                      onChange={(e) => setSelectedScene({ ...selectedScene, pageCount: parseInt(e.target.value) || 1 })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={selectedScene.description}
                    onChange={(e) => setSelectedScene({ ...selectedScene, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Characters (comma separated)</label>
                  <Input
                    value={selectedScene.characters.join(', ')}
                    onChange={(e) => setSelectedScene({ ...selectedScene, characters: e.target.value.split(',').map(c => c.trim()) })}
                    placeholder="Director, Client, Assistant"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Props (comma separated)</label>
                  <Input
                    value={selectedScene.props.join(', ')}
                    onChange={(e) => setSelectedScene({ ...selectedScene, props: e.target.value.split(',').map(p => p.trim()) })}
                    placeholder="Camera, Lighting, Props"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Notes</label>
                  <Textarea
                    value={selectedScene.notes}
                    onChange={(e) => setSelectedScene({ ...selectedScene, notes: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => { setIsEditingScene(false); setSelectedScene(null); }}>
                  Cancel
                </Button>
                <Button onClick={() => updateScene(selectedScene)} className="bg-gradient-to-r from-neon-cyan to-neon-pink">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Add Character Modal */}
      {isAddingCharacter && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Add Character</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input
                    value={newCharacter.name}
                    onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
                    placeholder="Character name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={newCharacter.description}
                    onChange={(e) => setNewCharacter({ ...newCharacter, description: e.target.value })}
                    placeholder="Brief character description..."
                    rows={2}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Appearance</label>
                  <Input
                    value={newCharacter.appearance}
                    onChange={(e) => setNewCharacter({ ...newCharacter, appearance: e.target.value })}
                    placeholder="Physical appearance"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Personality</label>
                  <Input
                    value={newCharacter.personality}
                    onChange={(e) => setNewCharacter({ ...newCharacter, personality: e.target.value })}
                    placeholder="Personality traits"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Relationships (comma separated)</label>
                  <Input
                    value={newCharacter.relationships?.join(', ')}
                    onChange={(e) => setNewCharacter({ ...newCharacter, relationships: e.target.value.split(',').map(r => r.trim()) })}
                    placeholder="Director: Boss, Assistant: Colleague"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsAddingCharacter(false)}>
                  Cancel
                </Button>
                <Button onClick={addCharacter} className="bg-gradient-to-r from-neon-cyan to-neon-pink">
                  Add Character
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
