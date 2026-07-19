import React from 'react';
import { BreadcrumbItem, HeaderAction, ThemeMode, DirectionMode } from '../types';
import { Plus, Download, Filter, RefreshCw, FileText, CheckCircle, Info, MoveRight, Eye } from 'lucide-react';

interface HeaderPreviewProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  themeMode: ThemeMode;
  directionMode: DirectionMode;
  actions: HeaderAction[];
  onActionClick: (label: string) => void;
}

export default function HeaderPreview({
  title,
  breadcrumbs,
  themeMode,
  directionMode,
  actions,
  onActionClick
}: HeaderPreviewProps) {
  
  // Let's map simulated CSS variables depending on current theme mode
  const cssVariables = {
    '--erp-header-bg': themeMode === 'light' ? '#ffffff' : '#1a1d21',
    '--erp-header-title-color': themeMode === 'light' ? '#495057' : '#f3f6f9',
    '--erp-header-border-color': themeMode === 'light' ? '#e9ebec' : '#2a2f34',
    '--erp-breadcrumb-item-color': themeMode === 'light' ? '#878a99' : '#878a99',
    '--erp-breadcrumb-item-active-color': themeMode === 'light' ? '#405189' : '#3577f1',
    '--erp-breadcrumb-separator-color': themeMode === 'light' ? '#adb5bd' : '#495057',
    '--erp-header-shadow': themeMode === 'light' 
      ? '0 1px 2px rgba(56, 65, 74, 0.15)' 
      : '0 2px 4px rgba(0, 0, 0, 0.2)',
  };

  // Icon mapping helper for simulation
  const renderActionIcon = (iconName: string) => {
    switch (iconName) {
      case 'plus':
        return <Plus className="h-4 w-4" />;
      case 'download':
        return <Download className="h-4 w-4" />;
      case 'filter':
        return <Filter className="h-4 w-4" />;
      case 'refresh':
        return <RefreshCw className="h-4 w-4" />;
      case 'report':
        return <FileText className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getButtonClass = (variant: string) => {
    const base = "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 cursor-pointer ";
    switch (variant) {
      case 'primary':
        return base + "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/10 active:scale-[0.98]";
      case 'secondary':
        return base + "bg-slate-500 hover:bg-slate-600 text-white active:scale-[0.98]";
      case 'success':
        return base + "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/10 active:scale-[0.98]";
      case 'danger':
        return base + "bg-rose-600 hover:bg-rose-700 text-white active:scale-[0.98]";
      case 'info':
        return base + "bg-sky-500 hover:bg-sky-600 text-white active:scale-[0.98]";
      default:
        return base + "bg-slate-600 hover:bg-slate-700 text-white";
    }
  };

  return (
    <div className="space-y-4">
      {/* Simulation Workspace Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Eye className="h-4 w-4 text-indigo-400" />
          <span>Interactive Preview Arena (Simulated DOM)</span>
        </h3>
        <div className="flex gap-3 text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Active theme: {themeMode.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>Direction: {directionMode.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Simulated Device/Browser Frame */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950 shadow-xl">
        {/* Browser address bar decoration */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <div className="bg-slate-950 text-[11px] font-mono text-slate-500 px-3 py-1 rounded-md flex-1 text-center truncate select-none border border-slate-800/80">
            https://erp.velzon-dashboard.io/app/{title.toLowerCase().replace(/\s+/g, '-')}
          </div>
        </div>

        {/* The Preview container mapped exactly with Simulated CSS variables */}
        <div 
          className="p-8 transition-colors duration-300"
          style={{ 
            backgroundColor: themeMode === 'light' ? '#f4f6fa' : '#0f1115',
            direction: directionMode 
          }}
        >
          {/* Header Sandbox starts */}
          <div 
            id="erpPageHeaderContainer"
            className="erp-simulated-header flex flex-col justify-between items-stretch gap-4 p-5 md:p-6 rounded-lg transition-all duration-300 shadow-sm"
            style={{
              backgroundColor: cssVariables['--erp-header-bg'],
              borderBottom: `1px solid ${cssVariables['--erp-header-border-color']}`,
              boxShadow: cssVariables['--erp-header-shadow'],
              flexDirection: 'row', // will simulate standard flex md:flex-row
            }}
          >
            {/* Left section of ERP Header: Title & Breadcrumbs */}
            <div className="flex flex-col gap-1 text-start">
              <h4 
                className="font-bold uppercase tracking-wider text-sm md:text-base m-0 leading-tight transition-colors duration-300"
                style={{ color: cssVariables['--erp-header-title-color'] }}
              >
                {title || "MANAGE USERS"}
              </h4>
              
              <nav className="flex items-center" aria-label="breadcrumb">
                <ol className="flex flex-wrap items-center p-0 m-0 list-none text-xs font-semibold">
                  {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    const isActive = isLast || item.isActive;
                    return (
                      <li 
                        key={index} 
                        className="flex items-center transition-colors duration-300"
                        style={{ 
                          color: isActive 
                            ? cssVariables['--erp-breadcrumb-item-active-color'] 
                            : cssVariables['--erp-breadcrumb-item-color'],
                          fontWeight: isActive ? 600 : 500
                        }}
                      >
                        {index > 0 && (
                          <span 
                            className="inline-block transition-colors duration-300"
                            style={{ 
                              color: cssVariables['--erp-breadcrumb-separator-color'],
                              marginInlineStart: '0.5rem',
                              marginInlineEnd: '0.5rem'
                            }}
                          >
                            /
                          </span>
                        )}
                        {(!isLast && !item.isActive && item.url) ? (
                          <span className="hover:underline cursor-pointer">
                            {item.label}
                          </span>
                        ) : (
                          <span>{item.label}</span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </div>

            {/* Right section of ERP Header: Action Slot */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {actions.filter(a => a.visible).map((action) => (
                <button
                  key={action.id}
                  onClick={() => onActionClick(action.label)}
                  className={getButtonClass(action.variant)}
                >
                  {renderActionIcon(action.icon)}
                  <span>{action.label}</span>
                </button>
              ))}
              
              {/* Optional Empty State inside slot to show template usage */}
              {actions.filter(a => a.visible).length === 0 && (
                <span className="text-[11px] text-slate-500 italic px-2 py-1 border border-dashed border-slate-700/80 rounded">
                  &lt;ng-content slot empty&gt;
                </span>
              )}
            </div>
          </div>
          {/* Header Sandbox ends */}

          {/* Dummy Page Content Simulation to show separation */}
          <div className="mt-6 p-6 rounded-lg border border-dashed border-slate-800/80 bg-slate-900/10 text-center">
            <p className="text-xs text-slate-500 font-mono">
              [ Simulated ERP Workspace Content - Separated by soft border & shadow ]
            </p>
          </div>
        </div>
      </div>

      {/* CSS Variable Token Map Debugger */}
      <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 text-blue-400" />
          <span>Active SCSS Custom Variables & Theme Tokens</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(cssVariables).map(([variable, val]) => (
            <div key={variable} className="p-2 rounded bg-slate-950 border border-slate-800 flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-500 font-mono truncate" title={variable}>{variable}</span>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded border border-slate-700 shrink-0 shadow-sm" style={{ backgroundColor: val }}></span>
                <span className="text-xs text-indigo-300 font-mono font-medium">{val}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
