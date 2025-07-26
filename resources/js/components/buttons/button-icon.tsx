import { ArrowLeft } from 'lucide-react';
import { LinkButton } from './link-button';

interface ButtonIconProps {
    href: string;
}

export function ButtonIcon({ href }: ButtonIconProps) {
    return (
        <LinkButton href={href} variant="default" size="icon">
            <ArrowLeft />
        </LinkButton>
    );
}
