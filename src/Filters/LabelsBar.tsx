import React, { useState } from 'react';
import { Button } from "@components/styledComponents/Button";
import { useFilterHandlers } from '../Filters/FiltersContext'

export const LabelsBar: React.FC = () => {
  const { onSelectedTagChange } = useFilterHandlers();
  const [selectedTag, setSelectedTag] = useState<string>('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const tagName = (event.target as HTMLButtonElement).name;
    setSelectedTag(tagName);
    onSelectedTagChange(tagName);
  };

  const renderButton = (name: string, label: string): JSX.Element => {
    return (
      <Button 
        $variant={selectedTag === name ? "fullFill" : "default"} 
        name={name} 
        onClick={handleClick}
      >
        {label}
      </Button>
    );
  };

  return (
    <div className="flex flex-wrap justify-around m-1">
        {renderButton("", "Sin Filtros")}
        {renderButton("lifestyle", "Lifestyle")}
        {renderButton("mobile", "Mobile")}
        {renderButton("motor", "Motor")}
        {renderButton("work", "Work")}
    </div>
  );
};
