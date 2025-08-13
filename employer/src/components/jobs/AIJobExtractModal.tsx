'use client';

import { useState, useRef } from 'react';
import { Modal } from '@/components/ui-components/Modal';
import { Button } from '@/components/ui-components/Button';
import { Card } from '@/components/ui-components/Card';
import { Badge } from '@/components/ui-components/Badge';
import { Textarea } from '@/components/ui-components/Textarea';
import { EnhancedTabs } from '@/components/ui-components/EnhancedTabs';
import {
    UploadIcon,
    FileIcon,
    CheckIcon,
    CrossIcon,
    AIIcon,
    LoadingIcon,
    DocumentIcon
} from '@/components/svg-icons';
import { useToast } from '@/hooks/useToast';
import { JobService } from '@/services/job.service';
import { useAuth } from '@/context/AuthContext';
import { InlineLoader } from '../ui-components/loader';

interface AIJobExtractModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (extractedData: any) => void;
}

export function AIJobExtractModal({ isOpen, onClose, onSuccess }: AIJobExtractModalProps) {
    const { user } = useAuth();
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [activeTab, setActiveTab] = useState('upload');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [pastedText, setPastedText] = useState<string>('');
    const [isUploading, setIsUploading] = useState(false);
    const [isExtracting, setIsExtracting] = useState(false);
    const [extractedData, setExtractedData] = useState<any>(null);
    const [originalText, setOriginalText] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isDragActive, setIsDragActive] = useState(false);

    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const maxFileSize = 10 * 1024 * 1024; // 10MB

    const tabs = [
        {
            id: 'upload',
            name: 'Upload File',
            icon: UploadIcon
        },
        {
            id: 'paste',
            name: 'Paste Text',
            icon: DocumentIcon
        }
    ];



    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setError(null);

        if (!file) return;

        // Validate file type
        if (!allowedTypes.includes(file.type)) {
            setError('Please select a PDF, DOCX, or TXT file.');
            return;
        }

        // Validate file size
        if (file.size > maxFileSize) {
            setError('File size must be less than 10MB.');
            return;
        }

        setSelectedFile(file);
    };

    // Drag and drop handlers
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(false);
        setError(null);
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0];
            // Validate file type
            if (!allowedTypes.includes(file.type)) {
                setError('Please select a PDF, DOCX, or TXT file.');
                return;
            }
            // Validate file size
            if (file.size > maxFileSize) {
                setError('File size must be less than 10MB.');
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(false);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleExtractData = async () => {
        if (!user?.company_id) {
            toast.error('Please ensure you are logged in.');
            return;
        }

        let textContent = '';

        if (activeTab === 'upload') {
            if (!selectedFile) {
                toast.error('Please select a file.');
                return;
            }
        } else if (activeTab === 'paste') {
            if (!pastedText.trim()) {
                toast.error('Please paste some job description text.');
                return;
            }
            textContent = pastedText.trim();
        }

        setIsExtracting(true);
        setError(null);

        try {
            // Step 1: Get text content
            if (activeTab === 'upload') {
                toast.info('Extracting text from file...');

                let formData = new FormData();
                formData.append('file', selectedFile!);

                const response = await fetch('/api/extract-file', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to extract text from file.');
                }

                const extractResponse = await response.json();
                textContent = extractResponse.text;
            } else {
                toast.info('Processing pasted text...');
            }

            if (!textContent || textContent.length < 50) {
                throw new Error('The content appears to be empty or contains insufficient text.');
            }

            // Step 2: Send extracted text to backend for AI processing
            toast.info('Processing text with AI...');
            const result = await JobService.extractJobFromText(textContent);

            // Store the original text and the extracted data
            setOriginalText(textContent);
            setExtractedData(result);

            // Include the original text in the extracted data and pass it immediately
            const dataWithOriginalText = {
                ...result, // Use result instead of extractedData which might not be updated yet
                original_job_description_text: textContent // Use textContent which is available
            };

            console.log('Extracted data to pass to form:', dataWithOriginalText);

            toast.success('Job details have been extracted successfully!');
            
            // Pass the data to the parent component
            onSuccess(dataWithOriginalText);
            handleClose();
        } catch (error: any) {
            console.error('Error extracting job data:', error);
            setError(error.message || 'Failed to extract job details. Please try again.');
            toast.error(error.message || 'Failed to extract job details from the content.');
        } finally {
            setIsExtracting(false);
        }
    };

    const handleClose = () => {
        setSelectedFile(null);
        setPastedText('');
        setExtractedData(null);
        setOriginalText('');
        setError(null);
        setIsExtracting(false);
        setActiveTab('upload');
        onClose();
    };


    const getFileIcon = (file: File) => {
        if (file.type === 'application/pdf') return '📄';
        if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return '📝';
        if (file.type === 'text/plain') return '📃';
        return '📎';
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="lg" title='AI Job Auto-Fill' classNameBody='p-0 m-0' className='border-none'>
            <div className="p-0">

                <div className="p-6 ">
                    <div className="space-y-6">
                        <EnhancedTabs
                            tabs={tabs.map(tab => ({ ...tab, icon: undefined }))} // Remove icons from tabs
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            variant="enhanced"
                            className='w-full '
                        >
                            {activeTab === 'upload' && (
                                <div className="space-y-4">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf,.docx,.txt"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />

                                    {!selectedFile ? (
                                        <div
                                            onClick={handleUploadClick}
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer group ${isDragActive ? 'border-blue-400 bg-blue-50/50' : 'border-slate-300'} ${isDragActive ? 'animate-pulse' : ''}`}
                                        >
                                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDragActive ? 'bg-blue-100' : 'bg-slate-100'} transition-colors`}>
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDragActive ? 'bg-blue-400' : 'bg-slate-300'} transition-colors`}>
                                                    <span className="text-white text-sm">📄</span>
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Upload or Drag & Drop Job Description</h3>
                                            <p className="text-slate-600 mb-4 max-w-md mx-auto">
                                                {isDragActive ? 'Drop your file here...' : 'Select or drag a PDF, DOCX, or TXT file for AI analysis.'}
                                                <p className="text-xs text-slate-500">
                                                    Max size: 10MB • AI processes content instantly
                                                </p>
                                            </p>
                                            <Button variant="outline" className="mx-auto">
                                                Select File
                                            </Button>
                                        </div>
                                    ) : (
                                        <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                        <span className="text-lg">{getFileIcon(selectedFile)}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-900">{selectedFile.name}</p>
                                                        <p className="text-sm text-slate-500">
                                                            {(selectedFile.size / 1024).toFixed(1)} KB
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setSelectedFile(null)}
                                                    className="text-slate-500 hover:text-red-500"
                                                >
                                                    ✕
                                                </Button>
                                            </div>
                                        </Card>
                                    )}
                                </div>
                            )}

                            {activeTab === 'paste' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                                            Job Description Text
                                        </label>
                                        <Textarea
                                            value={pastedText}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPastedText(e.target.value)}
                                            placeholder="Paste your complete job description text here for AI analysis..."
                                            rows={12}
                                            className="w-full resize-none border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                                        />
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-xs text-slate-500">
                                                Minimum 50 characters required
                                            </p>
                                            <p className="text-xs text-slate-600 font-medium">
                                                {pastedText.length} characters
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </EnhancedTabs>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <span className="text-red-500">⚠️</span>
                                    <p className="text-sm text-red-600 font-medium">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 pt-4 border-t border-black/20">
                            <Button variant="outline" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleExtractData}
                                disabled={(activeTab === 'upload' && !selectedFile) || (activeTab === 'paste' && !pastedText.trim()) || isExtracting}
                                className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black"
                            >
                                {isExtracting ? (
                                    <>
                                        <InlineLoader size="sm" className="mr-2" text='Extracting...' />
                                    </>
                                ) : (
                                    <>
                                        Extract Job Details
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </Modal>
    );
}