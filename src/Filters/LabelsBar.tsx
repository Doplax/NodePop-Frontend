import { Button } from "@components/styledComponents/Button";
import { useFilterHandlers } from '../Filters/FiltersContext'
import { useState } from 'react';

export function LabelsBar() {
  const { onSelectedTagChange } = useFilterHandlers();
  const [selectedTag, setSelectedTag] = useState('');

  const handleClick = (event) => {
    const tagName = event.target.name;
    setSelectedTag(tagName);
    onSelectedTagChange(tagName);
  };

  const renderButton = (name, label) => {
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
}
