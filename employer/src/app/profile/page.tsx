'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui-components/Button';
import { Input } from '@/components/ui-components/Input';
import { Card } from '@/components/ui-components/Card';
import { UserService, User } from '@/services/user.service';
import { useToast } from '@/hooks/useToast';
import { UserIcon, CameraIcon, SaveIcon } from '@/components/svg-icons';
import { InlineLoader, UpzellaLoader } from '@/components/ui-components/loader';

export default function ProfilePage() {
    const [profile, setProfile] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        job_role: '',
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setIsLoading(true);
            const profileData = await UserService.getProfile();
            setProfile(profileData);
            setFormData({
                full_name: profileData.full_name || '',
                phone: profileData.phone || '',
                job_role: profileData.job_role || '',
            });
        } catch (error: any) {
            toast.error('Failed to load profile', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleUpdateProfile = async () => {
        try {
            setIsUpdating(true);

            // Filter out empty values
            const updates = Object.entries(formData).reduce((acc, [key, value]) => {
                if (value.trim() !== '') {
                    acc[key] = value.trim();
                }
                return acc;
            }, {} as any);

            await UserService.updateProfile(updates);
            // Refresh profile data
            const refreshedProfile = await UserService.getProfile();
            setProfile(refreshedProfile);
            toast.success('Profile updated successfully');
        } catch (error: any) {
            toast.error('Failed to update profile', error.message);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Invalid file type', 'Please select an image file');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File too large', 'File size must be less than 5MB');
            return;
        }

        try {
            setIsUploadingAvatar(true);
            const response = await UserService.uploadAvatar(file);

            if (profile && response.success) {
                setProfile({
                    ...profile,
                    avatar_url: response.data?.avatar_url || profile.avatar_url
                });
            }

            toast.success('Avatar uploaded successfully');
        } catch (error: any) {
            toast.error('Upload failed', error.message);
        } finally {
            setIsUploadingAvatar(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    if (isLoading) {
        return (
            <UpzellaLoader
                text='Loading profile...'
            />
        );
    }

    return (
        <div className="min-h-screen ">

            <div className="sizer">
                <div className="mb-8">
                    <h3 className="text-4xl font-bold bg-clip-text text-transparent w-fit font-montserrat bg-gradient-to-r from-blue-600 to-blue-900/95 ">
                        Profile
                    </h3>
                    <p className="text-gray-600 mt-2 font-inter">Manage your personal information and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div>
                        {/* Profile Picture Section */}
                        <div className="lg:col-span-1">
                            <Card className="p-6 text-center bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl">
                                <div className="relative inline-block">
                                    {profile?.avatar_url ? (
                                        <img
                                            src={profile.avatar_url}
                                            alt="Profile"
                                            className="h-32 w-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg ring-2 ring-blue-200"
                                        />
                                    ) : (
                                        <div className="h-32 w-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-lg ring-2 ring-blue-200">
                                            <UserIcon className="h-16 w-16 text-blue-600" />
                                        </div>
                                    )}

                                    <button
                                        onClick={triggerFileInput}
                                        disabled={isUploadingAvatar}
                                        className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                                    >
                                        {isUploadingAvatar ? (
                                            <InlineLoader size='sm' variant='processing' color='emerald' />
                                        ) : (
                                            <CameraIcon className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                    className="hidden"
                                />

                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold text-gray-900 font-outfit">{profile?.full_name}</h3>
                                    {!profile?.company && (
                                        <p className="text-blue-600 font-medium font-poppins">{profile?.job_role}</p>
                                    )}
                                    {profile?.company && (
                                        <div className='flex items-center justify-center space-x-1'>
                                            <p className="text-blue-600 font-medium font-poppins">{profile?.job_role}</p>
                                            <p className="text-sm text-gray-500 font-inter flex items-center">@{profile.company.name}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 text-xs text-gray-500 font-inter">
                                    <p>Upload a new avatar</p>
                                    <p>Max file size: 5MB</p>
                                    <p>Supported: JPG, PNG, WebP</p>
                                </div>
                            </Card>
                        </div>
                        {/* Account Information */}
                        <Card className="p-6 mt-6 bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 font-outfit">Account Information</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
                                        Account Status
                                    </label>
                                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full font-poppins ${profile?.is_active
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {profile?.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
                                        Verification Status
                                    </label>
                                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full font-poppins ${profile?.is_verified
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {profile?.is_verified ? 'Verified' : 'Pending'}
                                    </span>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
                                        Member Since
                                    </label>
                                    <p className="text-sm text-gray-900 font-inter">
                                        {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
                                        Last Updated
                                    </label>
                                    <p className="text-sm text-gray-900 font-inter">
                                        {profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Profile Information Section */}
                    <div className="lg:col-span-2">
                        <Card className="p-6 bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 font-outfit">Personal Information</h2>

                            <div className="space-y-6">
                                <div>

                                    <Input
                                        type="text"
                                        label='Full Name'
                                        value={formData.full_name}
                                        onChange={(e) => handleInputChange('full_name', e.target.value)}
                                        placeholder="Enter your full name"
                                        className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <div>

                                    <Input
                                        type="email"
                                        label='Email Address'
                                        value={profile?.email || ''}
                                        disabled
                                        readOnly
                                    // className="w-full bg-gray-50 cursor-not-allowed border-gray-200"
                                    />
                                    <p className="text-xs text-gray-500 mt-1 font-inter">
                                        Email cannot be changed. Contact support if you need to update your email.
                                    </p>
                                </div>

                                <div>

                                    <Input
                                        type="tel"
                                        label='Phone Number'
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        placeholder="Enter your phone number"
                                        className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <div>

                                    <Input
                                        type="text"
                                        label='Job Role'
                                        value={formData.job_role}
                                        onChange={(e) => handleInputChange('job_role', e.target.value)}
                                        placeholder="Enter your job role"
                                        className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="pt-4">
                                    <Button
                                        onClick={handleUpdateProfile}
                                        disabled={isUpdating}
                                        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none font-poppins"
                                        leftIcon={<SaveIcon className="h-4 w-4" />}
                                    >
                                        {isUpdating ? (
                                            <>
                                                <InlineLoader size='sm' variant='dots' text='Updating...' />
                                            </>
                                        ) : (
                                            <>

                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </Card>


                    </div>
                </div>
            </div>
        </div>
    );
}
