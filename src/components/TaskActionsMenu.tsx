import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MoreHorizontal, CheckCircle2, Pencil, Copy, Trash2 } from 'lucide-react';
import './TaskActionsMenu.css';

export type TaskAction = 'complete' | 'edit' | 'duplicate' | 'delete';

interface TaskActionsMenuProps {
  taskName: string;
  onAction: (action: TaskAction) => void;
  disableComplete?: boolean;
}

const TaskActionsMenu: React.FC<TaskActionsMenuProps> = ({
  taskName,
  onAction,
  disableComplete = false,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="task-actions-trigger"
          aria-label={`Actions for ${taskName}`}
        >
          <MoreHorizontal size={16} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="dropdown-menu-content"
          sideOffset={6}
          align="end"
        >
          <DropdownMenu.Item
            className="dropdown-menu-item"
            disabled={disableComplete}
            onSelect={() => onAction('complete')}
          >
            <CheckCircle2 size={14} />
            Mark complete
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="dropdown-menu-item"
            onSelect={() => onAction('edit')}
          >
            <Pencil size={14} />
            Edit task
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="dropdown-menu-item"
            onSelect={() => onAction('duplicate')}
          >
            <Copy size={14} />
            Duplicate
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="dropdown-menu-separator" />
          <DropdownMenu.Item
            className="dropdown-menu-item danger"
            onSelect={() => onAction('delete')}
          >
            <Trash2 size={14} />
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default TaskActionsMenu;
