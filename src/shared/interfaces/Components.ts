export interface AuthButtonProps {
  toggleMenu: (value: boolean) => void;
}

export interface RenderAdvertProps {
  advertData: {
    _id: string;
    name: string;
    sale: boolean;
    price: number;
    tags: string[];
    imgSrc: string;
  };
}

export interface RenderAdvertListProps {
  advertsList: Array<{
    _id: string;
    name: string;
    sale: boolean;
    price: number;
    tags: string[];
    imgSrc: string;
  }>;
}

export interface ModalProps {
  onClose: () => void;
  onDelete: () => void;
}

export interface ColumnProps {
  title: string;
  links: string[];
}