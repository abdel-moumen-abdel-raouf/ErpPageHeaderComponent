import React, { useState } from 'react';
import { 
  Settings, 
  Layers, 
  Sun, 
  Moon, 
  AlignLeft, 
  AlignRight, 
  Plus, 
  Trash2, 
  Component, 
  Info, 
  Play, 
  CheckCircle,
  HelpCircle,
  Sliders,
  ChevronRight,
  Database,
  Code,
  Sparkles,
  Users,
  Briefcase,
  TrendingUp,
  FileText
} from 'lucide-react';
import { BreadcrumbItem, HeaderAction, ThemeMode, DirectionMode } from './types';
import HeaderPreview from './components/HeaderPreview';
import AngularCodeTabs from './components/AngularCodeTabs';

export default function App() {
  // Page Title State
  const [title, setTitle] = useState<string>('Manage Users');
  
  // Breadcrumbs State
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { label: 'Home', url: '/dashboard' },
    { label: 'Users', url: '/users' },
    { label: 'Manage', isActive: true }
  ]);

  // Temporary breadcrumbs fields
  const [newBreadcrumbLabel, setNewBreadcrumbLabel] = useState<string>('');
  const [newBreadcrumbUrl, setNewBreadcrumbUrl] = useState<string>('');

  // Action Buttons Simulated State
  const [actions, setActions] = useState<HeaderAction[]>([
    { id: '1', label: 'Add New', icon: 'plus', variant: 'primary', visible: true },
    { id: '2', label: 'Export Data', icon: 'download', variant: 'success', visible: true },
    { id: '3', label: 'Filters', icon: 'filter', variant: 'info', visible: true },
    { id: '4', label: 'Refresh', icon: 'refresh', variant: 'secondary', visible: false }
  ]);

  // Mode States
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [directionMode, setDirectionMode] = useState<DirectionMode>('ltr');

  // Event stream/simulated console logs
  const [logs, setLogs] = useState<{ id: string; timestamp: string; message: string }[]>([]);

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [
      { id: Date.now().toString(), timestamp: time, message },
      ...prev.slice(0, 5) // keep last 6 logs for compact look
    ]);
  };

  const handleActionClick = (label: string) => {
    addLog(`Simulated Event: Clicked Action Button "${label}" inside ng-content slot.`);
  };

  const addBreadcrumb = () => {
    if (!newBreadcrumbLabel.trim()) return;
    
    // De-activate all others if this is active
    const updated = breadcrumbs.map(item => ({
      ...item,
      isActive: false
    }));

    setBreadcrumbs([
      ...updated,
      { 
        label: newBreadcrumbLabel, 
        url: newBreadcrumbUrl || undefined, 
        isActive: true 
      }
    ]);
    setNewBreadcrumbLabel('');
    setNewBreadcrumbUrl('');
    addLog(`Added breadcrumb node: "${newBreadcrumbLabel}"`);
  };

  const removeBreadcrumb = (index: number) => {
    const removedItem = breadcrumbs[index];
    const filtered = breadcrumbs.filter((_, i) => i !== index);
    
    // Set last item as active if we removed the active one
    if (filtered.length > 0 && removedItem.isActive) {
      filtered[filtered.length - 1].isActive = true;
    }
    setBreadcrumbs(filtered);
    addLog(`Removed breadcrumb node: "${removedItem.label}"`);
  };

  const toggleActionVisibility = (id: string) => {
    setActions(actions.map(act => {
      if (act.id === id) {
        const nextState = !act.visible;
        addLog(`Toggled simulated <ng-content> button: "${act.label}" -> ${nextState ? 'visible' : 'hidden'}`);
        return { ...act, visible: nextState };
      }
      return act;
    }));
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="min-h-screen bg-[#F3F3F9] text-[#495057] flex flex-row overflow-hidden font-sans">
      
      {/* 1. Left Sidebar: Premium Velzon styling (Geometric Balance: #2A2F3E background) */}
      <aside className="w-64 bg-[#2A2F3E] text-white flex flex-col shrink-0 hidden md:flex z-10 shadow-xl border-r border-slate-800">
        <div className="p-6 border-b border-white/10 tracking-wider flex items-center gap-2.5">
          <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20">
            V
          </div>
          <span className="font-extrabold text-lg text-white tracking-widest">VELZON</span>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-6 overflow-y-auto">
          {/* Menu group */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest px-3 block mb-2">Navigation</span>
            <div className="flex items-center gap-3 px-4 py-2.5 bg-indigo-600/15 text-indigo-300 rounded-md font-semibold text-xs border border-indigo-500/10 cursor-pointer">
              <Component className="w-4 h-4" />
              <span>Page Header Builder</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-md text-xs font-medium transition-colors cursor-not-allowed">
              <Users className="w-4 h-4 opacity-70" />
              <span>User Directory</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-md text-xs font-medium transition-colors cursor-not-allowed">
              <Briefcase className="w-4 h-4 opacity-70" />
              <span>Project Matrix</span>
            </div>
          </div>

          {/* Quick Stats Widget */}
          <div className="p-4 bg-slate-900/40 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="h-3 w-3 text-indigo-400" />
              <span>Theme Spec Compliance</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Angular Version:</span>
                <span className="font-semibold text-indigo-400">v21.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">RTL Mode:</span>
                <span className={`font-semibold ${directionMode === 'rtl' ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {directionMode.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">CSS Properties:</span>
                <span className="font-semibold text-indigo-400">Logical only</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/5 text-center text-[10px] text-slate-500">
          Velzon Dashboard v4.4.3
        </div>
      </aside>

      {/* 2. Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-[#E9EBEC] flex items-center justify-between px-6 shrink-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded font-bold border border-indigo-100">
              Angular 21 Workspace
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Simulation controls */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => {
                  setThemeMode('light');
                  addLog('Simulated parent container theme -> LIGHT mode');
                }}
                className={`p-1.5 rounded-md transition-all ${
                  themeMode === 'light' 
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/10' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Switch Preview to Light Mode"
              >
                <Sun className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => {
                  setThemeMode('dark');
                  addLog('Simulated parent container theme -> DARK mode');
                }}
                className={`p-1.5 rounded-md transition-all ${
                  themeMode === 'dark' 
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/10' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Switch Preview to Dark Mode"
              >
                <Moon className="h-3.5 w-3.5" />
              </button>
              <div className="w-[1px] h-3 bg-slate-300 mx-1"></div>
              <button
                onClick={() => {
                  setDirectionMode('ltr');
                  addLog('Simulated direction layout -> LTR (Left-To-Right)');
                }}
                className={`p-1.5 rounded-md transition-all ${
                  directionMode === 'ltr' 
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/10' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Set Direction to LTR"
              >
                <AlignLeft className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => {
                  setDirectionMode('rtl');
                  addLog('Simulated direction layout -> RTL (Right-To-Left)');
                }}
                className={`p-1.5 rounded-md transition-all ${
                  directionMode === 'rtl' 
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/10' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Set Direction to RTL"
              >
                <AlignRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="w-[1px] h-6 bg-[#E9EBEC]"></div>

            {/* Profile badge */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center font-bold text-xs text-indigo-700">
                AA
              </div>
              <span className="text-xs font-semibold text-slate-700 hidden sm:inline">Anna Adame</span>
            </div>
          </div>
        </header>

        {/* Page Main Area */}
        <main className="p-6 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* Overview Callout Header */}
          <div className="p-5 bg-gradient-to-r from-indigo-900 to-indigo-950 text-white rounded-xl shadow-md space-y-2 border border-indigo-800 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-y-6 translate-x-6 opacity-10">
              <Component className="w-48 h-48" />
            </div>
            <h2 className="text-lg font-bold tracking-tight">Velzon ERP Geometric Balance Header Arena</h2>
            <p className="text-xs text-indigo-200 max-w-3xl leading-relaxed">
              Design a component compliant with Velzon Admin Dashboard v4.4.3. 
              The Angular 21 component is built with <strong>standalone: false</strong>, support for <strong>native LTR/RTL logical CSS</strong>, and dark/light modes. Customize parameters below to instantly generate compliant templates.
            </p>
          </div>

          {/* Core Interactive Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Interactive Control & Customization Workspace (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Header Properties Card */}
              <div className="bg-white border border-[#E9EBEC] rounded-lg p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-[#E9EBEC] pb-3">
                  <Settings className="h-4 w-4 text-[#405189]" />
                  <h3 className="text-xs font-bold text-[#495057] uppercase tracking-wider">Header Configuration</h3>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="title-input" className="text-xs font-semibold text-[#878A99]">Page Title</label>
                  <input
                    id="title-input"
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      addLog(`Updated @Input() title -> "${e.target.value}"`);
                    }}
                    className="w-full text-xs bg-slate-50 border border-[#E9EBEC] focus:border-[#405189] rounded px-3 py-2 text-[#495057] outline-none transition-colors"
                    placeholder="e.g. Manage Users"
                  />
                </div>
              </div>

              {/* Breadcrumbs Editor Card */}
              <div className="bg-white border border-[#E9EBEC] rounded-lg p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-[#E9EBEC] pb-3">
                  <Layers className="h-4 w-4 text-[#405189]" />
                  <h3 className="text-xs font-bold text-[#495057] uppercase tracking-wider">Breadcrumb Chain</h3>
                </div>

                {/* List of Breadcrumbs */}
                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                  {breadcrumbs.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-[#E9EBEC] text-xs">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[#878A99] font-mono">#{index + 1}</span>
                        <span className="font-bold text-[#495057] truncate">{item.label}</span>
                        {item.url && (
                          <span className="text-[10px] text-slate-400 font-mono truncate">({item.url})</span>
                        )}
                        {item.isActive && (
                          <span className="text-[9px] px-1.5 py-0.25 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded font-semibold shrink-0">
                            Active
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeBreadcrumb(index)}
                        disabled={breadcrumbs.length <= 1}
                        className="p-1 text-slate-400 hover:text-rose-500 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors cursor-pointer"
                        title="Remove node"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Breadcrumb Item Form */}
                <div className="pt-3 border-t border-[#E9EBEC] space-y-2">
                  <p className="text-[10px] font-bold text-[#878A99] uppercase tracking-wider">Add Item</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newBreadcrumbLabel}
                      onChange={(e) => setNewBreadcrumbLabel(e.target.value)}
                      className="text-xs bg-slate-50 border border-[#E9EBEC] focus:border-[#405189] rounded px-2.5 py-1.5 text-[#495057] outline-none"
                      placeholder="Label"
                    />
                    <input
                      type="text"
                      value={newBreadcrumbUrl}
                      onChange={(e) => setNewBreadcrumbUrl(e.target.value)}
                      className="text-xs bg-slate-50 border border-[#E9EBEC] focus:border-[#405189] rounded px-2.5 py-1.5 text-[#495057] outline-none"
                      placeholder="URL (optional)"
                    />
                  </div>
                  <button
                    onClick={addBreadcrumb}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-[#405189] hover:bg-[#354370] text-white rounded text-xs font-semibold transition-all shadow-sm"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>
              </div>

              {/* Action Slots / Content Projection */}
              <div className="bg-white border border-[#E9EBEC] rounded-lg p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-[#E9EBEC] pb-3">
                  <Sliders className="h-4 w-4 text-[#405189]" />
                  <h3 className="text-xs font-bold text-[#495057] uppercase tracking-wider">Projected ng-content</h3>
                </div>
                <p className="text-xs text-[#878A99] leading-relaxed">
                  Toggle action buttons to project them into the page header component actions slot in real-time.
                </p>

                <div className="space-y-2">
                  {actions.map((act) => (
                    <div key={act.id} className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-[#E9EBEC] text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          act.variant === 'primary' ? 'bg-[#405189]' :
                          act.variant === 'success' ? 'bg-[#0AB39C]' :
                          act.variant === 'secondary' ? 'bg-[#878A99]' :
                          'bg-[#3577F1]'
                        }`}></span>
                        <span className="font-semibold text-slate-700">{act.label}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={act.visible}
                          onChange={() => toggleActionVisibility(act.id)}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#405189]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Live Header Simulator + Angular File Code Tabs (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Interactive Preview Frame */}
              <HeaderPreview
                title={title}
                breadcrumbs={breadcrumbs}
                themeMode={themeMode}
                directionMode={directionMode}
                actions={actions}
                onActionClick={handleActionClick}
              />

              {/* Monitor console */}
              <div className="bg-slate-950 border border-slate-900 rounded-lg overflow-hidden shadow-lg">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-900/60 border-b border-slate-900">
                  <span className="text-[10px] font-bold font-mono text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                    <Play className="h-3 w-3 animate-pulse" />
                    Interactive Angular Event Stream
                  </span>
                  {logs.length > 0 && (
                    <button
                      onClick={clearLogs}
                      className="text-[10px] text-slate-500 hover:text-slate-300 font-mono transition-colors cursor-pointer"
                    >
                      Clear stream
                    </button>
                  )}
                </div>
                <div className="p-3 bg-slate-950 min-h-[70px] max-h-[110px] overflow-y-auto space-y-1 font-mono text-[11px]">
                  {logs.length === 0 ? (
                    <div className="text-slate-600 italic">No events generated. Interact with page action buttons in the preview to fire simulated angular template bindings.</div>
                  ) : (
                    logs.map((log) => (
                      <div key={log.id} className="flex gap-2 text-slate-400">
                        <span className="text-indigo-500 shrink-0 select-none">[{log.timestamp}]</span>
                        <span className="text-slate-300">{log.message}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Code File Tabs */}
              <AngularCodeTabs
                title={title}
                breadcrumbs={breadcrumbs}
              />

              {/* Standards and Compliance card */}
              <div className="bg-white border border-[#E9EBEC] rounded-lg p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-[#E9EBEC] pb-3">
                  <HelpCircle className="h-4 w-4 text-[#405189]" />
                  <h3 className="text-xs font-bold text-[#495057] uppercase tracking-wider">Angular 21 + SCSS Implementation Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-500 leading-relaxed">
                  <div className="space-y-1.5">
                    <p className="font-bold text-[#495057] flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      <span>CSS Logical Properties (RTL Native)</span>
                    </p>
                    <p>
                      Uses purely logical layout rules like <code>padding-inline</code>, <code>margin-inline-start</code>, and <code>border-block-end</code>. This allows seamless right-to-left layout mirrors without redundant stylesheet duplicate rules.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="font-bold text-[#495057] flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      <span>Velzon Token Interoperability</span>
                    </p>
                    <p>
                      Directly targets Velzon core theme tokens like <code>--vz-card-bg-custom</code>, <code>--vz-heading-color</code>, and <code>--vz-border-color</code> with beautiful, safe pre-configured administrative style fallbacks.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </main>

        {/* Footer info */}
        <footer className="border-t border-[#E9EBEC] bg-white py-6 text-center text-xs text-[#878A99] mt-12 shrink-0">
          <p className="max-w-md mx-auto">
            Interactive UI/UX Playground modeled in React/Tailwind. Final deliverables generated cleanly in native Angular standalone: false configuration.
          </p>
        </footer>

      </div>

    </div>
  );
}
