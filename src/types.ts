export interface BreadcrumbItem {
  label: string;
  url?: string;
  isActive?: boolean;
}

export interface HeaderAction {
  id: string;
  label: string;
  icon: string; // lucide icon name
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'info';
  visible: boolean;
}

export type ThemeMode = 'light' | 'dark';
export type DirectionMode = 'ltr' | 'rtl';
