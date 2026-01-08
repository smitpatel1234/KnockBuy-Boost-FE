export type MultiSelectType = { item_id: string; item_name: string }[];

export interface MultiSelectItem {
    item_id: string;
    item_name: string;
}

export interface MultiSelectProps {
    data: MultiSelectItem[];
    selectedItems: MultiSelectItem[];
    onChange: (items: MultiSelectItem[]) => void;
    placeholder?: string;
    label?: string;
    className?: string;
}