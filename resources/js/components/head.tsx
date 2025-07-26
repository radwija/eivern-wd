interface HeadingProps {
    title: string;
    description?: string;
    backButton?: React.ReactNode;
    action?: React.ReactNode;
}

export default function Heading({ title, description, action, backButton }: HeadingProps) {
    return (
        <div className="mb-8 items-center justify-between rounded-md border-1 p-4 shadow-sm lg:flex lg:space-y-0.5 lg:p-6">
            <div className="mb-4 lg:mb-0">
                <div className="flex items-center gap-2">
                    {backButton}
                    <h1 className="mb-1 text-xl font-semibold tracking-tight lg:text-3xl">{title}</h1>
                </div>

                {description && <p className="mt-1 text-xs font-normal text-muted-foreground md:text-sm">{description}</p>}
            </div>

            {action}
        </div>
    );
}
