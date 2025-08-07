import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchBanners, createBanner, updateBanner, deleteBanner, toggleBannerStatus } from '../store/slices/bannersSlice';
import { Banner, CreateBannerRequest } from '../types/api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { animationConfigs, getAnimationVariants } from '../lib/animations';

const BannersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { banners, loading, error } = useSelector((state: RootState) => state.banners);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState<Partial<CreateBannerRequest>>({
    title: '',
    subtitle: '',
    image_url: '',
    action_url: '',
    action_text: '',
    display_type: 'carousel',
    target_audience: 'all',
    is_active: true,
    is_featured: false,
  });

  useEffect(() => {
    dispatch(fetchBanners({ page: 1, limit: 20 }));
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBanner) {
        await dispatch(updateBanner({ id: editingBanner.id, bannerData: formData as CreateBannerRequest })).unwrap();
        toast.success('Banner updated successfully');
      } else {
        await dispatch(createBanner(formData as CreateBannerRequest)).unwrap();
        toast.success('Banner created successfully');
      }
      setShowCreateForm(false);
      setEditingBanner(null);
      setFormData({
        title: '',
        subtitle: '',
        image_url: '',
        action_url: '',
        action_text: '',
        display_type: 'carousel',
        target_audience: 'all',
        is_active: true,
        is_featured: false,
      });
    } catch (error) {
      toast.error('Failed to save banner');
    }
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      image_url: banner.image_url,
      action_url: banner.action_url,
      action_text: banner.action_text,
      display_type: banner.display_type,
      target_audience: banner.target_audience,
      is_active: banner.is_active,
      is_featured: banner.is_featured,
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await dispatch(deleteBanner(id)).unwrap();
        toast.success('Banner deleted successfully');
      } catch (error) {
        toast.error('Failed to delete banner');
      }
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await dispatch(toggleBannerStatus(id)).unwrap();
      toast.success('Banner status updated');
    } catch (error) {
      toast.error('Failed to update banner status');
    }
  };

  if (loading) return <div className="flex justify-center p-8">Loading banners...</div>;
  if (error) return <div className="text-red-500 p-8">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <motion.div 
        className="flex justify-between items-center mb-6"
        initial="hidden"
        animate="visible"
        variants={getAnimationVariants('up', 0.7, 0.1)}
      >
        <h1 className="text-3xl font-bold">Banner Management</h1>
        <Button onClick={() => setShowCreateForm(true)}>Create New Banner</Button>
      </motion.div>

      {showCreateForm && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={getAnimationVariants('up', 0.8, 0.2)}
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingBanner ? 'Edit Banner' : 'Create New Banner'}</CardTitle>
              <CardDescription>
                {editingBanner ? 'Update banner information' : 'Add a new banner to the system'}
              </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="action_url">Action URL</Label>
                  <Input
                    id="action_url"
                    value={formData.action_url}
                    onChange={(e) => setFormData({ ...formData, action_url: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="action_text">Action Text</Label>
                  <Input
                    id="action_text"
                    value={formData.action_text}
                    onChange={(e) => setFormData({ ...formData, action_text: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="display_type">Display Type</Label>
                  <Select
                    value={formData.display_type}
                    onValueChange={(value) => setFormData({ ...formData, display_type: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carousel">Carousel</SelectItem>
                      <SelectItem value="sidebar">Sidebar</SelectItem>
                      <SelectItem value="popup">Popup</SelectItem>
                      <SelectItem value="notification">Notification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="target_audience">Target Audience</Label>
                  <Select
                    value={formData.target_audience}
                    onValueChange={(value) => setFormData({ ...formData, target_audience: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="players">Players</SelectItem>
                      <SelectItem value="coaches">Coaches</SelectItem>
                      <SelectItem value="clubs">Clubs</SelectItem>
                      <SelectItem value="partners">Partners</SelectItem>
                      <SelectItem value="admins">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {editingBanner ? 'Update Banner' : 'Create Banner'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingBanner(null);
                    setFormData({
                      title: '',
                      subtitle: '',
                      image_url: '',
                      action_url: '',
                      action_text: '',
                      display_type: 'carousel',
                      target_audience: 'all',
                      is_active: true,
                      is_featured: false,
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        </motion.div>
      )}

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.3
            }
          }
        }}
      >
        {banners.map((banner, index) => {
          const config = animationConfigs.banners[index % 4];
          return (
            <motion.div
              key={banner.id}
              variants={getAnimationVariants(config.direction, config.duration, config.delay)}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{banner.title}</CardTitle>
                      <CardDescription>{banner.subtitle}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={banner.is_active ? "default" : "secondary"}
                        onClick={() => handleToggleStatus(banner.id)}
                      >
                        {banner.is_active ? 'Active' : 'Inactive'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Display Type:</span>
                      <span className="font-medium">{banner.display_type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Target Audience:</span>
                      <span className="font-medium">{banner.target_audience}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Position:</span>
                      <span className="font-medium">{banner.position}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Views:</span>
                      <span className="font-medium">{banner.view_count}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Clicks:</span>
                      <span className="font-medium">{banner.click_count}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" onClick={() => handleEdit(banner)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(banner.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default BannersPage; 