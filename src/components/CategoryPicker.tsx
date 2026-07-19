import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronRight, ChevronDown, Tag, Check } from 'lucide-react';
import {
  categoryGroups,
  formatCategoryPath,
  type CategorySelection,
} from '../data/categories';
import './CategoryPicker.css';

interface CategoryPickerProps {
  value: CategorySelection | null;
  onChange: (selection: CategorySelection) => void;
  placeholder?: string;
}

/**
 * A three-level nested dropdown (Group -> Category -> Subcategory) built on
 * Radix DropdownMenu.Sub. Selecting a leaf subcategory commits the full path.
 */
const CategoryPicker: React.FC<CategoryPickerProps> = ({
  value,
  onChange,
  placeholder = 'Uncategorized',
}) => {
  const selectedPath = value ? formatCategoryPath(value) : null;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={`category-picker-trigger${selectedPath ? ' has-value' : ''}`}
          aria-label="Select category"
        >
          <Tag size={14} className="category-picker-tag" />
          <span className="category-picker-label">
            {selectedPath ?? placeholder}
          </span>
          <ChevronDown size={14} className="chevron" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="dropdown-menu-content"
          sideOffset={6}
          align="start"
        >
          {/* Level 1: Groups */}
          {categoryGroups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <DropdownMenu.Sub key={group.id}>
                <DropdownMenu.SubTrigger className="dropdown-menu-item dropdown-menu-sub-trigger">
                  <GroupIcon size={14} />
                  <span className="dropdown-menu-item-text">{group.label}</span>
                  <ChevronRight size={14} className="submenu-chevron" />
                </DropdownMenu.SubTrigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.SubContent
                    className="dropdown-menu-content"
                    sideOffset={4}
                    alignOffset={-4}
                  >
                    {/* Level 2: Categories */}
                    {group.categories.map((category) => (
                      <DropdownMenu.Sub key={category.id}>
                        <DropdownMenu.SubTrigger className="dropdown-menu-item dropdown-menu-sub-trigger">
                          <span className="dropdown-menu-item-text">
                            {category.label}
                          </span>
                          <ChevronRight
                            size={14}
                            className="submenu-chevron"
                          />
                        </DropdownMenu.SubTrigger>
                        <DropdownMenu.Portal>
                          <DropdownMenu.SubContent
                            className="dropdown-menu-content"
                            sideOffset={4}
                            alignOffset={-4}
                          >
                            {/* Level 3: Subcategories (leaf) */}
                            {category.subItems.map((sub) => {
                              const isSelected =
                                value?.groupId === group.id &&
                                value?.categoryId === category.id &&
                                value?.subItemId === sub.id;
                              return (
                                <DropdownMenu.Item
                                  key={sub.id}
                                  className="dropdown-menu-item"
                                  onSelect={() =>
                                    onChange({
                                      groupId: group.id,
                                      categoryId: category.id,
                                      subItemId: sub.id,
                                    })
                                  }
                                >
                                  <span className="dropdown-menu-item-text">
                                    {sub.label}
                                  </span>
                                  {isSelected && (
                                    <Check
                                      size={14}
                                      className="submenu-check"
                                    />
                                  )}
                                </DropdownMenu.Item>
                              );
                            })}
                          </DropdownMenu.SubContent>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Sub>
                    ))}
                  </DropdownMenu.SubContent>
                </DropdownMenu.Portal>
              </DropdownMenu.Sub>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default CategoryPicker;
