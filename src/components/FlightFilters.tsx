import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

interface FlightFiltersProps {
  priceRange: number[];
  onPriceChange: (value: number[]) => void;
  maxDuration: number;
  onDurationChange: (value: number[]) => void;
  selectedStops: number[];
  onStopsChange: (stops: number[]) => void;
}

export function FlightFilters({
  priceRange,
  onPriceChange,
  maxDuration,
  onDurationChange,
  selectedStops,
  onStopsChange
}: FlightFiltersProps) {
  const handleStopChange = (stop: number, checked: boolean) => {
    if (checked) {
      onStopsChange([...selectedStops, stop]);
    } else {
      onStopsChange(selectedStops.filter(s => s !== stop));
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-gray-800 mb-4">Filtros</h3>
        
        {/* Price Range */}
        <div className="mb-6">
          <Label className="text-gray-700 mb-3 block">Precio</Label>
          <Slider
            value={priceRange}
            onValueChange={onPriceChange}
            min={0}
            max={2000000}
            step={50000}
            className="mb-2"
          />
          <div className="flex justify-between text-gray-600">
            <span>${priceRange[0].toLocaleString('es-CO')}</span>
            <span>${priceRange[1].toLocaleString('es-CO')}</span>
          </div>
        </div>

        {/* Duration */}
        <div className="mb-6">
          <Label className="text-gray-700 mb-3 block">Duración máxima</Label>
          <Slider
            value={[maxDuration]}
            onValueChange={(value) => onDurationChange(value)}
            min={60}
            max={600}
            step={30}
            className="mb-2"
          />
          <div className="text-gray-600">
            Hasta {Math.floor(maxDuration / 60)}h {maxDuration % 60}min
          </div>
        </div>

        {/* Stops */}
        <div>
          <Label className="text-gray-700 mb-3 block">Escalas</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="direct"
                checked={selectedStops.includes(0)}
                onCheckedChange={(checked) => handleStopChange(0, checked as boolean)}
              />
              <label
                htmlFor="direct"
                className="text-gray-700 cursor-pointer"
              >
                Vuelo directo
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="one-stop"
                checked={selectedStops.includes(1)}
                onCheckedChange={(checked) => handleStopChange(1, checked as boolean)}
              />
              <label
                htmlFor="one-stop"
                className="text-gray-700 cursor-pointer"
              >
                1 escala
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="two-stops"
                checked={selectedStops.includes(2)}
                onCheckedChange={(checked) => handleStopChange(2, checked as boolean)}
              />
              <label
                htmlFor="two-stops"
                className="text-gray-700 cursor-pointer"
              >
                2 escalas
              </label>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
