import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface FormFieldProps {
    className?: string;
    disabled?: boolean;
    id: string;
    label: string;
    type?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    autoFocus?: boolean;
    autoComplete?: string;
    error?: string;
    tabIndex?: number;
    readOnly?: boolean;
    disableWheelOnNumber?: boolean;
    formatAsCurrency?: boolean;
    allowNegative?: boolean;
    min?: string | number;
    max?: string | number;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
};

const parseCurrency = (formatted: string): number => {
    return Number(formatted.replace(/[^\d]/g, '')) || 0;
};

const FormField = ({
    className = '',
    disabled = false,
    id,
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    autoFocus = false,
    autoComplete,
    error,
    tabIndex,
    readOnly = false,
    disableWheelOnNumber = false,
    formatAsCurrency = false,
    allowNegative = true,
    min,
    max,
    ...props
}: FormFieldProps) => {
    const [displayValue, setDisplayValue] = useState(value?.toString() || '');

    useEffect(() => {
        if (formatAsCurrency && typeof value === 'number') {
            setDisplayValue(formatCurrency(value));
        } else if (!formatAsCurrency) {
            setDisplayValue(value?.toString() || '');
        }
    }, [value, formatAsCurrency]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawInput = e.target.value;

        if (formatAsCurrency) {
            const raw = parseCurrency(rawInput);
            if (!allowNegative && raw < 0) return;
            setDisplayValue(formatCurrency(raw));
            onChange?.({ ...e, target: { ...e.target, value: raw.toString() } });
        } else {
            const numericValue = Number(rawInput);
            if (type === 'number' && !allowNegative && numericValue < 0) return;

            // Optional: prevent entering a single "-" when allowNegative is false
            if (!allowNegative && rawInput.trim() === '-') return;

            setDisplayValue(rawInput);
            onChange?.(e);
        }
    };

    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                type={formatAsCurrency ? 'text' : type}
                value={displayValue}
                onChange={handleChange}
                onKeyDown={
                    !allowNegative && (type === 'number' || formatAsCurrency)
                        ? (e) => {
                              if (e.key === '-') e.preventDefault();
                          }
                        : undefined
                }
                placeholder={placeholder}
                required={required}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
                tabIndex={tabIndex}
                readOnly={readOnly}
                className={cn(className)}
                disabled={disabled}
                onWheel={disableWheelOnNumber && type === 'number' ? (e) => e.currentTarget.blur() : undefined}
                min={min}
                max={max}
                {...props}
            />

            <InputError message={error} />
        </div>
    );
};

export default FormField;
