import type { LucideIcon } from 'lucide-react';
import {
  Home,
  Car,
  ShoppingCart,
  Briefcase,
  Landmark,
  HeartPulse,
} from 'lucide-react';

export interface CategorySubItem {
  id: string;
  label: string;
}

export interface CategoryItem {
  id: string;
  label: string;
  subItems: CategorySubItem[];
}

export interface CategoryGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  categories: CategoryItem[];
}

/**
 * Three-level category hierarchy used by the CategoryPicker:
 *   Group  ->  Category  ->  Subcategory
 */
export const categoryGroups: CategoryGroup[] = [
  {
    id: 'housing',
    label: 'Housing',
    icon: Home,
    categories: [
      {
        id: 'rent-mortgage',
        label: 'Rent & Mortgage',
        subItems: [
          { id: 'monthly-rent', label: 'Monthly Rent' },
          { id: 'mortgage-payment', label: 'Mortgage Payment' },
          { id: 'property-tax', label: 'Property Tax' },
        ],
      },
      {
        id: 'utilities',
        label: 'Utilities',
        subItems: [
          { id: 'electricity', label: 'Electricity' },
          { id: 'water', label: 'Water' },
          { id: 'internet', label: 'Internet' },
        ],
      },
    ],
  },
  {
    id: 'transport',
    label: 'Transport',
    icon: Car,
    categories: [
      {
        id: 'vehicle',
        label: 'Vehicle',
        subItems: [
          { id: 'fuel', label: 'Fuel' },
          { id: 'maintenance', label: 'Maintenance' },
          { id: 'insurance', label: 'Insurance' },
        ],
      },
      {
        id: 'public-transit',
        label: 'Public Transit',
        subItems: [
          { id: 'monthly-pass', label: 'Monthly Pass' },
          { id: 'single-tickets', label: 'Single Tickets' },
        ],
      },
    ],
  },
  {
    id: 'shopping',
    label: 'Shopping',
    icon: ShoppingCart,
    categories: [
      {
        id: 'groceries',
        label: 'Groceries',
        subItems: [
          { id: 'supermarket', label: 'Supermarket' },
          { id: 'specialty', label: 'Specialty Foods' },
        ],
      },
      {
        id: 'electronics',
        label: 'Electronics',
        subItems: [
          { id: 'hardware', label: 'Hardware' },
          { id: 'accessories', label: 'Accessories' },
        ],
      },
    ],
  },
  {
    id: 'business',
    label: 'Business',
    icon: Briefcase,
    categories: [
      {
        id: 'software',
        label: 'Software',
        subItems: [
          { id: 'subscriptions', label: 'Subscriptions' },
          { id: 'licenses', label: 'Licenses' },
        ],
      },
      {
        id: 'services',
        label: 'Services',
        subItems: [
          { id: 'consulting', label: 'Consulting' },
          { id: 'contractors', label: 'Contractors' },
        ],
      },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: Landmark,
    categories: [
      {
        id: 'banking',
        label: 'Banking',
        subItems: [
          { id: 'fees', label: 'Account Fees' },
          { id: 'interest', label: 'Interest' },
        ],
      },
      {
        id: 'investments',
        label: 'Investments',
        subItems: [
          { id: 'stocks', label: 'Stocks' },
          { id: 'retirement', label: 'Retirement' },
        ],
      },
    ],
  },
  {
    id: 'health',
    label: 'Health',
    icon: HeartPulse,
    categories: [
      {
        id: 'medical',
        label: 'Medical',
        subItems: [
          { id: 'doctor', label: 'Doctor Visits' },
          { id: 'pharmacy', label: 'Pharmacy' },
        ],
      },
      {
        id: 'fitness',
        label: 'Fitness',
        subItems: [
          { id: 'gym', label: 'Gym Membership' },
          { id: 'equipment', label: 'Equipment' },
        ],
      },
    ],
  },
];

export interface CategorySelection {
  groupId: string;
  categoryId: string;
  subItemId: string;
}

/** Resolve a selection into a readable "Group / Category / Subcategory" path. */
export function formatCategoryPath(
  selection: CategorySelection
): string | null {
  const group = categoryGroups.find((g) => g.id === selection.groupId);
  const category = group?.categories.find((c) => c.id === selection.categoryId);
  const subItem = category?.subItems.find(
    (s) => s.id === selection.subItemId
  );
  if (!group || !category || !subItem) return null;
  return `${group.label} / ${category.label} / ${subItem.label}`;
}
