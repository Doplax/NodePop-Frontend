import { Button } from "@components/styledComponents/Button";
import { useFilterHandlers } from '../Filters/FiltersContext'

export function LabelsBar() {
  const { onSelectedTagChange }   = useFilterHandlers()

  const handleClick = (event) => {
    onSelectedTagChange(event.target.name)
  }

  return (
    <div className="flex flex-wrap justify-around m-1">
        <Button $variant="danger" name="" onClick={handleClick}>Borrar</Button>
        <Button $variant="default" name="lifestyle" onClick={handleClick}> Lifestyle</Button>
        <Button $variant="default" name="mobile" onClick={handleClick}> Mobile</Button>
        <Button $variant="default" name="motor" onClick={handleClick}> Motor</Button>
        <Button $variant="default" name="work" onClick={handleClick}> Work</Button>
    </div>
  )
}
