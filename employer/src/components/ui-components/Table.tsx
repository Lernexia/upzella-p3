'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Table Component Props
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  variant?: 'default' | 'bordered' | 'striped' | 'minimal' | 'glass' | 'professional';
  size?: 'sm' | 'md' | 'lg';
  responsive?: boolean;
  hoverable?: boolean;
  stickyHeader?: boolean;
  stickyColumns?: number[]; // array of column indices to make sticky (0-based)
  maxHeight?: number | string; // for vertical scroll
  paginated?: boolean;
  pageSize?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  totalRows?: number;
  showColumnLines?: boolean;
  showRowLines?: boolean;
  colorScheme?: 'purple' | 'blue' | 'pink' | 'slate' | 'gradient';
  children: React.ReactNode;
}

// Define compound component type
interface TableCompound extends React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLTableElement>> {
  Header: typeof TableHeader;
  Body: typeof TableBody;
  Footer: typeof TableFooter;
  Row: typeof TableRow;
  Cell: typeof TableCell;
  HeaderCell: typeof TableHeaderCell;
  Pagination: typeof TablePagination;
}

// Main Table Component
export const Table = forwardRef<HTMLTableElement, TableProps>(({
  variant = 'default',
  size = 'md',
  responsive = true,
  hoverable = true,
  stickyHeader = false,
  stickyColumns = [],
  maxHeight,
  paginated = false,
  pageSize = 5,
  page = 1,
  onPageChange,
  totalRows,
  showColumnLines = true,
  showRowLines = true,
  colorScheme = 'purple',
  className,
  children,
  ...props
}, ref) => {
  // Base styles for the table
  const baseStyles = "w-full text-left border-collapse";

  // Color scheme styles
  const colorSchemes = {
    purple: {
      header: "bg-gradient-to-r from-[var(--color-purple-50)]/80 to-[var(--color-purple-100)]/60 text-[var(--color-purple-800)]",
      headerBorder: "border-[var(--color-purple-200)]",
      cell: "text-[var(--color-slate-700)]",
      cellBorder: "border-[var(--color-purple-100)]",
      rowHover: "hover:bg-[var(--color-purple-50)]/70",
      rowSelected: "bg-[var(--color-purple-100)]/70",
      background: "bg-white",
      shadow: "shadow-[0_4px_20px_0_rgba(139,92,246,0.08)]",
    },
    blue: {
      header: "bg-gradient-to-r from-[var(--color-blue-50)]/80 to-[var(--color-blue-100)]/60 text-[var(--color-blue-800)]",
      headerBorder: "border-[var(--color-blue-200)]",
      cell: "text-[var(--color-slate-700)]",
      cellBorder: "border-[var(--color-blue-100)]",
      rowHover: "hover:bg-[var(--color-blue-50)]/70",
      rowSelected: "bg-[var(--color-blue-100)]/70",
      background: "bg-white",
      shadow: "shadow-[0_4px_20px_0_rgba(59,130,246,0.08)]",
    },
    pink: {
      header: "bg-gradient-to-r from-[var(--color-pink-50)]/80 to-[var(--color-pink-100)]/60 text-[var(--color-pink-800)]",
      headerBorder: "border-[var(--color-pink-200)]",
      cell: "text-[var(--color-slate-700)]",
      cellBorder: "border-[var(--color-pink-100)]",
      rowHover: "hover:bg-[var(--color-pink-50)]/70",
      rowSelected: "bg-[var(--color-pink-100)]/70",
      background: "bg-white",
      shadow: "shadow-[0_4px_20px_0_rgba(236,72,153,0.08)]",
    },
    slate: {
      header: "bg-gradient-to-r from-[var(--color-slate-100)] to-[var(--color-slate-200)] text-[var(--color-slate-800)]",
      headerBorder: "border-[var(--color-slate-300)]",
      cell: "text-[var(--color-slate-700)]",
      cellBorder: "border-[var(--color-slate-200)]",
      rowHover: "hover:bg-[var(--color-slate-50)]",
      rowSelected: "bg-[var(--color-slate-100)]",
      background: "bg-white",
      shadow: "shadow-[0_4px_20px_0_rgba(100,116,139,0.08)]",
    },
    gradient: {
      header: "bg-gradient-to-r from-[var(--color-purple-50)]/80 via-[var(--color-pink-50)]/60 to-[var(--color-blue-50)]/60 text-[var(--color-purple-800)]",
      headerBorder: "border-[var(--color-purple-200)]",
      cell: "text-[var(--color-slate-700)]",
      cellBorder: "border-[var(--color-purple-100)]",
      rowHover: "hover:bg-gradient-to-r hover:from-[var(--color-purple-50)]/30 hover:via-[var(--color-pink-50)]/20 hover:to-[var(--color-blue-50)]/30",
      rowSelected: "bg-gradient-to-r from-[var(--color-purple-100)]/50 via-[var(--color-pink-100)]/40 to-[var(--color-blue-100)]/50",
      background: "bg-white",
      shadow: "shadow-[0_4px_20px_0_rgba(139,92,246,0.08)]",
    }
  };

  // Variant styles (using Upzella brand tokens, enhanced for professional look)
  const variantStyles = {
    default: `${colorSchemes[colorScheme].background} border border-[var(--color-purple-100)]/80 ${colorSchemes[colorScheme].shadow} transition-all duration-200 border-separate border-spacing-0`,
    bordered: `${colorSchemes[colorScheme].background} border-2 ${colorSchemes[colorScheme].headerBorder} ${colorSchemes[colorScheme].shadow} transition-all duration-200 border-separate border-spacing-0`,
    striped: `${colorSchemes[colorScheme].background} border ${colorSchemes[colorScheme].cellBorder} ${colorSchemes[colorScheme].shadow} [&>tbody>tr:nth-child(odd)]:bg-[var(--color-purple-50)]/30 transition-all duration-200 border-separate border-spacing-0`,
    minimal: "bg-transparent border-separate border-spacing-0",
    glass: "bg-white/60 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-200 border-separate border-spacing-0",
    professional: `bg-white border border-[var(--color-slate-200)] ${colorSchemes[colorScheme].shadow} transition-all duration-200 border-separate border-spacing-0 rounded-md overflow-hidden`
  };

  // Size styles (Upzella font tokens, improved spacing)
  const sizeStyles = {
    sm: "text-xs font-body",
    md: "text-sm font-body",
    lg: "text-base font-body"
  };

  // Apply sticky columns
  const applyStickyColumns = (children: React.ReactNode) => {
    if (!stickyColumns.length) return children;

    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      // Process Table.Header and Table.Body
      if (
        child.type &&
        typeof child.type !== 'string' &&
        ('displayName' in child.type) &&
        (
          (child.type as { displayName?: string }).displayName === 'TableHeader' ||
          (child.type as { displayName?: string }).displayName === 'TableBody'
        )
      ) {
        const rows = React.Children.map((child as any).props.children, (row) => {
          if (!React.isValidElement(row)) return row;

          // Process Table.Row
          const cells = React.Children.map((row as any).props.children, (cell, cellIndex) => {
            if (!React.isValidElement(cell)) return cell;

            // If this cell's index is in stickyColumns, make it sticky
            if (stickyColumns.includes(cellIndex)) {
              // Calculate positions based on index
              const leftPosition = cellIndex === 0 ? 0 : undefined;
              const rightPosition = cellIndex === React.Children.count((row as any).props.children) - 1 ? 0 : undefined;

              return React.cloneElement(cell, {
                'data-sticky': true,
                'data-sticky-left': leftPosition,
                'data-sticky-right': rightPosition,
              } as any);
            }

            return cell;
          });

          return React.cloneElement(row, {}, cells);
        });

        return React.cloneElement(child, {}, rows);
      }

      return child;
    });
  };

  // Wrapper for responsive tables with vertical scroll
  const TableWrapper = ({ children }: { children: React.ReactNode }) => {
    let style: React.CSSProperties = {
      borderRadius: 'var(--border-radius-upzella)',
      position: 'relative'
    };

    if (maxHeight) {
      style.maxHeight = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;
    }

    if (responsive || maxHeight) {
      return (
        <div className="w-full overflow-hidden" style={style}>
          <div className={cn(
            "w-full table-scroll-container",
            maxHeight ? 'overflow-y-auto' : '',
            responsive ? 'overflow-x-auto' : '',
            stickyHeader ? 'sticky-header-container' : ''
          )} style={maxHeight ? { maxHeight: style.maxHeight } : {}}>
            {children}
          </div>
        </div>
      );
    }

    return <>{children}</>;
  };

  // Pagination logic
  let paginatedChildren = children;
  let totalPages = 1;

  if (paginated && React.Children.count(children) > 0) {
    // Convert children to array if it's not already
    const childrenArray = React.Children.toArray(children);

    // Find the TableBody component
    const bodyIdx = childrenArray.findIndex(
      child => React.isValidElement(child) && child.type && (child.type as any).displayName === 'TableBody'
    );

    if (bodyIdx !== -1) {
      const body = childrenArray[bodyIdx] as React.ReactElement;
      const bodyRows = React.Children.toArray((body as React.ReactElement<{ children: React.ReactNode }>).props.children);

      // Calculate total pages
      totalPages = totalRows ? Math.ceil(totalRows / pageSize) : Math.ceil(bodyRows.length / pageSize);

      // Calculate which rows to show
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const pagedRows = bodyRows.slice(start, end);

      // Create new body with only the rows for current page
      const newBody = React.cloneElement(body, {}, pagedRows);

      // Replace the body in the children array
      paginatedChildren = [
        ...childrenArray.slice(0, bodyIdx),
        newBody,
        ...childrenArray.slice(bodyIdx + 1)
      ];
    }
  }

  // Apply sticky columns to the children
  const processedChildren = applyStickyColumns(paginatedChildren);

  return (
    <div className="w-full">
      <TableWrapper>
        <table
          ref={ref}
          className={cn(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            'font-body',
            className
          )}
          style={{
            borderRadius: variant === 'professional' ? '0.375rem' : 'var(--border-radius-upzella)',
            fontFamily: 'var(--font-inter)',
            borderCollapse: showColumnLines || showRowLines ? 'separate' : 'collapse',
          }}
          {...props}
        >
          {processedChildren}
        </table>
      </TableWrapper>

      {paginated && totalPages > 1 && (
        <TablePagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          colorScheme={colorScheme}
        />
      )}
    </div>
  );
}) as TableCompound;

Table.displayName = "Table";

// Table Pagination Component
export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  colorScheme?: 'purple' | 'blue' | 'pink' | 'slate' | 'gradient';
}

export const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  colorScheme = 'purple'
}: TablePaginationProps) => {
  // Color schemes for pagination
  const colorSchemes = {
    purple: {
      button: "bg-[var(--color-purple-50)] text-[var(--color-purple-700)] border-[var(--color-purple-100)] hover:bg-[var(--color-purple-100)] focus:ring-[var(--color-purple-400)]",
      active: "bg-[var(--color-purple-500)] text-white border-[var(--color-purple-600)] hover:bg-[var(--color-purple-600)]",
      text: "text-[var(--color-slate-600)]"
    },
    blue: {
      button: "bg-[var(--color-blue-50)] text-[var(--color-blue-700)] border-[var(--color-blue-100)] hover:bg-[var(--color-blue-100)] focus:ring-[var(--color-blue-400)]",
      active: "bg-[var(--color-blue-500)] text-white border-[var(--color-blue-600)] hover:bg-[var(--color-blue-600)]",
      text: "text-[var(--color-slate-600)]"
    },
    pink: {
      button: "bg-[var(--color-pink-50)] text-[var(--color-pink-700)] border-[var(--color-pink-100)] hover:bg-[var(--color-pink-100)] focus:ring-[var(--color-pink-400)]",
      active: "bg-[var(--color-pink-500)] text-white border-[var(--color-pink-600)] hover:bg-[var(--color-pink-600)]",
      text: "text-[var(--color-slate-600)]"
    },
    slate: {
      button: "bg-[var(--color-slate-100)] text-[var(--color-slate-700)] border-[var(--color-slate-200)] hover:bg-[var(--color-slate-200)] focus:ring-[var(--color-slate-400)]",
      active: "bg-[var(--color-slate-700)] text-white border-[var(--color-slate-800)] hover:bg-[var(--color-slate-800)]",
      text: "text-[var(--color-slate-600)]"
    },
    gradient: {
      button: "bg-[var(--color-purple-50)] text-[var(--color-purple-700)] border-[var(--color-purple-100)] hover:bg-[var(--color-purple-100)] focus:ring-[var(--color-purple-400)]",
      active: "bg-gradient-to-r from-[var(--color-purple-500)] to-[var(--color-pink-500)] text-white border-transparent hover:from-[var(--color-purple-600)] hover:to-[var(--color-pink-600)]",
      text: "text-[var(--color-slate-600)]"
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Calculate range around current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at the beginning
      if (currentPage <= 2) {
        endPage = 4;
      }

      // Adjust if at the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-between items-center mt-4 font-accent p-5">
      <div className={cn("text-sm", colorSchemes[colorScheme].text)}>
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex items-center gap-1">
        <button
          className={cn(
            "px-2 py-1 rounded text-sm border disabled:opacity-50 font-accent transition-colors focus:outline-none focus:ring-2",
            colorSchemes[colorScheme].button
          )}
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {getPageNumbers().map((pageNum, index) => (
          <React.Fragment key={index}>
            {pageNum === '...' ? (
              <span className={cn("px-2 py-1 text-sm", colorSchemes[colorScheme].text)}>...</span>
            ) : (
              <button
                className={cn(
                  "min-w-[32px] h-8 rounded text-sm border font-accent transition-colors focus:outline-none focus:ring-2",
                  currentPage === pageNum ? colorSchemes[colorScheme].active : colorSchemes[colorScheme].button
                )}
                onClick={() => onPageChange && onPageChange(pageNum as number)}
                disabled={currentPage === pageNum}
                aria-label={`Page ${pageNum}`}
                aria-current={currentPage === pageNum ? 'page' : undefined}
              >
                {pageNum}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          className={cn(
            "px-2 py-1 rounded text-sm border disabled:opacity-50 font-accent transition-colors focus:outline-none focus:ring-2",
            colorSchemes[colorScheme].button
          )}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

TablePagination.displayName = "TablePagination";

// Table Header Component
export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className, children, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className={cn(
        "text-[var(--color-purple-700)] font-semibold font-heading border-b border-[var(--color-purple-200)]",
        className
      )}
      style={{ 
        fontFamily: 'var(--font-outfit)', 
        letterSpacing: '0.01em',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        backgroundColor: 'inherit'
      }}
      {...props}
    >
      {children}
    </thead>
  );
});

TableHeader.displayName = "TableHeader";

// Table Body Component
export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, children, ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      className={cn(
        "divide-y divide-[var(--color-purple-100)]/40 font-body",
        className
      )}
      style={{ fontFamily: 'var(--font-inter)' }}
      {...props}
    >
      {children}
    </tbody>
  );
});

TableBody.displayName = "TableBody";

// Table Footer Component
export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(({ className, children, ...props }, ref) => {
  return (
    <tfoot
      ref={ref}
      className={cn(
        "bg-[var(--color-slate-50)]/80 text-[var(--color-slate-700)] font-medium border-t border-[var(--color-purple-100)]/60 font-accent shadow-inner",
        className
      )}
      style={{ fontFamily: 'var(--font-montserrat)' }}
      {...props}
    >
      {children}
    </tfoot>
  );
});

TableFooter.displayName = "TableFooter";

// Table Row Component
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
  isSelected?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ className, children, isSelected = false, ...props }, ref) => {
  return (
    <tr
      ref={ref}
      className={cn(
        "transition-colors duration-200 hover:bg-[var(--color-purple-50)]/50 focus-within:bg-[var(--color-purple-100)]/40",
        isSelected && "bg-[var(--color-purple-100)]/70 outline outline-1 outline-[var(--color-purple-300)]",
        className
      )}
      tabIndex={0}
      {...props}
    >
      {children}
    </tr>
  );
});

TableRow.displayName = "TableRow";

// Table Cell Component
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  // Sticky column support
  'data-sticky'?: boolean;
  'data-sticky-left'?: number;
  'data-sticky-right'?: number;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(({ className, children, align = 'left', truncate = false, ...props }, ref) => {
  // Sticky column support
  let stickyStyle: React.CSSProperties = {};
  if (props['data-sticky']) {
    stickyStyle = {
      position: 'sticky',
      left: props['data-sticky-left'] !== undefined ? props['data-sticky-left'] : undefined,
      right: props['data-sticky-right'] !== undefined ? props['data-sticky-right'] : undefined,
      zIndex: 15, // Higher z-index to be above normal content but below header
      backgroundColor: 'var(--color-white, white)',
      boxShadow: props['data-sticky-left'] !== undefined
        ? '2px 0 6px rgba(139,92,246,0.1)'
        : props['data-sticky-right'] !== undefined
          ? '-2px 0 6px rgba(139,92,246,0.1)'
          : 'none',
    };
  }

  return (
    <td
      ref={ref}
      className={cn(
        "px-4 py-3 text-[var(--color-slate-700)] font-body align-middle border-r border-[var(--color-purple-100)]/40",
        align === 'center' && "text-center",
        align === 'right' && "text-right",
        truncate && "max-w-[12rem] truncate",
        props['data-sticky'] && "bg-white shadow-sm",
        className
      )}
      style={{
        verticalAlign: 'middle',
        ...stickyStyle,
        borderRight: props['data-sticky'] ? '1px solid var(--color-purple-200)' : undefined
      }}
      {...props}
    >
      {children}
    </td>
  );
});

TableCell.displayName = "TableCell";

// Table Header Cell Component
export interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  sorted?: 'asc' | 'desc' | null;
  onSort?: () => void;
  // Sticky column support
  'data-sticky'?: boolean;
  'data-sticky-left'?: number;
  'data-sticky-right'?: number;
}

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(({ className, children, align = 'left', sortable = false, sorted = null, onSort, ...props }, ref) => {
  // Sticky column support
  let stickyStyle: React.CSSProperties = {};
  if (props['data-sticky']) {
    stickyStyle = {
      position: 'sticky',
      left: props['data-sticky-left'] !== undefined ? props['data-sticky-left'] : undefined,
      right: props['data-sticky-right'] !== undefined ? props['data-sticky-right'] : undefined,
      zIndex: 25, // Higher z-index for sticky headers to be above everything
      backgroundColor: 'var(--color-purple-50, #f5f3ff)',
      boxShadow: props['data-sticky-left'] !== undefined
        ? '2px 0 6px rgba(139,92,246,0.15)'
        : props['data-sticky-right'] !== undefined
          ? '-2px 0 6px rgba(139,92,246,0.15)'
          : 'none',
    };
  }

  return (
    <th
      ref={ref}
      className={cn(
        "px-4 py-3 text-xs font-bold uppercase tracking-wider font-heading text-[var(--color-purple-700)] bg-[var(--color-purple-50)]/90 border-b border-[var(--color-purple-200)] border-r border-r-[var(--color-purple-200)]/80 transition-colors",
        align === 'center' && "text-center",
        align === 'right' && "text-right",
        sortable && "cursor-pointer hover:bg-[var(--color-purple-100)]/60 transition-colors",
        props['data-sticky'] && "bg-[var(--color-purple-50)] shadow-sm",
        className
      )}
      onClick={sortable ? onSort : undefined}
      style={{
        fontFamily: 'var(--font-outfit)',
        letterSpacing: '0.08em',
        ...stickyStyle,
        borderRight: props['data-sticky'] ? '1px solid var(--color-purple-200)' : undefined
      }}
      {...props}
    >
      <div className="flex items-center gap-2 select-none">
        <span>{children}</span>
        {sortable && (
          <span className="inline-flex flex-col">
            <svg
              className={cn(
                "w-2 h-2 mb-0.5",
                sorted === 'asc' ? "text-[var(--color-purple-600)]" : "text-[var(--color-slate-400)]"
              )}
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M7 14l5-5 5 5z" />
            </svg>
            <svg
              className={cn(
                "w-2 h-2",
                sorted === 'desc' ? "text-[var(--color-purple-600)]" : "text-[var(--color-slate-400)]"
              )}
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M7 10l5 5 5-5z" />
            </svg>
          </span>
        )}
      </div>
    </th>
  );
});

TableHeaderCell.displayName = "TableHeaderCell";

// Compound component assignments
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.HeaderCell = TableHeaderCell;
Table.Pagination = TablePagination;

export default Table;
