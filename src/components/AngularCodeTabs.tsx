import React, { useState } from 'react';
import { Check, Copy, Code, FileCode, Server, Info } from 'lucide-react';

interface CodeTabsProps {
  title: string;
  breadcrumbs: { label: string; url?: string; isActive?: boolean }[];
}

export default function AngularCodeTabs({ title, breadcrumbs }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'scss' | 'ts' | 'module'>('html');
  const [copied, setCopied] = useState<string | null>(null);

  const formatBreadcrumbsArray = () => {
    return JSON.stringify(breadcrumbs, null, 2)
      .replace(/"([^"]+)":/g, '$1:') // convert keys to unquoted JS keys
      .replace(/"/g, "'"); // convert double quotes to single quotes for typical Angular conventions
  };

  const codeFiles = {
    html: {
      filename: 'erp-page-header.component.html',
      language: 'html',
      content: `<!-- 
  Velzon-Inspired Page Header (v4.4.3 Component)
  Fully responsive & RTL compliant HTML Template
-->
<div class="erp-page-header" id="erpPageHeaderContainer">
  <div class="erp-page-header-title-box">
    <h4 class="erp-page-header-title">{{ title }}</h4>
    <nav class="erp-page-header-breadcrumb-nav" aria-label="breadcrumb">
      <ol class="erp-page-header-breadcrumb">
        <li 
          *ngFor="let item of breadcrumbs; let last = last" 
          class="erp-page-header-breadcrumb-item" 
          [class.active]="last || item.isActive"
          [attr.aria-current]="(last || item.isActive) ? 'page' : null"
        >
          <a *ngIf="!last && !item.isActive && item.url; else staticLabel" [href]="item.url">
            {{ item.label }}
          </a>
          <ng-template #staticLabel>
            <span>{{ item.label }}</span>
          </ng-template>
        </li>
      </ol>
    </nav>
  </div>
  
  <div class="erp-page-header-actions">
    <!-- Action buttons passed in from page template go here -->
    <ng-content></ng-content>
  </div>
</div>`
    },
    scss: {
      filename: 'erp-page-header.component.scss',
      language: 'scss',
      content: `/* ==========================================================================
   ERP Page Header Component Styles (Velzon-Inspired v4.4.3)
   Built purely with CSS Logical Properties & CSS variables (Dark/RTL native)
   ========================================================================== */

:host {
  // Theme Variables (Light mode defaults, mapped to Velzon tokens with strict fallbacks)
  --erp-header-bg: var(--vz-card-bg-custom, var(--vz-body-bg, #ffffff));
  --erp-header-title-color: var(--vz-heading-color, #495057);
  --erp-header-border-color: var(--vz-border-color, #e9ebec);
  --erp-breadcrumb-item-color: var(--vz-text-muted, #878a99);
  --erp-breadcrumb-item-active-color: var(--vz-primary, #405189);
  --erp-breadcrumb-separator-color: var(--vz-text-muted, #adb5bd);
  --erp-header-shadow: var(--vz-box-shadow, 0 1px 2px rgba(56, 65, 74, 0.15));

  display: block;
  width: 100%;
}

// Native Dark Mode support triggered by typical parent tags (e.g. [data-layout-mode="dark"])
:host-context([data-layout-mode="dark"]),
:host-context([data-theme="dark"]),
:host-context(.dark) {
  --erp-header-bg: var(--vz-card-bg-custom, var(--vz-body-bg, #1a1d21));
  --erp-header-title-color: var(--vz-heading-color, #f3f6f9);
  --erp-header-border-color: var(--vz-border-color, #2a2f34);
  --erp-breadcrumb-item-color: var(--vz-text-muted, #878a99);
  --erp-breadcrumb-item-active-color: var(--vz-primary, #3577f1);
  --erp-breadcrumb-separator-color: var(--vz-text-muted, #495057);
  --erp-header-shadow: var(--vz-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.2));
}

// Page Header Container Layout
.erp-page-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  gap: 1rem;
  padding-block: 1.25rem; // 20px top/bottom
  padding-inline: 1.5rem; // 24px left/right
  background-color: var(--erp-header-bg);
  border-block-end: 1px solid var(--erp-header-border-color);
  box-shadow: var(--erp-header-shadow);
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  @media (min-width: 576px) {
    flex-direction: row;
    align-items: center;
  }
}

// Left Section: Title & Breadcrumbs
.erp-page-header-title-box {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

// Page Title Styling
.erp-page-header-title {
  margin: 0;
  font-size: 1.125rem; // 18px matching Velzon premium header size
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  color: var(--erp-header-title-color);
  line-height: 1.2;
  font-family: var(--vz-font-sans-serif, 'Inter', sans-serif);
}

// Breadcrumbs Navigation
.erp-page-header-breadcrumb-nav {
  display: flex;
  align-items: center;
}

.erp-page-header-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
  font-size: 0.8125rem; // 13px
  font-weight: 500;
}

.erp-page-header-breadcrumb-item {
  display: flex;
  align-items: center;
  color: var(--erp-breadcrumb-item-color);

  a {
    color: var(--erp-breadcrumb-item-color);
    text-decoration: none;
    transition: color 0.15s ease-in-out;

    &:hover {
      color: var(--erp-breadcrumb-item-active-color);
    }
  }

  &.active {
    color: var(--erp-breadcrumb-item-active-color);
    font-weight: 600;
  }

  // Purely logical properties for native RTL direction support
  & + .erp-page-header-breadcrumb-item {
    padding-inline-start: 0.5rem;

    &::before {
      content: "/";
      display: inline-block;
      padding-inline-end: 0.5rem;
      color: var(--erp-breadcrumb-separator-color);
    }
  }
}

// Right Section: Custom ng-content action area
.erp-page-header-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  
  // Clean styles for custom buttons loaded in ng-content slot
  ::ng-deep {
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.375rem;
      font-weight: 500;
      transition: all 0.15s ease-in-out;
    }
  }
}`
    },
    ts: {
      filename: 'erp-page-header.component.ts',
      language: 'typescript',
      content: `import { Component, Input } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-erp-page-header',
  templateUrl: './erp-page-header.component.html',
  styleUrls: ['./erp-page-header.component.scss'],
  standalone: false
})
export class ErpPageHeaderComponent {
  /**
   * Title of the ERP section (uppercase styled by scss)
   */
  @Input() title: string = 'Dashboard';

  /**
   * Array of breadcrumb navigation nodes
   */
  @Input() breadcrumbs: BreadcrumbItem[] = [];
}`
    },
    module: {
      filename: 'erp-page-header.module.ts',
      language: 'typescript',
      content: `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErpPageHeaderComponent } from './erp-page-header.component';

@NgModule({
  declarations: [
    ErpPageHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErpPageHeaderComponent
  ]
})
export class ErpPageHeaderModule { }`
    }
  };

  const handleCopy = (key: keyof typeof codeFiles) => {
    navigator.clipboard.writeText(codeFiles[key].content);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* File selection bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5 text-indigo-400" />
          <span className="font-mono text-xs font-semibold text-slate-200">Angular Files Generated</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2 sm:mt-0">
          {(Object.keys(codeFiles) as Array<keyof typeof codeFiles>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                activeTab === key
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {codeFiles[key].filename}
            </button>
          ))}
        </div>
      </div>

      {/* Code window */}
      <div className="relative">
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <button
            onClick={() => handleCopy(activeTab)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors border border-slate-700"
          >
            {copied === activeTab ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        <pre className="p-5 overflow-auto text-xs font-mono text-slate-300 bg-slate-900/50 max-h-[480px] leading-relaxed">
          <code>{codeFiles[activeTab].content}</code>
        </pre>
      </div>

      {/* Quick Integration Guide */}
      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <div className="flex items-start gap-2.5">
          <Info className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-slate-200">Integration Guidelines (Velzon Admin Dashboard v4.4.3):</p>
            {activeTab === 'html' && (
              <p>
                The HTML template leverages <code>*ngFor</code> to dynamically render the array of breadcrumbs. Standard bootstrap layout values are used.
              </p>
            )}
            {activeTab === 'scss' && (
              <p>
                This SCSS file is fully standalone, uses CSS logical properties (like <code>padding-inline-start</code> instead of <code>padding-left</code>) to support perfect RTL mirroring natively, and references Velzon design CSS variables like <code>--vz-card-bg-custom</code>.
              </p>
            )}
            {activeTab === 'ts' && (
              <p>
                The component accepts inputs for <code>title</code> and <code>breadcrumbs</code>. Standard decorator syntax is used with <code>standalone: false</code>.
              </p>
            )}
            {activeTab === 'module' && (
              <p>
                Import this module inside your target feature module or <code>SharedModule</code> in an NgModule-based Angular application.
              </p>
            )}
            <div className="pt-2">
              <span className="font-semibold text-slate-300">How to use in your template:</span>
              <pre className="mt-1 p-2 bg-slate-900 rounded border border-slate-800 text-[11px] text-indigo-300 overflow-x-auto">
{`<app-erp-page-header 
  title="${title}" 
  [breadcrumbs]="${formatBreadcrumbsArray().replace(/\n/g, '').replace(/\s+/g, ' ')}"
>
  <button class="btn btn-soft-secondary btn-sm">Export</button>
  <button class="btn btn-primary btn-sm">Add New</button>
</app-erp-page-header>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
