import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchBanners, createBanner, updateBanner, deleteBanner, toggleBannerStatus } from '../../store/slices/bannersSlice';
import { Banner, CreateBannerRequest } from '../../types/api';
import { toast } from 'sonner';

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading banners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-on-scroll">Banner Management</h1>
          <p className="text-gray-600 mb-6 animate-on-scroll">
            Create and manage promotional banners for your platform
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors animate-on-scroll"
          >
            Create New Banner
          </button>
        </div>

        {/* Create/Edit Form */}
        {showCreateForm && (
          <div className="mb-8">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm animate-on-scroll">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 animate-on-scroll">
                  {editingBanner ? 'Edit Banner' : 'Create New Banner'}
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 animate-on-scroll">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent animate-on-scroll"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 animate-on-scroll">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent animate-on-scroll"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 animate-on-scroll">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent animate-on-scroll"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 animate-on-scroll">
                        Action URL
                      </label>
                      <input
                        type="url"
                        value={formData.action_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, action_url: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent animate-on-scroll"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 animate-on-scroll">
                        Action Text
                      </label>
                      <input
                        type="text"
                        value={formData.action_text}
                        onChange={(e) => setFormData(prev => ({ ...prev, action_text: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent animate-on-scroll"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 animate-on-scroll">
                        Display Type
                      </label>
                      <select
                        value={formData.display_type}
                        onChange={(e) => setFormData(prev => ({ ...prev, display_type: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent animate-on-scroll"
                      >
                        <option value="carousel">Carousel</option>
                        <option value="hero">Hero</option>
                        <option value="sidebar">Sidebar</option>
                        <option value="popup">Popup</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 animate-on-scroll">
                        Target Audience
                      </label>
                      <select
                        value={formData.target_audience}
                        onChange={(e) => setFormData(prev => ({ ...prev, target_audience: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent animate-on-scroll"
                      >
                        <option value="all">All Users</option>
                        <option value="players">Players</option>
                        <option value="coaches">Coaches</option>
                        <option value="clubs">Clubs</option>
                        <option value="partners">Partners</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <label className="flex items-center animate-on-scroll">
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Active</span>
                    </label>
                    <label className="flex items-center animate-on-scroll">
                      <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Featured</span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
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
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors animate-on-scroll"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors animate-on-scroll"
                    >
                      {editingBanner ? 'Update Banner' : 'Create Banner'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Banners List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 animate-on-scroll">
              <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                {banner.image_url ? (
                  <img
                    src={banner.image_url}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 animate-on-scroll">
                      {banner.title}
                    </h3>
                    {banner.subtitle && (
                      <p className="text-gray-600 text-sm animate-on-scroll">
                        {banner.subtitle}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium animate-on-scroll ${
                      banner.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {banner.is_active ? 'Active' : 'Inactive'}
                    </span>
                    {banner.is_featured && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 animate-on-scroll">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500 animate-on-scroll">
                    <span className="font-medium mr-2">Type:</span>
                    <span className="capitalize">{banner.display_type}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 animate-on-scroll">
                    <span className="font-medium mr-2">Audience:</span>
                    <span className="capitalize">{banner.target_audience}</span>
                  </div>
                  {banner.action_text && (
                    <div className="flex items-center text-sm text-gray-500 animate-on-scroll">
                      <span className="font-medium mr-2">Action:</span>
                      <span>{banner.action_text}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(banner)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors animate-on-scroll"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleStatus(banner.id)}
                    className={`px-3 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors animate-on-scroll ${
                      banner.is_active
                        ? 'text-red-600 bg-red-50 border border-red-200 hover:bg-red-100'
                        : 'text-green-600 bg-green-50 border border-green-200 hover:bg-green-100'
                    }`}
                  >
                    {banner.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors animate-on-scroll"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {banners.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-on-scroll" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 animate-on-scroll">No banners found</h3>
              <p className="text-gray-600 mb-6 animate-on-scroll">
                Create your first banner to get started with promotional content.
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors animate-on-scroll"
              >
                Create Banner
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannersPage; 