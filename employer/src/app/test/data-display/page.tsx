'use client';

import { Badge } from '@/components/ui-components/Badge';
import { StatsContainer } from '@/components/ui-components/StatsContainer';
import { Table, TableHeader, TableBody, TableRow } from '@/components/ui-components/Table';
import { Button } from '@/components/ui-components/Button';
import { Select } from '@/components/ui-components/Select';
import ViewIcon from '@/components/svg-icons/ViewIcon';
import EditIcon from '@/components/svg-icons/EditIcon';
import DeleteIcon from '@/components/svg-icons/DeleteIcon';
import UserIcon from '@/components/svg-icons/UserIcon';
import TrendUpIcon from '@/components/svg-icons/TrendUpIcon';
import TrendDownIcon from '@/components/svg-icons/TrendDownIcon';
import { useState } from 'react';

export default function DataDisplayTestPage() {
  // Table/filter variables
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState('10');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [variant, setVariant] = useState<'default' | 'bordered' | 'striped' | 'minimal' | 'glass' | 'professional'>('professional');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [responsive, setResponsive] = useState(true);
  const [hoverable, setHoverable] = useState(true);
  const [stickyHeader, setStickyHeader] = useState(false);
  const [stickyColumns, setStickyColumns] = useState<number[]>([]);
  const [maxHeight, setMaxHeight] = useState<number | string | undefined>(undefined);
  const [paginated, setPaginated] = useState(false);
  const [showColumnLines, setShowColumnLines] = useState(true);
  const [showRowLines, setShowRowLines] = useState(true);
  const [colorScheme, setColorScheme] = useState<'purple' | 'blue' | 'pink' | 'slate' | 'gradient'>('purple');

  const tableData = [
    {
      id: 1,
      name: 'John Smith',
      position: 'Frontend Developer',
      status: 'Active',
      salary: '$85,000',
      experience: '5 years',
      skills: ['React', 'TypeScript', 'Tailwind'],
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Backend Developer',
      status: 'Interview',
      salary: '$90,000',
      experience: '7 years',
      skills: ['Node.js', 'Python', 'PostgreSQL'],
    },
    {
      id: 3,
      name: 'Mike Chen',
      position: 'Full Stack Developer',
      status: 'Pending',
      salary: '$95,000',
      experience: '6 years',
      skills: ['React', 'Node.js', 'MongoDB'],
    },
    {
      id: 4,
      name: 'Emily Davis',
      position: 'UI/UX Designer',
      status: 'Rejected',
      salary: '$75,000',
      experience: '4 years',
      skills: ['Figma', 'Sketch', 'Adobe XD'],
    },
  ];

  const statsData = [
    {
      id: 'applications',
      label: 'Total Applications',
      value: '2,847',
      trendValue: '+12%',
      trending: 'up' as const,
      icon: UserIcon,
      colorVariant: 'blue' as const,
    },
    {
      id: 'interview-rate',
      label: 'Interview Rate',
      value: '34%',
      trendValue: '+5%',
      trending: 'up' as const,
      icon: TrendUpIcon,
      colorVariant: 'green' as const,
    },
    {
      id: 'response-time',
      label: 'Avg. Response Time',
      value: '2.3 days',
      trendValue: '-8%',
      trending: 'down' as const,
      icon: TrendDownIcon,
      colorVariant: 'orange' as const,
    },
    {
      id: 'success-rate',
      label: 'Success Rate',
      value: '18%',
      trendValue: '+3%',
      trending: 'up' as const,
      icon: TrendUpIcon,
      colorVariant: 'purple' as const,
    },
  ];

  // Filtered and paginated data
  const filteredTableData = tableData.filter(candidate =>
    statusFilter === 'All Status' ? true : candidate.status === statusFilter
  );
  const paginatedData = filteredTableData.slice((page - 1) * Number(perPage), page * Number(perPage));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="sizer">
        <div className="text-center mb-16 pt-16">
          <h1 className="font-heading text-4xl font-bold text-gradient mb-4">
            Data Display Components
          </h1>
          <p className="font-title text-xl text-gray-700 mb-6">
            Tables, lists, stats containers, and data presentation patterns
          </p>
        </div>

        <div className="pb-16">
          {/* Statistics Container */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Statistics Container</h2>
            
            <StatsContainer stats={statsData} />
          </section>

          {/* Data Table */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Data Tables</h2>

            {/* Table Playground Controls */}
            <div className="card mb-6 p-4">
              <div className="flex flex-wrap gap-4 items-end">
                <div>
                  <label className="block text-xs font-accent text-gray-500 mb-1">Variant</label>
                  <Select
                    value={variant}
                    onChange={(v: string) => setVariant(v as typeof variant)}
                    options={[
                      { label: 'Default', value: 'default' },
                      { label: 'Bordered', value: 'bordered' },
                      { label: 'Striped', value: 'striped' },
                      { label: 'Minimal', value: 'minimal' },
                      { label: 'Glass', value: 'glass' },
                      { label: 'Professional', value: 'professional' },
                    ]}
                    size="sm"
                    className="w-32"
                  />
                </div>
                <div>
                  <label className="block text-xs font-accent text-gray-500 mb-1">Size</label>
                  <Select
                    value={size}
                    onChange={(v: string) => setSize(v as typeof size)}
                    options={[
                      { label: 'Small', value: 'sm' },
                      { label: 'Medium', value: 'md' },
                      { label: 'Large', value: 'lg' },
                    ]}
                    size="sm"
                    className="w-24"
                  />
                </div>
                <div>
                  <label className="block text-xs font-accent text-gray-500 mb-1">Color Scheme</label>
                  <Select
                    value={colorScheme}
                    onChange={(v: string) => setColorScheme(v as typeof colorScheme)}
                    options={[
                      { label: 'Purple', value: 'purple' },
                      { label: 'Blue', value: 'blue' },
                      { label: 'Pink', value: 'pink' },
                      { label: 'Slate', value: 'slate' },
                      { label: 'Gradient', value: 'gradient' },
                    ]}
                    size="sm"
                    className="w-28"
                  />
                </div>
                <div>
                  <label className="block text-xs font-accent text-gray-500 mb-1">Rows/Page</label>
                  <Select
                    value={perPage}
                    onChange={(v: string) => setPerPage(v)}
                    options={['4','10','25','50'].map(n => ({ label: n, value: n }))}
                    size="sm"
                    className="w-20"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="block text-xs font-accent text-gray-500">Options</label>
                  <div className="flex flex-wrap gap-2">
                    <Button variant={responsive ? 'primary' : 'secondary'} size="sm" onClick={() => setResponsive(r => !r)}>
                      Responsive
                    </Button>
                    <Button variant={hoverable ? 'primary' : 'secondary'} size="sm" onClick={() => setHoverable(h => !h)}>
                      Hoverable
                    </Button>
                    <Button variant={stickyHeader ? 'primary' : 'secondary'} size="sm" onClick={() => setStickyHeader(s => !s)}>
                      Sticky Header
                    </Button>
                    <Button variant={showColumnLines ? 'primary' : 'secondary'} size="sm" onClick={() => setShowColumnLines(s => !s)}>
                      Col Lines
                    </Button>
                    <Button variant={showRowLines ? 'primary' : 'secondary'} size="sm" onClick={() => setShowRowLines(s => !s)}>
                      Row Lines
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-title text-lg font-semibold text-gray-800">Candidate Applications</h3>
                <div className="flex items-center gap-3">
                  <Select
                    value={statusFilter}
                    onChange={setStatusFilter}
                    options={[
                      { label: 'All Status', value: 'All Status' },
                      { label: 'Active', value: 'Active' },
                      { label: 'Interview', value: 'Interview' },
                      { label: 'Pending', value: 'Pending' },
                      { label: 'Rejected', value: 'Rejected' },
                    ]}
                    size="sm"
                    className="w-32"
                  />
                  <Button variant="primary" size="sm">
                    Export Data
                  </Button>
                </div>
              </div>

              <Table 
                variant={variant}
                size={size}
                responsive={responsive}
                hoverable={hoverable}
                stickyHeader={stickyHeader}
                stickyColumns={stickyColumns}
                maxHeight={maxHeight}
                paginated={paginated}
                pageSize={Number(perPage)}
                page={page}
                showColumnLines={showColumnLines}
                showRowLines={showRowLines}
                colorScheme={colorScheme}
              >
                <TableHeader>
                  <TableRow>
                    <th className="text-left py-3 px-4 font-title text-sm font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-title text-sm font-semibold text-gray-700">Position</th>
                    <th className="text-left py-3 px-4 font-title text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-title text-sm font-semibold text-gray-700">Salary</th>
                    <th className="text-left py-3 px-4 font-title text-sm font-semibold text-gray-700">Experience</th>
                    <th className="text-left py-3 px-4 font-title text-sm font-semibold text-gray-700">Skills</th>
                    <th className="text-left py-3 px-4 font-title text-sm font-semibold text-gray-700">Actions</th>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-accent text-sm">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-body font-medium text-gray-800">{candidate.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-body text-gray-600">{candidate.position}</td>
                      <td className="py-4 px-4">
                        <Badge 
                          variant={
                            candidate.status === 'Active' ? 'success' :
                            candidate.status === 'Interview' ? 'info' :
                            candidate.status === 'Pending' ? 'warning' :
                            'error'
                          }
                        >
                          {candidate.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 font-mono text-gray-800">{candidate.salary}</td>
                      <td className="py-4 px-4 font-body text-gray-600">{candidate.experience}</td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 2).map((skill) => (
                            <Badge 
                              key={skill}
                              variant="secondary"
                              size="xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 2 && (
                            <Badge variant="default" size="xs">
                              +{candidate.skills.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <ViewIcon size={16} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <EditIcon size={16} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <DeleteIcon size={16} />
                          </Button>
                        </div>
                      </td>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Table Footer */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <span className="font-body text-sm text-gray-600">
                  Showing {((page - 1) * Number(perPage)) + 1} to {page * Number(perPage) > filteredTableData.length ? filteredTableData.length : page * Number(perPage)} of {filteredTableData.length} results
                </span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
                    Previous
                  </Button>
                  <Button variant="primary" size="sm">{page}</Button>
                  <Button variant="ghost" size="sm" disabled={page * Number(perPage) >= filteredTableData.length} onClick={() => setPage(page + 1)}>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* List Views */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">List Views</h2>
            
            <div className="grid md:grid-2 gap-6">
              {/* Simple List */}
              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Simple List</h3>
                <div className="space-y-3">
                  {['Dashboard Analytics', 'User Management', 'Job Postings', 'Candidate Reviews', 'Reports & Export'].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-body text-gray-700">{item}</span>
                      <Badge variant="secondary">{index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card List */}
              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Card List</h3>
                <div className="space-y-4">
                  {tableData.slice(0, 3).map((candidate) => (
                    <div key={candidate.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-title font-semibold text-gray-800">{candidate.name}</h4>
                        <Badge 
                          variant={
                            candidate.status === 'Active' ? 'success' :
                            candidate.status === 'Interview' ? 'info' :
                            candidate.status === 'Pending' ? 'warning' :
                            'error'
                          }
                        >
                          {candidate.status}
                        </Badge>
                      </div>
                      <p className="font-body text-gray-600 text-sm mb-2">{candidate.position}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm text-gray-500">{candidate.salary}</span>
                        <span className="font-accent text-sm text-gray-500">{candidate.experience}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Usage Examples */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Usage Examples</h2>
            
            <div className="card">
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">StatsContainer Implementation</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="font-mono text-sm text-gray-700 overflow-x-auto">
{`import { StatsContainer } from '@/components/ui-components/StatsContainer';

const statsData = [
  {
    title: 'Total Applications',
    value: '2,847',
    change: '+12%',
    trend: 'up' as const,
    icon: UserIcon,
  },
  // ... more stats
];

<StatsContainer stats={statsData} />`}
                </pre>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
