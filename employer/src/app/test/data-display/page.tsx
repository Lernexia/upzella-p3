'use client';

import { Badge } from '@/components/ui-components/Badge';
import { StatsContainer } from '@/components/ui-components/StatsContainer';
import { Table } from '@/components/ui-components/Table';
import { Button } from '@/components/ui-components/Button';
import { BasicSelect } from '@/components/ui-components';
import { Input } from '@/components/ui-components/Input';
import { Card } from '@/components/ui-components/Card';
import ViewIcon from '@/components/svg-icons/ViewIcon';
import EditIcon from '@/components/svg-icons/EditIcon';
import DeleteIcon from '@/components/svg-icons/DeleteIcon';
import UserIcon from '@/components/svg-icons/UserIcon';
import TrendUpIcon from '@/components/svg-icons/TrendUpIcon';
import TrendDownIcon from '@/components/svg-icons/TrendDownIcon';
import { SearchIcon, FilterIcon, CalendarIcon, LocationIcon, CompanyIcon, SalaryIcon } from '@/components/svg-icons';
import { useState } from 'react';

export default function DataDisplayTestPage() {
  // Table/filter variables
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [page, setPage] = useState(1);

  const tableData = [
    {
      id: 1,
      name: 'John Smith',
      position: 'Senior Frontend Developer',
      status: 'Active',
      salary: '$95,000',
      experience: '5 years',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Node.js'],
      location: 'San Francisco, CA',
      company: 'TechCorp Inc.',
      joined: '2024-01-15',
      workType: ['Remote', 'Hybrid']
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Backend Developer',
      status: 'Interview',
      salary: '$87,000',
      experience: '3 years',
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
      location: 'New York, NY',
      company: 'StartupXYZ',
      joined: '2024-02-20',
      workType: ['On-site']
    },
    {
      id: 3,
      name: 'Mike Wilson',
      position: 'Full Stack Developer',
      status: 'Pending',
      salary: '$82,000',
      experience: '4 years',
      skills: ['JavaScript', 'Vue.js', 'Express', 'MongoDB'],
      location: 'Austin, TX',
      company: 'InnovateLab',
      joined: '2024-03-10',
      workType: ['Remote']
    },
    {
      id: 4,
      name: 'Emily Davis',
      position: 'DevOps Engineer',
      status: 'Active',
      salary: '$105,000',
      experience: '6 years',
      skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
      location: 'Seattle, WA',
      company: 'CloudSystems',
      joined: '2023-11-05',
      workType: ['Hybrid', 'Remote']
    },
    {
      id: 5,
      name: 'David Brown',
      position: 'UI/UX Designer',
      status: 'Rejected',
      salary: '$78,000',
      experience: '2 years',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      location: 'Los Angeles, CA',
      company: 'DesignHub',
      joined: '2024-04-18',
      workType: ['On-site', 'Hybrid']
    },
    {
      id: 6,
      name: 'Lisa Chen',
      position: 'Data Scientist',
      status: 'Active',
      salary: '$110,000',
      experience: '7 years',
      skills: ['Python', 'R', 'TensorFlow', 'SQL'],
      location: 'Boston, MA',
      company: 'DataCorp',
      joined: '2023-09-12',
      workType: ['Remote', 'Hybrid']
    }
  ];

  const colorSchemes: ('purple' | 'blue' | 'pink' | 'slate' | 'gradient')[] = ['purple', 'blue', 'pink', 'slate', 'gradient'];
  const variants: ('default' | 'bordered' | 'striped' | 'minimal' | 'glass' | 'professional')[] = ['default', 'bordered', 'striped', 'minimal', 'glass', 'professional'];

  const statsData = [
    {
      id: 'total-applications',
      label: 'Total Applications',
      value: '2,847',
      trendValue: '+12%',
      trending: 'up' as const,
      icon: UserIcon,
      colorVariant: 'blue' as const,
    },
    {
      id: 'pending-reviews',
      label: 'Pending Reviews',
      value: '145',
      trendValue: '+8',
      trending: 'up' as const,
      icon: CalendarIcon,
      colorVariant: 'amber' as const,
    },
    {
      id: 'interviews-scheduled',
      label: 'Interviews Scheduled',
      value: '28',
      trendValue: '+5',
      trending: 'up' as const,
      icon: CalendarIcon,
      colorVariant: 'green' as const,
    },
    {
      id: 'success-rate',
      label: 'Success Rate',
      value: '78%',
      trendValue: '+3%',
      trending: 'up' as const,
      icon: TrendUpIcon,
      colorVariant: 'purple' as const,
    },
  ];

  const filteredTableData = tableData.filter(candidate =>
    statusFilter === 'All Status' || candidate.status === statusFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Interview': return 'info';
      case 'Pending': return 'warning';
      case 'Rejected': return 'error';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="sizer">
        <div className="py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-heading text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
              Data Display Components
            </h1>
            <p className="font-body text-lg text-gray-600">
              Comprehensive showcase of table variants, badges, stats containers, and data visualization components with professional styling.
            </p>
          </div>

          {/* Stats Container */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Stats Overview</h2>
            <StatsContainer stats={statsData} />
          </section>

          {/* Badge Variations */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Badge Variations</h2>
            
            <Card className="p-6 mb-6">
              <h3 className="font-heading text-lg font-semibold text-gray-800 mb-4">Badge Variants</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
              </div>
              
              <h3 className="font-heading text-lg font-semibold text-gray-800 mb-4">Badge Sizes</h3>
              <div className="flex items-center gap-3">
                <Badge size="xs" variant="primary">Extra Small</Badge>
                <Badge size="sm" variant="primary">Small</Badge>
                <Badge size="md" variant="primary">Medium</Badge>
                <Badge size="lg" variant="primary">Large</Badge>
              </div>
            </Card>
          </section>

          {/* Table Variants Showcase */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Table Variants</h2>
            
            <div className="grid grid-cols-1 gap-8">
              {variants.map((variant) => (
                <Card key={variant} className="p-0">
                  <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-2 capitalize">
                      {variant} Table
                    </h3>
                    <p className="text-gray-600">
                      Example of {variant} table styling with consistent data.
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <Table
                      variant={variant}
                      colorScheme="purple"
                      size="md"
                      hoverable={true}
                      responsive={true}
                      paginated={false}
                      showColumnLines={true}
                      showRowLines={true}
                      className="shadow-sm"
                    >
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Candidate</Table.HeaderCell>
                          <Table.HeaderCell>Position</Table.HeaderCell>
                          <Table.HeaderCell>Company & Location</Table.HeaderCell>
                          <Table.HeaderCell>Status</Table.HeaderCell>
                          <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {tableData.slice(0, 3).map((candidate) => (
                          <Table.Row key={candidate.id} className="group">
                            <Table.Cell className="py-3">
                              <div className="space-y-1">
                                <h4 className="font-heading font-semibold text-slate-900 text-sm">
                                  {candidate.name}
                                </h4>
                                <span className="font-body text-slate-500 text-xs">
                                  {candidate.experience} experience
                                </span>
                              </div>
                            </Table.Cell>
                            <Table.Cell className="py-3">
                              <span className="font-body font-medium text-slate-800 text-sm">
                                {candidate.position}
                              </span>
                            </Table.Cell>
                            <Table.Cell className="py-3">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-1">
                                  <CompanyIcon className="w-3 h-3 text-slate-400" />
                                  <span className="font-body text-slate-700 text-sm">
                                    {candidate.company}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <LocationIcon className="w-3 h-3 text-slate-400" />
                                  <span className="font-body text-slate-600 text-xs">
                                    {candidate.location}
                                  </span>
                                </div>
                              </div>
                            </Table.Cell>
                            <Table.Cell className="py-3">
                              <Badge 
                                variant={getStatusColor(candidate.status)} 
                                size="sm"
                                className="font-medium"
                              >
                                {candidate.status}
                              </Badge>
                            </Table.Cell>
                            <Table.Cell className="py-3">
                              <div className="flex items-center space-x-1">
                                <button className="flex items-center justify-center w-7 h-7 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-md hover:bg-emerald-100 transition-colors">
                                  <ViewIcon size={14} />
                                </button>
                                <button className="flex items-center justify-center w-7 h-7 bg-blue-50 text-blue-600 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors">
                                  <EditIcon size={14} />
                                </button>
                              </div>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Color Schemes Showcase */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Color Schemes</h2>
            
            <div className="grid grid-cols-1 gap-8">
              {colorSchemes.map((scheme) => (
                <Card key={scheme} className="p-0">
                  <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-2 capitalize">
                      {scheme} Color Scheme
                    </h3>
                    <p className="text-gray-600">
                      Professional table styling with {scheme} color palette.
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <Table
                      variant="professional"
                      colorScheme={scheme}
                      size="md"
                      hoverable={true}
                      responsive={true}
                      paginated={false}
                      showColumnLines={true}
                      showRowLines={true}
                      className="shadow-sm"
                    >
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Employee</Table.HeaderCell>
                          <Table.HeaderCell>Department</Table.HeaderCell>
                          <Table.HeaderCell>Salary</Table.HeaderCell>
                          <Table.HeaderCell>Status</Table.HeaderCell>
                          <Table.HeaderCell>Skills</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {tableData.slice(0, 4).map((candidate) => (
                          <Table.Row key={candidate.id}>
                            <Table.Cell className="py-3">
                              <div className="space-y-1">
                                <h4 className="font-heading font-semibold text-slate-900 text-sm">
                                  {candidate.name}
                                </h4>
                                <span className="font-body text-slate-500 text-xs">
                                  {candidate.experience} experience
                                </span>
                              </div>
                            </Table.Cell>
                            <Table.Cell className="py-3">
                              <span className="font-body font-medium text-slate-800 text-sm">
                                {candidate.position}
                              </span>
                            </Table.Cell>
                            <Table.Cell className="py-3">
                              <span className="font-body font-bold text-slate-900 text-sm">
                                {candidate.salary}
                              </span>
                            </Table.Cell>
                            <Table.Cell className="py-3">
                              <Badge 
                                variant={getStatusColor(candidate.status)} 
                                size="sm"
                              >
                                {candidate.status}
                              </Badge>
                            </Table.Cell>
                            <Table.Cell className="py-3">
                              <div className="flex flex-wrap gap-1">
                                {candidate.skills.slice(0, 2).map((skill, idx) => (
                                  <Badge 
                                    key={idx} 
                                    size="xs" 
                                    variant="primary"
                                    className="bg-gradient-to-r from-violet-50 to-purple-50 text-violet-700"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                                {candidate.skills.length > 2 && (
                                  <Badge size="xs" variant="secondary">
                                    +{candidate.skills.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Interactive Table with All Features */}
          <section className="mb-12">
            <Card className="p-0">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-violet-50 to-purple-50">
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                  Interactive Table with Pagination
                </h2>
                <p className="text-gray-600">
                  Full-featured table with filtering, pagination, and professional styling.
                </p>
              </div>

              <div className="p-6">
                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
                  <div className="flex-1">
                    <Input
                      leftIcon={<SearchIcon className="w-4 h-4 text-slate-400" />}
                      placeholder="Search candidates..."
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <FilterIcon className="w-4 h-4 text-slate-400" />
                    <BasicSelect
                      value={statusFilter}
                      onChange={setStatusFilter}
                      options={[
                        { value: 'All Status', label: 'All Status' },
                        { value: 'Active', label: 'Active' },
                        { value: 'Interview', label: 'Interview' },
                        { value: 'Pending', label: 'Pending' },
                        { value: 'Rejected', label: 'Rejected' }
                      ]}
                      className="min-w-[140px]"
                    />
                  </div>
                </div>

                <Table
                  variant="professional"
                  colorScheme="gradient"
                  size="md"
                  hoverable={true}
                  responsive={true}
                  stickyHeader={false}
                  paginated={true}
                  pageSize={3}
                  page={page}
                  onPageChange={setPage}
                  totalRows={filteredTableData.length}
                  showColumnLines={true}
                  showRowLines={true}
                  className="shadow-md rounded-xl overflow-hidden"
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell className="min-w-[200px]">Candidate Details</Table.HeaderCell>
                      <Table.HeaderCell className="min-w-[180px]">Position & Company</Table.HeaderCell>
                      <Table.HeaderCell className="min-w-[150px]">Location & Work Type</Table.HeaderCell>
                      <Table.HeaderCell className="min-w-[120px]">Experience</Table.HeaderCell>
                      <Table.HeaderCell className="min-w-[120px]">Salary</Table.HeaderCell>
                      <Table.HeaderCell className="min-w-[200px]">Skills</Table.HeaderCell>
                      <Table.HeaderCell className="min-w-[100px]">Status</Table.HeaderCell>
                      <Table.HeaderCell className="min-w-[120px]">Actions</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {filteredTableData.map((candidate) => (
                      <Table.Row key={candidate.id} className="group">
                        <Table.Cell className="py-4">
                          <div className="space-y-1">
                            <h3 className="font-heading font-bold text-slate-900 text-sm">
                              {candidate.name}
                            </h3>
                            <div className="flex items-center space-x-1">
                              <UserIcon className="w-3 h-3 text-slate-400" />
                              <span className="font-body text-slate-500 text-xs">
                                ID: {candidate.id}
                              </span>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell className="py-4">
                          <div className="space-y-1">
                            <span className="font-body font-medium text-slate-900 text-sm">
                              {candidate.position}
                            </span>
                            <div className="flex items-center space-x-1">
                              <CompanyIcon className="w-3 h-3 text-slate-400" />
                              <span className="font-body text-slate-600 text-xs">
                                {candidate.company}
                              </span>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell className="py-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-1">
                              <LocationIcon className="w-3 h-3 text-slate-400" />
                              <span className="font-body text-slate-600 text-sm">
                                {candidate.location}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {candidate.workType.map((type, idx) => (
                                <Badge 
                                  key={idx} 
                                  variant="info" 
                                  size="xs" 
                                  className="bg-blue-50 text-blue-700 border-blue-200"
                                >
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell className="py-4">
                          <span className="font-body font-medium text-slate-700 text-sm">
                            {candidate.experience}
                          </span>
                        </Table.Cell>
                        <Table.Cell className="py-4">
                          <div className="flex items-center space-x-1">
                            <SalaryIcon className="w-3 h-3 text-slate-400" />
                            <span className="font-body font-bold text-slate-900 text-sm">
                              {candidate.salary}
                            </span>
                          </div>
                        </Table.Cell>
                        <Table.Cell className="py-4">
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.slice(0, 3).map((skill, idx) => (
                              <Badge 
                                key={idx} 
                                size="xs" 
                                variant="primary"
                                className="bg-gradient-to-r from-violet-50 to-purple-50 text-violet-700 border-violet-200"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 3 && (
                              <Badge 
                                size="xs" 
                                variant="secondary"
                                className="bg-slate-100 text-slate-600"
                              >
                                +{candidate.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </Table.Cell>
                        <Table.Cell className="py-4">
                          <Badge 
                            variant={getStatusColor(candidate.status)} 
                            size="sm"
                            className="font-medium"
                          >
                            {candidate.status}
                          </Badge>
                        </Table.Cell>
                        <Table.Cell className="py-4">
                          <div className="flex items-center space-x-1">
                            <button className="group/btn flex items-center justify-center w-8 h-8 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-100 hover:scale-110 transition-all duration-200">
                              <ViewIcon size={14} />
                            </button>
                            <button className="group/btn flex items-center justify-center w-8 h-8 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 hover:scale-110 transition-all duration-200">
                              <EditIcon size={14} />
                            </button>
                            <button className="group/btn flex items-center justify-center w-8 h-8 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 hover:scale-110 transition-all duration-200">
                              <DeleteIcon size={14} />
                            </button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </Card>
          </section>

          {/* Usage Examples */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Usage Examples</h2>
            
            <Card className="p-6">
              <h3 className="font-heading text-lg font-semibold text-gray-800 mb-4">Table Component Implementation</h3>
              <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                <pre className="font-mono text-sm text-gray-700">
{`import { Table } from '@/components/ui-components/Table';

<Table
  variant="professional"
  colorScheme="gradient"
  size="md"
  hoverable={true}
  responsive={true}
  paginated={true}
  pageSize={10}
  page={currentPage}
  onPageChange={setCurrentPage}
  totalRows={data.length}
  showColumnLines={true}
  showRowLines={true}
  maxHeight={600}
>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
      <Table.HeaderCell>Actions</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {data.map((item) => (
      <Table.Row key={item.id}>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>
          <Badge variant="success">{item.status}</Badge>
        </Table.Cell>
        <Table.Cell>
          <Button size="sm">View</Button>
        </Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>`}
                </pre>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
