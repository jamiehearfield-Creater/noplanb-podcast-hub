import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, ExternalLink, Trash2, Calendar, Video } from 'lucide-react';

interface Reel {
  id: string;
  embed_url: string;
  caption: string | null;
  thumbnail_url: string | null;
  instagram_id: string | null;
  publish_date: string | null;
  created_at: string;
  updated_at: string;
}

const AdminReels = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingReel, setEditingReel] = useState<Reel | null>(null);
  const [formData, setFormData] = useState({
    embed_url: '',
    caption: '',
    thumbnail_url: '',
    instagram_id: '',
    publish_date: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    try {
      const { data, error } = await supabase
        .from('reels')
        .select('*')
        .order('publish_date', { ascending: false });
      
      if (error) throw error;
      setReels(data || []);
    } catch (error) {
      console.error('Error fetching reels:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch reels',
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
      const reelData = {
        ...formData,
        publish_date: formData.publish_date || null,
      };

      if (editingReel) {
        const { error } = await supabase
          .from('reels')
          .update(reelData)
          .eq('id', editingReel.id);
        
        if (error) throw error;
        toast({ title: 'Success', description: 'Reel updated successfully' });
      } else {
        const { error } = await supabase
          .from('reels')
          .insert([reelData]);
        
        if (error) throw error;
        toast({ title: 'Success', description: 'Reel created successfully' });
      }

      setDialogOpen(false);
      resetForm();
      fetchReels();
    } catch (error) {
      console.error('Error saving reel:', error);
      toast({
        title: 'Error',
        description: 'Failed to save reel',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (reel: Reel) => {
    setEditingReel(reel);
    setFormData({
      embed_url: reel.embed_url,
      caption: reel.caption || '',
      thumbnail_url: reel.thumbnail_url || '',
      instagram_id: reel.instagram_id || '',
      publish_date: reel.publish_date ? new Date(reel.publish_date).toISOString().split('T')[0] : '',
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this reel?')) return;

    try {
      const { error } = await supabase
        .from('reels')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: 'Success', description: 'Reel deleted successfully' });
      fetchReels();
    } catch (error) {
      console.error('Error deleting reel:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete reel',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      embed_url: '',
      caption: '',
      thumbnail_url: '',
      instagram_id: '',
      publish_date: '',
    });
    setEditingReel(null);
  };

  if (loading && reels.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Reels</h2>
          <p className="text-muted-foreground">Manage your Instagram reels and short-form content</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Reel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingReel ? 'Edit Reel' : 'Add New Reel'}</DialogTitle>
              <DialogDescription>
                {editingReel ? 'Update reel information' : 'Add a new reel to your content'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="embed_url">Embed URL *</Label>
                <Input
                  id="embed_url"
                  type="url"
                  value={formData.embed_url}
                  onChange={(e) => setFormData({ ...formData, embed_url: e.target.value })}
                  placeholder="https://www.instagram.com/reel/..."
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="caption">Caption</Label>
                <Textarea
                  id="caption"
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  rows={3}
                  placeholder="Write a caption for your reel..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                <Input
                  id="thumbnail_url"
                  type="url"
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  placeholder="https://example.com/thumbnail.jpg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instagram_id">Instagram ID</Label>
                <Input
                  id="instagram_id"
                  value={formData.instagram_id}
                  onChange={(e) => setFormData({ ...formData, instagram_id: e.target.value })}
                  placeholder="Instagram post ID"
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
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {editingReel ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reels.map((reel) => (
          <Card key={reel.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    {reel.thumbnail_url ? (
                      <img 
                        src={reel.thumbnail_url} 
                        alt="Reel thumbnail"
                        className="max-w-full max-h-full object-cover rounded"
                      />
                    ) : (
                      <Video className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-sm">
                      {reel.instagram_id ? `Reel ${reel.instagram_id}` : 'Instagram Reel'}
                    </CardTitle>
                    {reel.publish_date && (
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(reel.publish_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(reel)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(reel.id)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-3 mb-4">
                {reel.caption || 'No caption provided'}
              </CardDescription>
              
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={reel.embed_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Instagram
                  </a>
                </Button>
              </div>
              
              <div className="mt-4 text-xs text-muted-foreground">
                Added {new Date(reel.created_at).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reels.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No reels yet</h3>
            <p className="text-muted-foreground mb-4">Add your first reel to get started</p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Reel
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminReels;