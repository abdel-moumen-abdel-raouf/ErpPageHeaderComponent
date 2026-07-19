// @ts-nocheck
import { Component, Input } from '@angular/core';

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
}
