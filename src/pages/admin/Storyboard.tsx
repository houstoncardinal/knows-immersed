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
  Camera,
  Play,
  Pause,
  RotateCcw,
  Save,
  Download,
  Upload,
  Grid3X3,
  List,
  Eye,
  Edit3,
  Trash2,
  Copy,
  Move,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { toast } from "sonner";

interface Shot {
  id: string;
  scene: string;
  shotNumber: number;
  description: string;
  cameraAngle: string;
  cameraMovement: string;
  duration: number;
  notes: string;
  thumbnail?: string;
  status: 'planned' | 'filmed' | 'reviewed' | 'approved';
}

const cameraAngles = [
  'Wide Shot (WS)',
  'Medium Shot (MS)',
  'Close-Up (CU)',
  'Extreme Close-Up (ECU)',
  'Over-the-Shoulder (OTS)',
  'Point of View (POV)',
  'High Angle',
  'Low Angle',
  'Dutch Angle',
  'Bird\'s Eye',
  'Worm\'s Eye'
];

const cameraMovements = [
  'Static',
  'Pan Left',
  'Pan Right',
  'Tilt Up',
  'Tilt Down',
  'Tracking Shot',
  'Dolly Zoom',
  'Handheld',
  'Steadicam',
  'Crane Shot',
  'Drone Shot'
];

export const Storyboard = () => {
  const [shots, setShots] = useState<Shot[]>([
    {
      id: '1',
      scene: 'INT. STUDIO - DAY',
      shotNumber: 1,
      description: 'Wide establishing shot of the studio space',
      cameraAngle: 'Wide Shot (WS)',
      cameraMovement: 'Static',
      duration: 5,
      notes: 'Show the full studio setup, lighting equipment visible',
      status: 'planned'
    },
    {
      id: '2',
      scene: 'INT. STUDIO - DAY',
      shotNumber: 2,
      description: 'Medium shot of director giving instructions',
      cameraAngle: 'Medium Shot (MS)',
      cameraMovement: 'Static',
      duration: 8,
      notes: 'Focus on facial expressions and hand gestures',
      status: 'planned'
    }
  ]);

  const [selectedShot, setSelectedShot] = useState<Shot | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isEditing, setIsEditing] = useState(false);
  const [newShot, setNewShot] = useState<Partial<Shot>>({
    scene: '',
    description: '',
    cameraAngle: 'Medium Shot (MS)',
    cameraMovement: 'Static',
    duration: 5,
    notes: '',
    status: 'planned'
  });

  const addShot = () => {
    if (!newShot.scene || !newShot.description) {
      toast.error("Please fill in scene and description");
      return;
    }

    const shot: Shot = {
      id: Date.now().toString(),
      scene: newShot.scene,
      shotNumber: shots.length + 1,
      description: newShot.description,
      cameraAngle: newShot.cameraAngle || 'Medium Shot (MS)',
      cameraMovement: newShot.cameraMovement || 'Static',
      duration: newShot.duration || 5,
      notes: newShot.notes || '',
      status: newShot.status as Shot['status'] || 'planned'
    };

    setShots([...shots, shot]);
    setNewShot({
      scene: '',
      description: '',
      cameraAngle: 'Medium Shot (MS)',
      cameraMovement: 'Static',
      duration: 5,
      notes: '',
      status: 'planned'
    });
    toast.success("Shot added to storyboard");
  };

  const updateShot = (updatedShot: Shot) => {
    setShots(shots.map(shot => shot.id === updatedShot.id ? updatedShot : shot));
    setSelectedShot(null);
    setIsEditing(false);
    toast.success("Shot updated");
  };

  const deleteShot = (shotId: string) => {
    setShots(shots.filter(shot => shot.id !== shotId));
    if (selectedShot?.id === shotId) {
      setSelectedShot(null);
    }
    toast.success("Shot deleted");
  };

  const duplicateShot = (shot: Shot) => {
    const duplicatedShot: Shot = {
      ...shot,
      id: Date.now().toString(),
      shotNumber: shots.length + 1,
      description: `${shot.description} (Copy)`
    };
    setShots([...shots, duplicatedShot]);
    toast.success("Shot duplicated");
  };

  const getStatusColor = (status: Shot['status']) => {
    switch (status) {
      case 'planned': return 'bg-yellow-500';
      case 'filmed': return 'bg-blue-500';
      case 'reviewed': return 'bg-purple-500';
      case 'approved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: Shot['status']) => {
    switch (status) {
      case 'planned': return 'Planned';
      case 'filmed': return 'Filmed';
      case 'reviewed': return 'Reviewed';
      case 'approved': return 'Approved';
      default: return 'Unknown';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient-neon">Storyboard</h1>
          <p className="text-muted-foreground">Visual shot planning and sequence design</p>
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

      <Tabs defaultValue="shots" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="shots">Shots</TabsTrigger>
          <TabsTrigger value="sequence">Sequence</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="shots" className="space-y-6">
          {/* Add New Shot */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Shot
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Scene</label>
                <Input
                  placeholder="INT. STUDIO - DAY"
                  value={newShot.scene}
                  onChange={(e) => setNewShot({ ...newShot, scene: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Camera Angle</label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  value={newShot.cameraAngle}
                  onChange={(e) => setNewShot({ ...newShot, cameraAngle: e.target.value })}
                >
                  {cameraAngles.map(angle => (
                    <option key={angle} value={angle}>{angle}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Duration (sec)</label>
                <Input
                  type="number"
                  placeholder="5"
                  value={newShot.duration}
                  onChange={(e) => setNewShot({ ...newShot, duration: parseInt(e.target.value) || 5 })}
                />
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  placeholder="Describe what happens in this shot..."
                  value={newShot.description}
                  onChange={(e) => setNewShot({ ...newShot, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={addShot} className="bg-gradient-to-r from-neon-cyan to-neon-pink">
                <Plus className="w-4 h-4 mr-2" />
                Add Shot
              </Button>
            </div>
          </Card>

          {/* Shots Display */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Storyboard ({shots.length} shots)</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                Planned
                <div className="w-3 h-3 rounded-full bg-blue-500 ml-2"></div>
                Filmed
                <div className="w-3 h-3 rounded-full bg-green-500 ml-2"></div>
                Approved
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {shots.map((shot) => (
                  <Card
                    key={shot.id}
                    className="p-4 cursor-pointer hover:shadow-lg transition-all duration-200 group"
                    onClick={() => setSelectedShot(shot)}
                  >
                    <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center relative">
                      <Camera className="w-8 h-8 text-muted-foreground" />
                      <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getStatusColor(shot.status)}`}></div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Shot {shot.shotNumber}</Badge>
                        <span className="text-xs text-muted-foreground">{shot.duration}s</span>
                      </div>
                      <h4 className="font-medium text-sm line-clamp-2">{shot.description}</h4>
                      <p className="text-xs text-muted-foreground">{shot.cameraAngle}</p>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); duplicateShot(shot); }}>
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setIsEditing(true); setSelectedShot(shot); }}>
                          <Edit3 className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); deleteShot(shot.id); }}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {shots.map((shot) => (
                  <Card key={shot.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                        <Camera className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">Shot {shot.shotNumber}</Badge>
                          <span className="text-sm text-muted-foreground">{shot.scene}</span>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(shot.status)}`}></div>
                          <span className="text-xs text-muted-foreground">{getStatusLabel(shot.status)}</span>
                        </div>
                        <p className="text-sm">{shot.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>{shot.cameraAngle}</span>
                          <span>{shot.cameraMovement}</span>
                          <span>{shot.duration}s</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => duplicateShot(shot)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => { setIsEditing(true); setSelectedShot(shot); }}>
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => deleteShot(shot.id)}>
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

        <TabsContent value="sequence" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Shot Sequence Timeline</h3>
            <div className="space-y-4">
              {shots.map((shot, index) => (
                <div key={shot.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {shot.shotNumber}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{shot.description}</p>
                    <p className="text-sm text-muted-foreground">{shot.cameraAngle} • {shot.duration}s</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(shot.status)}`}></div>
                  {index < shots.length - 1 && (
                    <div className="w-8 h-8 flex items-center justify-center">
                      <div className="w-px h-6 bg-border"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-4">
              <Button variant="outline">
                <Play className="w-4 h-4 mr-2" />
                Play Sequence
              </Button>
              <Button variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save Timeline
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Storyboard Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shots.map((shot) => (
                <div key={shot.id} className="space-y-3">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative">
                    <Camera className="w-12 h-12 text-muted-foreground" />
                    <div className="absolute top-2 left-2">
                      <Badge variant="outline">Shot {shot.shotNumber}</Badge>
                    </div>
                    <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                      {shot.duration}s
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">{shot.description}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{shot.cameraAngle}</span>
                      <span>•</span>
                      <span>{shot.cameraMovement}</span>
                    </div>
                    {shot.notes && (
                      <p className="text-xs text-muted-foreground">{shot.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Shot Modal */}
      {isEditing && selectedShot && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Edit Shot {selectedShot.shotNumber}</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Scene</label>
                    <Input
                      value={selectedShot.scene}
                      onChange={(e) => setSelectedShot({ ...selectedShot, scene: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Camera Angle</label>
                    <select
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      value={selectedShot.cameraAngle}
                      onChange={(e) => setSelectedShot({ ...selectedShot, cameraAngle: e.target.value })}
                    >
                      {cameraAngles.map(angle => (
                        <option key={angle} value={angle}>{angle}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Camera Movement</label>
                    <select
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      value={selectedShot.cameraMovement}
                      onChange={(e) => setSelectedShot({ ...selectedShot, cameraMovement: e.target.value })}
                    >
                      {cameraMovements.map(movement => (
                        <option key={movement} value={movement}>{movement}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Duration (sec)</label>
                    <Input
                      type="number"
                      value={selectedShot.duration}
                      onChange={(e) => setSelectedShot({ ...selectedShot, duration: parseInt(e.target.value) || 5 })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Status</label>
                    <select
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      value={selectedShot.status}
                      onChange={(e) => setSelectedShot({ ...selectedShot, status: e.target.value as Shot['status'] })}
                    >
                      <option value="planned">Planned</option>
                      <option value="filmed">Filmed</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="approved">Approved</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={selectedShot.description}
                    onChange={(e) => setSelectedShot({ ...selectedShot, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Notes</label>
                  <Textarea
                    value={selectedShot.notes}
                    onChange={(e) => setSelectedShot({ ...selectedShot, notes: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => { setIsEditing(false); setSelectedShot(null); }}>
                  Cancel
                </Button>
                <Button onClick={() => updateShot(selectedShot)} className="bg-gradient-to-r from-neon-cyan to-neon-pink">
                  Save Changes
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
