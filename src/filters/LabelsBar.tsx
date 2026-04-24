import { Button } from "@components/styledComponents/Button";
import { useFilterHandlers } from '@filters/FiltersContext'
import { useState, MouseEvent } from 'react';

export function LabelsBar() {
  const { onSelectedTagChange } = useFilterHandlers();
  const [selectedTag, setSelectedTag] = useState('');

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    const tagName = event.currentTarget.name;
    setSelectedTag(tagName);
    onSelectedTagChange(tagName);
  };

  const renderButton = (name: string, label: string) => {
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
