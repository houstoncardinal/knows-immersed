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
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Camera,
  Clock,
  Calendar,
  MapPin,
  Users,
  Target,
  Zap,
  Film,
  Scissors,
  RotateCcw,
  Save,
  Download,
  Upload,
  ZoomIn,
  ZoomOut,
  Move,
  Edit3,
  Trash2,
  Eye,
  CheckCircle,
  AlertTriangle,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";

interface TimelineEvent {
  id: string;
  title: string;
  type: 'scene' | 'setup' | 'break' | 'transition' | 'effect';
  startTime: number; // minutes from start
  duration: number; // minutes
  description: string;
  location?: string;
  characters?: string[];
  equipment?: string[];
  notes?: string;
  status: 'planned' | 'scheduled' | 'completed' | 'cancelled';
  dependencies?: string[]; // IDs of events this depends on
}

interface DaySchedule {
  id: string;
  date: Date;
  events: TimelineEvent[];
  totalDuration: number;
  workingHours: number;
}

const eventTypes = [
  { value: 'scene', label: 'Scene', color: 'bg-blue-500', icon: Film },
  { value: 'setup', label: 'Setup', color: 'bg-yellow-500', icon: Target },
  { value: 'break', label: 'Break', color: 'bg-gray-500', icon: Clock },
  { value: 'transition', label: 'Transition', color: 'bg-purple-500', icon: Move },
  { value: 'effect', label: 'Effect', color: 'bg-green-500', icon: Zap },
];

const sampleEvents: TimelineEvent[] = [
  {
    id: '1',
    title: 'Studio Setup',
    type: 'setup',
    startTime: 0,
    duration: 60,
    description: 'Set up lighting and camera equipment',
    location: 'Studio A',
    equipment: ['Camera', 'Lighting Kit', 'Tripods'],
    status: 'completed',
    notes: 'All equipment tested and ready'
  },
  {
    id: '2',
    title: 'Scene 1 - Opening Shot',
    type: 'scene',
    startTime: 60,
    duration: 45,
    description: 'Wide establishing shot of studio exterior',
    location: 'Exterior',
    characters: ['Director', 'Assistant'],
    equipment: ['Camera A', 'Drone'],
    status: 'completed',
    notes: 'Perfect golden hour lighting'
  },
  {
    id: '3',
    title: 'Lunch Break',
    type: 'break',
    startTime: 105,
    duration: 60,
    description: 'Team lunch and rest',
    status: 'completed'
  },
  {
    id: '4',
    title: 'Scene 2 - Interview',
    type: 'scene',
    startTime: 165,
    duration: 90,
    description: 'Director interview segment',
    location: 'Studio A',
    characters: ['Director', 'Interviewer'],
    equipment: ['Camera B', 'Microphones', 'Lighting'],
    status: 'scheduled',
    notes: 'Need to review questions beforehand'
  }
];

export const Timeline = () => {
  const [currentDay, setCurrentDay] = useState<DaySchedule>({
    id: '1',
    date: new Date(),
    events: sampleEvents,
    totalDuration: 480, // 8 hours
    workingHours: 8
  });

  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [newEvent, setNewEvent] = useState<Partial<TimelineEvent>>({
    title: '',
    type: 'scene',
    startTime: 0,
    duration: 30,
    description: '',
    status: 'planned'
  });

  const addEvent = () => {
    if (!newEvent.title || !newEvent.description) {
      toast.error("Please fill in required fields");
      return;
    }

    const event: TimelineEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      type: newEvent.type as TimelineEvent['type'] || 'scene',
      startTime: newEvent.startTime || 0,
      duration: newEvent.duration || 30,
      description: newEvent.description,
      location: newEvent.location,
      characters: newEvent.characters,
      equipment: newEvent.equipment,
      notes: newEvent.notes,
      status: newEvent.status as TimelineEvent['status'] || 'planned',
      dependencies: newEvent.dependencies
    };

    const updatedDay = {
      ...currentDay,
      events: [...currentDay.events, event].sort((a, b) => a.startTime - b.startTime)
    };

    setCurrentDay(updatedDay);
    setNewEvent({
      title: '',
      type: 'scene',
      startTime: 0,
      duration: 30,
      description: '',
      status: 'planned'
    });
    setIsAddingEvent(false);
    toast.success("Event added to timeline");
  };

  const updateEvent = (updatedEvent: TimelineEvent) => {
    const updatedDay = {
      ...currentDay,
      events: currentDay.events.map(event =>
        event.id === updatedEvent.id ? updatedEvent : event
      ).sort((a, b) => a.startTime - b.startTime)
    };

    setCurrentDay(updatedDay);
    setSelectedEvent(null);
    setIsEditingEvent(false);
    toast.success("Event updated");
  };

  const deleteEvent = (eventId: string) => {
    const updatedDay = {
      ...currentDay,
      events: currentDay.events.filter(event => event.id !== eventId)
    };

    setCurrentDay(updatedDay);
    if (selectedEvent?.id === eventId) {
      setSelectedEvent(null);
    }
    toast.success("Event deleted");
  };

  const getEventTypeInfo = (type: TimelineEvent['type']) => {
    return eventTypes.find(t => t.value === type) || eventTypes[0];
  };

  const getStatusColor = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'planned': return 'bg-yellow-500';
      case 'scheduled': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const getTimelinePosition = (time: number) => {
    const totalMinutes = currentDay.workingHours * 60;
    return (time / totalMinutes) * 100;
  };

  const getEventWidth = (duration: number) => {
    const totalMinutes = currentDay.workingHours * 60;
    return (duration / totalMinutes) * 100;
  };

  const progressPercentage = (currentDay.events.filter(e => e.status === 'completed').length / currentDay.events.length) * 100;

  return (
    <AdminLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient-neon">Production Timeline</h1>
          <p className="text-muted-foreground">Visual sequence planning and scheduling</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground">{Math.round(zoomLevel * 100)}%</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.25))}
          >
            <ZoomIn className="w-4 h-4" />
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

      {/* Day Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{currentDay.date.toLocaleDateString()}</p>
              <p className="text-sm text-muted-foreground">Shoot Day</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{currentDay.workingHours}h</p>
              <p className="text-sm text-muted-foreground">Working Hours</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Film className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{currentDay.events.length}</p>
              <p className="text-sm text-muted-foreground">Total Events</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{Math.round(progressPercentage)}%</p>
              <p className="text-sm text-muted-foreground">Complete</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Day Progress</h3>
          <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% complete</span>
        </div>
        <Progress value={progressPercentage} className="h-3" />
      </Card>

      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          {/* Timeline Controls */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentTime(Math.max(0, currentTime - 15))}
                >
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentTime(Math.min(currentDay.workingHours * 60, currentTime + 15))}
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium">{formatTime(currentTime)}</span>
              </div>
              <Button onClick={() => setIsAddingEvent(true)} className="bg-gradient-to-r from-neon-cyan to-neon-pink">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </div>
          </Card>

          {/* Visual Timeline */}
          <Card className="p-6">
            <div className="relative">
              {/* Time markers */}
              <div className="flex mb-4 border-b border-border pb-2">
                {Array.from({ length: currentDay.workingHours + 1 }, (_, i) => (
                  <div key={i} className="flex-1 text-center">
                    <div className="text-sm font-medium">{formatTime(i * 60)}</div>
                    <div className="w-px h-4 bg-border mx-auto mt-1"></div>
                  </div>
                ))}
              </div>

              {/* Timeline events */}
              <div className="relative min-h-32">
                {currentDay.events.map((event) => {
                  const typeInfo = getEventTypeInfo(event.type);
                  const Icon = typeInfo.icon;
                  return (
                    <div
                      key={event.id}
                      className={`absolute top-0 h-16 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${typeInfo.color} border-white shadow-lg`}
                      style={{
                        left: `${getTimelinePosition(event.startTime)}%`,
                        width: `${getEventWidth(event.duration)}%`,
                        minWidth: '120px'
                      }}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="p-2 h-full flex items-center gap-2 text-white">
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{event.title}</div>
                          <div className="text-xs opacity-90">{formatTime(event.duration)}</div>
                        </div>
                        <div className={`w-2 h-2 rounded-full bg-white opacity-75`}></div>
                      </div>
                    </div>
                  );
                })}

                {/* Current time indicator */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                  style={{ left: `${getTimelinePosition(currentTime)}%` }}
                >
                  <div className="absolute -top-2 -left-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Event Details */}
          {selectedEvent && (
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{selectedEvent.title}</h3>
                  <p className="text-muted-foreground">{selectedEvent.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{getEventTypeInfo(selectedEvent.type).label}</Badge>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedEvent.status)}`}></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Start Time</p>
                  <p className="font-medium">{formatTime(selectedEvent.startTime)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Duration</p>
                  <p className="font-medium">{formatTime(selectedEvent.duration)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">End Time</p>
                  <p className="font-medium">{formatTime(selectedEvent.startTime + selectedEvent.duration)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={selectedEvent.status === 'completed' ? 'default' : 'secondary'}>
                    {selectedEvent.status}
                  </Badge>
                </div>
              </div>

              {selectedEvent.location && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {selectedEvent.location}
                  </p>
                </div>
              )}

              {selectedEvent.characters && selectedEvent.characters.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Characters</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.characters.map(character => (
                      <Badge key={character} variant="secondary">
                        <Users className="w-3 h-3 mr-1" />
                        {character}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.equipment && selectedEvent.equipment.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Equipment</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.equipment.map(item => (
                      <Badge key={item} variant="outline">
                        <Target className="w-3 h-3 mr-1" />
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.notes && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm italic">{selectedEvent.notes}</p>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsEditingEvent(true)}>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" onClick={() => deleteEvent(selectedEvent.id)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daily Schedule</h3>
            <div className="space-y-3">
              {currentDay.events
                .sort((a, b) => a.startTime - b.startTime)
                .map((event) => {
                  const typeInfo = getEventTypeInfo(event.type);
                  const Icon = typeInfo.icon;
                  return (
                    <div key={event.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold">{event.title}</h4>
                          <Badge variant="outline" className="text-xs">{typeInfo.label}</Badge>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(event.status)}`}></div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{formatTime(event.startTime)} - {formatTime(event.startTime + event.duration)}</span>
                          <span>{formatTime(event.duration)} duration</span>
                          {event.location && <span>{event.location}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setSelectedEvent(event)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setIsEditingEvent(true)}>
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Equipment Usage</h3>
              <div className="space-y-3">
                {Array.from(new Set(currentDay.events.flatMap(e => e.equipment || []))).map(equipment => {
                  const usageCount = currentDay.events.filter(e => e.equipment?.includes(equipment)).length;
                  return (
                    <div key={equipment} className="flex items-center justify-between">
                      <span className="text-sm">{equipment}</span>
                      <Badge variant="secondary">{usageCount} events</Badge>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Location Schedule</h3>
              <div className="space-y-3">
                {Array.from(new Set(currentDay.events.map(e => e.location).filter(Boolean))).map(location => {
                  const eventsAtLocation = currentDay.events.filter(e => e.location === location);
                  return (
                    <div key={location} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{location}</span>
                        <Badge variant="outline">{eventsAtLocation.length} events</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {eventsAtLocation.map(e => `${formatTime(e.startTime)}: ${e.title}`).join(', ')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Event Modal */}
      {isAddingEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Add Timeline Event</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Event title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Type</label>
                  <select
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as TimelineEvent['type'] })}
                  >
                    {eventTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Start Time (min)</label>
                    <Input
                      type="number"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({ ...newEvent, startTime: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Duration (min)</label>
                    <Input
                      type="number"
                      value={newEvent.duration}
                      onChange={(e) => setNewEvent({ ...newEvent, duration: parseInt(e.target.value) || 30 })}
                      placeholder="30"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Describe this event..."
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Input
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    placeholder="Studio A, Exterior, etc."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsAddingEvent(false)}>
                  Cancel
                </Button>
                <Button onClick={addEvent} className="bg-gradient-to-r from-neon-cyan to-neon-pink">
                  Add Event
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Event Modal */}
      {isEditingEvent && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Edit Event</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={selectedEvent.title}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Type</label>
                  <select
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    value={selectedEvent.type}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, type: e.target.value as TimelineEvent['type'] })}
                  >
                    {eventTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Start Time (min)</label>
                    <Input
                      type="number"
                      value={selectedEvent.startTime}
                      onChange={(e) => setSelectedEvent({ ...selectedEvent, startTime: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Duration (min)</label>
                    <Input
                      type="number"
                      value={selectedEvent.duration}
                      onChange={(e) => setSelectedEvent({ ...selectedEvent, duration: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={selectedEvent.description}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Input
                    value={selectedEvent.location || ''}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Characters (comma separated)</label>
                  <Input
                    value={selectedEvent.characters?.join(', ') || ''}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, characters: e.target.value.split(',').map(c => c.trim()) })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Equipment (comma separated)</label>
                  <Input
                    value={selectedEvent.equipment?.join(', ') || ''}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, equipment: e.target.value.split(',').map(e => e.trim()) })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Notes</label>
                  <Textarea
                    value={selectedEvent.notes || ''}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, notes: e.target.value })}
                    rows={2}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    value={selectedEvent.status}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, status: e.target.value as TimelineEvent['status'] })}
                  >
                    <option value="planned">Planned</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => { setIsEditingEvent(false); setSelectedEvent(null); }}>
                  Cancel
                </Button>
                <Button onClick={() => updateEvent(selectedEvent)} className="bg-gradient-to-r from-neon-cyan to-neon-pink">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
