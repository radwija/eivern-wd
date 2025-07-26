import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

interface LinkButtonProps extends Omit<React.ComponentPropsWithoutRef<typeof Link>, 'size'>, VariantProps<typeof buttonVariants> {}

const LinkButton = ({ href, className, variant, size = 'default', ...props }: LinkButtonProps) => {
    return <Link href={href} className={cn(buttonVariants({ variant, size: size as 'default' | 'sm' | 'lg' | 'icon' }), className)} {...props} />;
};

LinkButton.displayName = 'LinkButton';

export { LinkButton };
