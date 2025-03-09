import { HexColorInput, HexColorPicker } from "react-colorful";
interface Props {
  value?: string;
  onPickerChange: (color: string) => void;
}
const ColorPicker = ({ value, onPickerChange }: Props) => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center justify-start">
        <p>#</p>
        <HexColorInput
          color={value}
          onChange={onPickerChange}
          className="h-full bg-transparent font-ibm-plex-sans outline-none"
        />
        <HexColorPicker color={value} onChange={onPickerChange} />
      </div>
    </div>
  );
};

export default ColorPicker;
