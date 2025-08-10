'use client';

import { useState, useRef } from 'react';
import { Modal } from '@/components/ui-components/Modal';
import { Button } from '@/components/ui-components/Button';
import { Card } from '@/components/ui-components/Card';
import { Badge } from '@/components/ui-components/Badge';
import {
    UploadIcon,
    FileIcon,
    CheckIcon,
    CrossIcon,
    AIIcon,
    LoadingIcon
} from '@/components/svg-icons';
import { useToast } from '@/hooks/useToast';
import { JobService } from '@/services/job.service';
import { useAuth } from '@/context/AuthContext';
import { InlineLoader } from '../ui-components/loader';
import mammoth from 'mammoth';

interface AIJobExtractModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (extractedData: any) => void;
}

export function AIJobExtractModal({ isOpen, onClose, onSuccess }: AIJobExtractModalProps) {
    const { user } = useAuth();
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isExtracting, setIsExtracting] = useState(false);
    const [extractedData, setExtractedData] = useState<any>(null);
    const [originalText, setOriginalText] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const maxFileSize = 10 * 1024 * 1024; // 10MB

    // Text extraction functions
    const extractTextFromPDF = async (file: File): Promise<string> => {
        try {
            // Dynamically import PDF.js only on client side
            const pdfjsLib = await import('pdfjs-dist');
            
            // Configure worker
            if (typeof window !== 'undefined') {
                pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
            }

            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let fullText = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items
                    .map((item: any) => item.str)
                    .join(' ');
                fullText += pageText + '\n';
            }

            return fullText.trim();
        } catch (error) {
            throw new Error('Failed to extract text from PDF file');
        }
    };

    const extractTextFromDocx = async (file: File): Promise<string> => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.extractRawText({ arrayBuffer });
            return result.value.trim();
        } catch (error) {
            throw new Error('Failed to extract text from DOCX file');
        }
    };

    const extractTextFromTxt = async (file: File): Promise<string> => {
        try {
            const text = await file.text();
            return text.trim();
        } catch (error) {
            throw new Error('Failed to read text file');
        }
    };

    const extractTextFromFile = async (file: File): Promise<string> => {
        switch (file.type) {
            case 'application/pdf':
                return await extractTextFromPDF(file);
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return await extractTextFromDocx(file);
            case 'text/plain':
                return await extractTextFromTxt(file);
            default:
                throw new Error('Unsupported file type');
        }
    };

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

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleExtractData = async () => {
        if (!selectedFile || !user?.company_id) {
            toast.error('Please select a file and ensure you are logged in.');
            return;
        }

        setIsExtracting(true);
        setError(null);

        try {
            // Step 1: Extract text from file in frontend
            toast.info('Extracting text from file...');
            const extractedText = await extractTextFromFile(selectedFile);

            if (!extractedText || extractedText.length < 50) {
                throw new Error('The file appears to be empty or contains insufficient text content.');
            }

            // Step 2: Send extracted text to backend for AI processing
            toast.info('Processing text with AI...');
            const result = await JobService.extractJobFromText(extractedText);
            
            // Store the original text and the extracted data
            setOriginalText(extractedText);
            setExtractedData(result);

            toast.success('Job details have been extracted successfully!');
        } catch (error: any) {
            console.error('Error extracting job data:', error);
            setError(error.message || 'Failed to extract job details. Please try again.');
            toast.error(error.message || 'Failed to extract job details from the file.');
        } finally {
            setIsExtracting(false);
        }
    };

    const handleUseExtractedData = () => {
        if (extractedData) {
            // Include the original text in the extracted data
            const dataWithOriginalText = {
                ...extractedData,
                original_job_description_text: originalText
            };
            onSuccess(dataWithOriginalText);
            handleClose();
        }
    };

    const handleClose = () => {
        setSelectedFile(null);
        setExtractedData(null);
        setOriginalText('');
        setError(null);
        setIsExtracting(false);
        onClose();
    };

    const getFileIcon = (file: File) => {
        if (file.type === 'application/pdf') return '📄';
        if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return '📝';
        if (file.type === 'text/plain') return '📃';
        return '📎';
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="lg">
            <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                        <AIIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">AI Job Extraction</h2>
                        <p className="text-slate-600">Upload a job description file and let AI extract the details automatically.</p>
                    </div>
                </div>

                {!extractedData ? (
                    <div className="space-y-6">
                        {/* File Upload Area */}
                        <div>
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
                                    className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
                                >
                                    <UploadIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Upload Job Description</h3>
                                    <p className="text-slate-600 mb-4">
                                        Click to select a PDF, DOCX, or TXT file containing the job description.
                                    </p>
                                    <Button variant="outline">
                                        Select File
                                    </Button>
                                </div>
                            ) : (
                                <Card className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">{getFileIcon(selectedFile)}</span>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-slate-900">{selectedFile.name}</h4>
                                            <p className="text-sm text-slate-600">
                                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setSelectedFile(null)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <CrossIcon className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </Card>
                            )}

                            {error && (
                                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}
                        </div>

                        {/* Supported Formats */}
                        <div className="bg-slate-50 rounded-lg p-4">
                            <h4 className="font-semibold text-slate-900 mb-2">Supported Formats</h4>
                            <div className="flex flex-wrap gap-2">
                                <Badge>PDF</Badge>
                                <Badge>DOCX</Badge>
                                <Badge>TXT</Badge>
                            </div>
                            <p className="text-sm text-slate-600 mt-2">
                                Maximum file size: 10MB
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3">
                            <Button variant="outline" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleExtractData}
                                disabled={!selectedFile || isExtracting}
                                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                            >
                                {isExtracting ? (
                                    <>
                                        <InlineLoader size="sm" className="mr-2" text='Extracting...' />

                                    </>
                                ) : (
                                    <>
                                        <AIIcon className="w-4 h-4 mr-2" />
                                        Extract Job Details
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Extraction Success */}
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckIcon className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Extraction Complete!</h3>
                            <p className="text-slate-600">
                                AI has successfully extracted job details from your file. Review the information below.
                            </p>
                        </div>

                        {/* Extracted Data Preview */}
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            <Card className="p-4">
                                <h4 className="font-semibold text-slate-900 mb-2">Job Title</h4>
                                <p className="text-slate-700">{extractedData.job_title}</p>
                            </Card>

                            <Card className="p-4">
                                <h4 className="font-semibold text-slate-900 mb-2">Description</h4>
                                <p className="text-slate-700 text-sm line-clamp-3">{extractedData.job_description}</p>
                            </Card>

                            <div className="grid md:grid-cols-2 gap-4">
                                <Card className="p-4">
                                    <h4 className="font-semibold text-slate-900 mb-2">Skills Required</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {extractedData.skills_required?.slice(0, 5).map((skill: string, index: number) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                        {extractedData.skills_required?.length > 5 && (
                                            <Badge className="text-xs">
                                                +{extractedData.skills_required.length - 5} more
                                            </Badge>
                                        )}
                                    </div>
                                </Card>

                                <Card className="p-4">
                                    <h4 className="font-semibold text-slate-900 mb-2">Work Type</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {extractedData.work_type?.map((type: string, index: number) => (
                                            <Badge key={index} variant="primary" className="text-xs">
                                                {type}
                                            </Badge>
                                        ))}
                                    </div>
                                </Card>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <Card className="p-4">
                                    <h4 className="font-semibold text-slate-900 mb-2">Employment Type</h4>
                                    <Badge >{extractedData.employment_type}</Badge>
                                </Card>

                                <Card className="p-4">
                                    <h4 className="font-semibold text-slate-900 mb-2">Experience Range</h4>
                                    <p className="text-slate-700">
                                        {extractedData.experience_range?.min}-{extractedData.experience_range?.max} years
                                    </p>
                                </Card>

                                <Card className="p-4">
                                    <h4 className="font-semibold text-slate-900 mb-2">Resume Threshold</h4>
                                    <p className="text-slate-700">{extractedData.resume_threshold}%</p>
                                </Card>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3">
                            <Button variant="outline" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleUseExtractedData}
                                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
                            >
                                <CheckIcon className="w-4 h-4 mr-2" />
                                Use This Data
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}
