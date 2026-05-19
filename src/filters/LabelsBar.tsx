import { Button } from "@components/styledComponents/Button";
import { useFilterHandlers, useFilterValues } from '@filters/FiltersContext'
import { MouseEvent } from 'react';
import { PRODUCT_TAGS, Tag } from '@shared/dtos';

const TAG_LABELS: Record<Tag | '', string> = {
  '': 'Sin filtros',
  lifestyle: 'Lifestyle',
  mobile: 'Mobile',
  motor: 'Motor',
  work: 'Work',
};

export function LabelsBar() {
  const { onSelectedTagChange } = useFilterHandlers();
  const { selectedTag } = useFilterValues();

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    onSelectedTagChange(event.currentTarget.name);
  };

  const renderButton = (name: Tag | '') => (
    <Button
      key={name || 'all'}
      $variant={selectedTag === name ? 'fullFill' : 'default'}
      name={name}
      onClick={handleClick}
    >
      {TAG_LABELS[name]}
    </Button>
  );

  return (
    <div className="flex flex-wrap justify-around m-1 gap-2">
      {renderButton('')}
      {PRODUCT_TAGS.map((tag) => renderButton(tag))}
    </div>
  );
}
