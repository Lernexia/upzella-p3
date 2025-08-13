'use client';

import { useState } from 'react';
import { Button } from '@/components/ui-components/Button';
import { Select } from '@/components/ui-components/Select';
import { Badge } from '@/components/ui-components/Badge';
// Import all SVG icons
import AIIcon from '@/components/svg-icons/AIIcon';
import ArrowLeftIcon from '@/components/svg-icons/ArrowLeftIcon';
import ArrowRightIcon from '@/components/svg-icons/ArrowRightIcon';
import AudioIcon from '@/components/svg-icons/AudioIcon';
import ButtonIcon from '@/components/svg-icons/ButtonIcon';
import CalendarIcon from '@/components/svg-icons/CalendarIcon';
import CheckIcon from '@/components/svg-icons/CheckIcon';
import ChevronDownIcon from '@/components/svg-icons/ChevronDownIcon';
import ChevronUpIcon from '@/components/svg-icons/ChevronUpIcon';
import ClockIcon from '@/components/svg-icons/ClockIcon';
import CodeIcon from '@/components/svg-icons/CodeIcon';
import CompanyIcon from '@/components/svg-icons/CompanyIcon';
import CopyIcon from '@/components/svg-icons/CopyIcon';
import CrossIcon from '@/components/svg-icons/CrossIcon';
import CurrencyIcon from '@/components/svg-icons/CurrencyIcon';
import DeleteIcon from '@/components/svg-icons/DeleteIcon';
import DesignIcon from '@/components/svg-icons/DesignIcon';
import DocumentIcon from '@/components/svg-icons/DocumentIcon';
import DropdownIcon from '@/components/svg-icons/DropdownIcon';
import EditIcon from '@/components/svg-icons/EditIcon';
import EmailIcon from '@/components/svg-icons/EmailIcon';
import ExternalLinkIcon from '@/components/svg-icons/ExternalLinkIcon';
import FaceIcon from '@/components/svg-icons/FaceIcon';
import FileIcon from '@/components/svg-icons/FileIcon';
import FilterIcon from '@/components/svg-icons/FilterIcon';
import GitHubIcon from '@/components/svg-icons/GitHubIcon';
import GripVerticalIcon from '@/components/svg-icons/GripVerticalIcon';
import HelpIcon from '@/components/svg-icons/HelpIcon';
import HireIcon from '@/components/svg-icons/HireIcon';
import InputIcon from '@/components/svg-icons/InputIcon';
import JobIcon from '@/components/svg-icons/JobIcon';
import LinkedInIcon from '@/components/svg-icons/LinkedInIcon';
import LoadingIcon from '@/components/svg-icons/LoadingIcon';
import LocationIcon from '@/components/svg-icons/LocationIcon';
import LogoutIcon from '@/components/svg-icons/LogoutIcon';
import MessageIcon from '@/components/svg-icons/MessageIcon';
import NavigationIcon from '@/components/svg-icons/NavigationIcon';
import NumberIcon from '@/components/svg-icons/NumberIcon';
import PhoneIcon from '@/components/svg-icons/PhoneIcon';
import { PlusIcon } from '@/components/svg-icons/PlusIcon';
import RadioIcon from '@/components/svg-icons/RadioIcon';
import ReferralIcon from '@/components/svg-icons/ReferralIcon';
import RotateAcwIcon from '@/components/svg-icons/RotateAcwIcon';
import RotateCwIcon from '@/components/svg-icons/RotateCwIcon';
import SalaryIcon from '@/components/svg-icons/SalaryIcon';
import SaveIcon from '@/components/svg-icons/SaveIcon';
import SearchIcon from '@/components/svg-icons/SearchIcon';
import SecurityIcon from '@/components/svg-icons/SecurityIcon';
import SendIcon from '@/components/svg-icons/SendIcon';
import SettingsIcon from '@/components/svg-icons/SettingsIcon';
import ShareIcon from '@/components/svg-icons/ShareIcon';
import ShieldIcon from '@/components/svg-icons/ShieldIcon';
import SortIcon from '@/components/svg-icons/SortIcon';
import SparkleIcon from '@/components/svg-icons/SparkleIcon';
import StarIcon from '@/components/svg-icons/StarIcon';
import TabSwitchIcon from '@/components/svg-icons/TabSwitchIcon';
import TextAreaIcon from '@/components/svg-icons/TextAreaIcon';
import TextIcon from '@/components/svg-icons/TextIcon';
import ToolsIcon from '@/components/svg-icons/ToolsIcon';
import TrendDownIcon from '@/components/svg-icons/TrendDownIcon';
import TrendUpIcon from '@/components/svg-icons/TrendUpIcon';
import UploadIcon from '@/components/svg-icons/UploadIcon';
import UserIcon from '@/components/svg-icons/UserIcon';
import VideoIcon from '@/components/svg-icons/VideoIcon';
import ViewIcon from '@/components/svg-icons/ViewIcon';
import WarningIcon from '@/components/svg-icons/WarningIcon';
import WebsiteIcon from '@/components/svg-icons/WebsiteIcon';
import XIcon from '@/components/svg-icons/XIcon';
import StatsContainer from '@/components/ui-components/StatsContainer';

const iconComponents = [
    { name: 'AIIcon', component: AIIcon, category: 'Technology' },
    { name: 'ArrowLeftIcon', component: ArrowLeftIcon, category: 'Navigation' },
    { name: 'ArrowRightIcon', component: ArrowRightIcon, category: 'Navigation' },
    { name: 'AudioIcon', component: AudioIcon, category: 'Media' },
    { name: 'ButtonIcon', component: ButtonIcon, category: 'Interface' },
    { name: 'CalendarIcon', component: CalendarIcon, category: 'Time' },
    { name: 'CheckIcon', component: CheckIcon, category: 'Status' },
    { name: 'ChevronDownIcon', component: ChevronDownIcon, category: 'Navigation' },
    { name: 'ChevronUpIcon', component: ChevronUpIcon, category: 'Navigation' },
    { name: 'ClockIcon', component: ClockIcon, category: 'Time' },
    { name: 'CodeIcon', component: CodeIcon, category: 'Technology' },
    { name: 'CompanyIcon', component: CompanyIcon, category: 'Business' },
    { name: 'CopyIcon', component: CopyIcon, category: 'Actions' },
    { name: 'CrossIcon', component: CrossIcon, category: 'Actions' },
    { name: 'CurrencyIcon', component: CurrencyIcon, category: 'Finance' },
    { name: 'DeleteIcon', component: DeleteIcon, category: 'Actions' },
    { name: 'DesignIcon', component: DesignIcon, category: 'Creative' },
    { name: 'DocumentIcon', component: DocumentIcon, category: 'Files' },
    { name: 'DropdownIcon', component: DropdownIcon, category: 'Interface' },
    { name: 'EditIcon', component: EditIcon, category: 'Actions' },
    { name: 'EmailIcon', component: EmailIcon, category: 'Communication' },
    { name: 'ExternalLinkIcon', component: ExternalLinkIcon, category: 'Navigation' },
    { name: 'FaceIcon', component: FaceIcon, category: 'People' },
    { name: 'FileIcon', component: FileIcon, category: 'Files' },
    { name: 'FilterIcon', component: FilterIcon, category: 'Interface' },
    { name: 'GitHubIcon', component: GitHubIcon, category: 'Social' },
    { name: 'GripVerticalIcon', component: GripVerticalIcon, category: 'Interface' },
    { name: 'HelpIcon', component: HelpIcon, category: 'Support' },
    { name: 'HireIcon', component: HireIcon, category: 'Business' },
    { name: 'InputIcon', component: InputIcon, category: 'Interface' },
    { name: 'JobIcon', component: JobIcon, category: 'Business' },
    { name: 'LinkedInIcon', component: LinkedInIcon, category: 'Social' },
    { name: 'LoadingIcon', component: LoadingIcon, category: 'Status' },
    { name: 'LocationIcon', component: LocationIcon, category: 'Location' },
    { name: 'LogoutIcon', component: LogoutIcon, category: 'Actions' },
    { name: 'MessageIcon', component: MessageIcon, category: 'Communication' },
    { name: 'NavigationIcon', component: NavigationIcon, category: 'Navigation' },
    { name: 'NumberIcon', component: NumberIcon, category: 'Interface' },
    { name: 'PhoneIcon', component: PhoneIcon, category: 'Communication' },
    { name: 'PlusIcon', component: PlusIcon, category: 'Actions' },
    { name: 'RadioIcon', component: RadioIcon, category: 'Interface' },
    { name: 'ReferralIcon', component: ReferralIcon, category: 'Business' },
    { name: 'RotateAcwIcon', component: RotateAcwIcon, category: 'Actions' },
    { name: 'RotateCwIcon', component: RotateCwIcon, category: 'Actions' },
    { name: 'SalaryIcon', component: SalaryIcon, category: 'Finance' },
    { name: 'SaveIcon', component: SaveIcon, category: 'Actions' },
    { name: 'SearchIcon', component: SearchIcon, category: 'Interface' },
    { name: 'SecurityIcon', component: SecurityIcon, category: 'Security' },
    { name: 'SendIcon', component: SendIcon, category: 'Communication' },
    { name: 'SettingsIcon', component: SettingsIcon, category: 'Interface' },
    { name: 'ShareIcon', component: ShareIcon, category: 'Actions' },
    { name: 'ShieldIcon', component: ShieldIcon, category: 'Security' },
    { name: 'SortIcon', component: SortIcon, category: 'Interface' },
    { name: 'SparkleIcon', component: SparkleIcon, category: 'Creative' },
    { name: 'StarIcon', component: StarIcon, category: 'Status' },
    { name: 'TabSwitchIcon', component: TabSwitchIcon, category: 'Interface' },
    { name: 'TextAreaIcon', component: TextAreaIcon, category: 'Interface' },
    { name: 'TextIcon', component: TextIcon, category: 'Interface' },
    { name: 'ToolsIcon', component: ToolsIcon, category: 'Technology' },
    { name: 'TrendDownIcon', component: TrendDownIcon, category: 'Analytics' },
    { name: 'TrendUpIcon', component: TrendUpIcon, category: 'Analytics' },
    { name: 'UploadIcon', component: UploadIcon, category: 'Actions' },
    { name: 'UserIcon', component: UserIcon, category: 'People' },
    { name: 'VideoIcon', component: VideoIcon, category: 'Media' },
    { name: 'ViewIcon', component: ViewIcon, category: 'Actions' },
    { name: 'WarningIcon', component: WarningIcon, category: 'Status' },
    { name: 'WebsiteIcon', component: WebsiteIcon, category: 'Technology' },
    { name: 'XIcon', component: XIcon, category: 'Actions' },
];

const categories = Array.from(new Set(iconComponents.map(icon => icon.category))).sort();

export default function SVGIconsTestPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [animateIcons, setAnimateIcons] = useState(false);
    const [iconSize, setIconSize] = useState(24);

    // Convert categories to options for Select
    const categoryOptions = [
        { label: `All Categories (${iconComponents.length})`, value: 'All' },
        ...categories.map(category => ({
            label: `${category} (${iconComponents.filter(icon => icon.category === category).length})`,
            value: category
        }))
    ];

    const filteredIcons = selectedCategory === 'All'
        ? iconComponents
        : iconComponents.filter(icon => icon.category === selectedCategory);

    return (
        <div className="min-h-screen ">
            <div className="sizer">
                <div className="text-center mb-16 pt-16">
                    <h1 className="font-heading text-4xl font-bold text-gradient mb-4">
                        SVG Icons
                    </h1>
                    <p className="font-title text-xl text-gray-700 mb-6">
                        Complete icon library with categories and interactive preview
                    </p>

                    {/* Controls */}
                    <div className="flex flex-wrap items-center gap-6 mb-8">
                        {/* Category Filter */}

                        <div className="flex items-center gap-2">
                            <label className="font-accent text-sm text-gray-600">Category:</label>
                            <Select
                                value={selectedCategory}
                                onChange={(val: string) => setSelectedCategory(val)}
                                placeholder="Select category"
                                options={categoryOptions}
                            />
                        </div>

                        {/* Size Control */}
                        <div className="flex items-center gap-2">
                            <label className="font-accent text-sm text-gray-600">Size:</label>
                            <input
                                type="range"
                                min={16}
                                max={48}
                                value={iconSize}
                                onChange={e => setIconSize(Number(e.target.value))}
                                className="w-20"
                            />
                            <span className="font-mono text-sm text-gray-500 w-8">{iconSize}px</span>
                        </div>

                        {/* Animation Toggle */}
                        <div className="flex items-center gap-2">
                            <label className="font-accent text-sm text-gray-600">Animate:</label>
                            <Button
                                variant={animateIcons ? 'primary' : 'secondary'}
                                size="sm"
                                onClick={() => setAnimateIcons(a => !a)}
                            >
                                {animateIcons ? 'ON' : 'OFF'}
                            </Button>
                        </div>
                    </div>

                    {/* Stats */}
                    <StatsContainer
                    cols={4}
                        stats={[
                            {
                                id: 'total-icons',
                                label: 'Total Icons',
                                value: filteredIcons.length,
                                icon: StarIcon,
                                colorVariant: 'blue',
                            },
                            {
                                id: 'categories',
                                label: 'Categories',
                                value: categories.length,
                                icon: SparkleIcon,
                                colorVariant: 'purple',
                            },
                            {
                                id: 'current-size',
                                label: 'Current Size',
                                value: `${iconSize}px`,
                                icon: SettingsIcon,
                                colorVariant: 'red',
                            },
                            {
                                id: 'format',
                                label: 'Format',
                                value: 'SVG',
                                icon: CodeIcon,
                                colorVariant: 'green',
                            },
                        ]}
                    />

                    {/* Icon Count */}

                </div>

                <div className="page-content">
                    {/* Icons Grid */}
                    <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredIcons.map(({ name, component: IconComponent, category }) => (
                            <div
                                key={name}
                                className={`card hover:shadow-lg transition-all duration-300 text-center group cursor-pointer ${animateIcons ? 'hover:scale-105' : ''
                                    }`}
                                onClick={() => {
                                    navigator.clipboard.writeText(`<${name} />`);
                                }}
                            >
                                <div className="flex justify-center mb-4">
                                    <div
                                        className={`rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 transition-all duration-300 flex items-center justify-center ${animateIcons ? 'group-hover:rotate-12 group-hover:scale-110' : ''}`}
                                        style={{ width: iconSize + 24, height: iconSize + 24 }}
                                    >
                                        <IconComponent
                                            size={iconSize}
                                            animate={animateIcons}
                                            className={`text-gray-700 transition-colors duration-300 ${animateIcons ? 'group-hover:text-blue-600' : ''}`}
                                        />
                                    </div>
                                </div>

                                <h3 className="font-mono text-sm font-medium text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                    {name}
                                </h3>

                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <Badge
                                        variant={
                                            category === 'Technology' ? 'info' :
                                                category === 'Navigation' ? 'secondary' :
                                                    category === 'Actions' ? 'success' :
                                                        category === 'Interface' ? 'warning' :
                                                            category === 'Communication' ? 'primary' :
                                                                category === 'Status' ? 'error' :
                                                                    'default'
                                        }
                                        size="sm"
                                    >
                                        {category}
                                    </Badge>
                                </div>

                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="font-body text-xs text-gray-500">
                                        Click to copy code
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredIcons.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="font-title text-xl text-gray-600 mb-2">No icons found</h3>
                            <p className="font-body text-gray-500">
                                Try selecting a different category or search term.
                            </p>
                        </div>
                    )}

                    {/* Usage Examples */}
                    <div className="mt-16">
                        <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Usage Examples</h2>

                        <div className="grid md:grid-2 gap-8">
                            {/* Basic Usage */}
                            <div className="card">
                                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Basic Usage</h3>
                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <pre className="font-mono text-sm text-gray-700 overflow-x-auto">
{`import { SearchIcon } from '@/components/svg-icons/SearchIcon';

<SearchIcon 
  size={24} 
  className="text-blue-600" 
/>`}
                                    </pre>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                                    <SearchIcon size={24} className="text-blue-600" />
                                    <span className="font-body text-gray-700">Search Icon Example</span>
                                </div>
                            </div>

                            {/* In Buttons */}
                            <div className="card">
                                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">In Buttons</h3>
                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <pre className="font-mono text-sm text-gray-700 overflow-x-auto">
{`import { Button } from '@/components/ui-components/Button';
import { PlusIcon } from '@/components/svg-icons/PlusIcon';

<Button variant="primary">
  <PlusIcon size={16} />
  Add Item
</Button>`}
                                    </pre>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="primary">
                                        <PlusIcon size={16} />
                                        Add Item
                                    </Button>
                                    <Button variant="secondary">
                                        <EditIcon size={16} />
                                        Edit
                                    </Button>
                                    <Button variant="danger">
                                        <DeleteIcon size={16} />
                                        Delete
                                    </Button>
                                </div>
                            </div>

                            {/* Animated Icon Example */}
                            <div className="card">
                                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Animated Icon</h3>
                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <pre className="font-mono text-sm text-gray-700 overflow-x-auto">
{`import { AIIcon } from '@/components/svg-icons/AIIcon';

<AIIcon size={32} animate />`}
                                    </pre>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                                    <AIIcon size={32} animate />
                                    <span className="font-body text-gray-700">AI Icon Animated</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
