import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, ExternalLink, Trash2, Calendar, Clock } from 'lucide-react';

interface Episode {
  id: string;
  title: string;
  description: string | null;
  spotify_link: string | null;
  youtube_link: string | null;
  apple_link: string | null;
  amazon_link: string | null;
  guest: string | null;
  tags: string[] | null;
  thumbnail_url: string | null;
  duration: string | null;
  publish_date: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

const AdminEpisodes = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState<Episode | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    spotify_link: '',
    youtube_link: '',
    apple_link: '',
    amazon_link: '',
    guest: '',
    tags: '',
    thumbnail_url: '',
    duration: '',
    publish_date: '',
    featured: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    try {
      const { data, error } = await supabase
        .from('episodes')
        .select('*')
        .order('publish_date', { ascending: false });
      
      if (error) throw error;
      setEpisodes(data || []);
    } catch (error) {
      console.error('Error fetching episodes:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch episodes',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const episodeData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : null,
        publish_date: formData.publish_date || null,
      };

      if (editingEpisode) {
        const { error } = await supabase
          .from('episodes')
          .update(episodeData)
          .eq('id', editingEpisode.id);
        
        if (error) throw error;
        toast({ title: 'Success', description: 'Episode updated successfully' });
      } else {
        const { error } = await supabase
          .from('episodes')
          .insert([episodeData]);
        
        if (error) throw error;
        toast({ title: 'Success', description: 'Episode created successfully' });
      }

      setDialogOpen(false);
      resetForm();
      fetchEpisodes();
    } catch (error) {
      console.error('Error saving episode:', error);
      toast({
        title: 'Error',
        description: 'Failed to save episode',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (episode: Episode) => {
    setEditingEpisode(episode);
    setFormData({
      title: episode.title,
      description: episode.description || '',
      spotify_link: episode.spotify_link || '',
      youtube_link: episode.youtube_link || '',
      apple_link: episode.apple_link || '',
      amazon_link: episode.amazon_link || '',
      guest: episode.guest || '',
      tags: episode.tags?.join(', ') || '',
      thumbnail_url: episode.thumbnail_url || '',
      duration: episode.duration || '',
      publish_date: episode.publish_date ? new Date(episode.publish_date).toISOString().split('T')[0] : '',
      featured: episode.featured,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this episode?')) return;

    try {
      const { error } = await supabase
        .from('episodes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: 'Success', description: 'Episode deleted successfully' });
      fetchEpisodes();
    } catch (error) {
      console.error('Error deleting episode:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete episode',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      spotify_link: '',
      youtube_link: '',
      apple_link: '',
      amazon_link: '',
      guest: '',
      tags: '',
      thumbnail_url: '',
      duration: '',
      publish_date: '',
      featured: false,
    });
    setEditingEpisode(null);
  };

  if (loading && episodes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Episodes</h2>
          <p className="text-muted-foreground">Manage your podcast episodes</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Episode
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEpisode ? 'Edit Episode' : 'Add New Episode'}</DialogTitle>
              <DialogDescription>
                {editingEpisode ? 'Update episode information' : 'Add a new episode to your podcast'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="title">Episode Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="guest">Guest</Label>
                  <Input
                    id="guest"
                    value={formData.guest}
                    onChange={(e) => setFormData({ ...formData, guest: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="1:23:45"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="publish_date">Publish Date</Label>
                  <Input
                    id="publish_date"
                    type="date"
                    value={formData.publish_date}
                    onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                  <Input
                    id="thumbnail_url"
                    type="url"
                    value={formData.thumbnail_url}
                    onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  />
                </div>
                
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="business, startup, mindset"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="spotify_link">Spotify Link</Label>
                  <Input
                    id="spotify_link"
                    type="url"
                    value={formData.spotify_link}
                    onChange={(e) => setFormData({ ...formData, spotify_link: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="youtube_link">YouTube Link</Label>
                  <Input
                    id="youtube_link"
                    type="url"
                    value={formData.youtube_link}
                    onChange={(e) => setFormData({ ...formData, youtube_link: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="apple_link">Apple Podcasts Link</Label>
                  <Input
                    id="apple_link"
                    type="url"
                    value={formData.apple_link}
                    onChange={(e) => setFormData({ ...formData, apple_link: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amazon_link">Amazon Music Link</Label>
                  <Input
                    id="amazon_link"
                    type="url"
                    value={formData.amazon_link}
                    onChange={(e) => setFormData({ ...formData, amazon_link: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured">Featured Episode</Label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {editingEpisode ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {episodes.map((episode) => (
          <Card key={episode.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-lg">{episode.title}</CardTitle>
                    {episode.featured && (
                      <span className="text-xs bg-brand/10 text-brand px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  {episode.guest && (
                    <p className="text-sm text-muted-foreground">Guest: {episode.guest}</p>
                  )}
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
                    {episode.publish_date && (
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(episode.publish_date).toLocaleDateString()}
                      </span>
                    )}
                    {episode.duration && (
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {episode.duration}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(episode)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(episode.id)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-2 mb-4">
                {episode.description || 'No description provided'}
              </CardDescription>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {episode.tags?.map((tag, index) => (
                  <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {episode.spotify_link && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={episode.spotify_link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Spotify
                    </a>
                  </Button>
                )}
                {episode.youtube_link && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={episode.youtube_link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      YouTube
                    </a>
                  </Button>
                )}
                {episode.apple_link && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={episode.apple_link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Apple
                    </a>
                  </Button>
                )}
                {episode.amazon_link && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={episode.amazon_link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Amazon
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {episodes.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No episodes yet</h3>
            <p className="text-muted-foreground mb-4">Add your first episode to get started</p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Episode
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminEpisodes;