interface IconMenuButton {
  icon: React.ReactNode;
  onClick: () => void;
  label: string;
  type?: "button";
  disabled?: boolean;
  isActive?: boolean;
}

/** Interface for icon menu divider items */
export interface IconMenuDivider {
  type: "divider";
}

/** Interface for icon menu search items */
export interface IconMenuSearch {
  type: "search";
}

/** Union type for icon menu items */
export type IconMenu = IconMenuButton | IconMenuDivider;
/** Type for search expanded state tuple */
export type SearchExpandedState = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];
