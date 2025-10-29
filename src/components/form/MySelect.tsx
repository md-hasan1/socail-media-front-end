/* eslint-disable @typescript-eslint/no-unused-vars */
// components/MySelect.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { useState, useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface MySelectProps {
    label: string;
    name: string;
    options: string[];
    defaultValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

const MySelect: React.FC<MySelectProps> = ({
    label,
    name,
    options,
    defaultValue,
    onChange,
    placeholder = "Select an option",
    disabled = false,
    required = false,
    className = "",
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const {
        field: { value, onChange: fieldOnChange },
        fieldState: { error },
    } = useController({
        name,
        control,
        defaultValue,
        rules: { required: required ? `${label} is required` : false },
    });

    const [ selectedValue, setSelectedValue ] = useState(defaultValue || value);

    useEffect(() => {

        if (value !== selectedValue) {
            setSelectedValue(value);
        }
    }, [ value, selectedValue ]);

    const handleChange = (value: string) => {
        setSelectedValue(value);
        fieldOnChange(value);
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <div className={`flex flex-col space-y-2 ${className}`}>
            {label && <label className="text-sm font-semibold">{label}</label>}
            <Select value={selectedValue} onValueChange={handleChange} disabled={disabled}>
                <SelectTrigger className="w-full border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-primary-500">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && <p className="mt-1 text-sm text-red-500">{error?.message}</p>}
        </div>
    );
};

export default MySelect;
