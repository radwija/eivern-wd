import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { SharedData, type NavItem } from '@/types';
import { UserRoleEnum } from '@/types/enum';
import { Link, usePage } from '@inertiajs/react';
import { ChevronUp, LayoutGrid, Megaphone, Search } from 'lucide-react';
import { useMemo } from 'react';
import AppLogo from './app-logo';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Forum',
        icon: Megaphone,
        roles: [UserRoleEnum.STUDENT, UserRoleEnum.ADMIN, UserRoleEnum.UKM],
        children: [
            {
                title: 'Lost Items',
                href: '/lost-items',
                icon: Search,
                roles: [UserRoleEnum.ADMIN, UserRoleEnum.STUDENT, UserRoleEnum.UKM],
            },
        ],
    },
];

/**
 * Fungsi rekursif untuk memfilter item navigasi berdasarkan peran tunggal pengguna.
 */
const filterNavItemsByRole = (items: NavItem[], userRole: string | null): NavItem[] => {
    // Jika tidak ada peran, hanya tampilkan item yang tidak memerlukan peran (publik)
    if (!userRole) {
        return items.filter((item) => !item.roles);
    }

    return items.reduce<NavItem[]>((accumulator, item) => {
        const hasAccess = !item.roles || item.roles.includes(userRole);

        if (item.children) {
            const accessibleChildren = filterNavItemsByRole(item.children, userRole);
            if (accessibleChildren.length > 0) {
                accumulator.push({ ...item, children: accessibleChildren });
            }
        } else if (hasAccess) {
            accumulator.push(item);
        }

        return accumulator;
    }, []);
};

export function AppSidebar() {
    const { url } = usePage();
    const { props } = usePage<SharedData>();

    // FIX: Ambil 'role' langsung sebagai string, karena backend sudah mengirimkannya sebagai string.
    const userRole = props.auth.user?.role || null;

    const filteredItems = useMemo(() => {
        if (!props.auth.user) return [];
        return filterNavItemsByRole(navItems, userRole);
    }, [props.auth.user, userRole]);

    return (
        <Sidebar collapsible="offcanvas" variant="sidebar">
            <SidebarHeader className="mb-4">
                <SidebarMenu>
                    <SidebarMenuItem className="border-b-1 pb-2">
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch aria-label="logo" className="md:py-8">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {filteredItems.map((item) => {
                                const isActiveParent = item.children?.some((child) => child.href && url.startsWith(child.href)) ?? false;

                                return item.children ? (
                                    <Collapsible key={item.title} className="group/collapsible" defaultOpen={isActiveParent}>
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton asChild>
                                                    <button
                                                        className="flex w-full items-center"
                                                        aria-expanded={isActiveParent}
                                                        aria-controls={`section-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                                                    >
                                                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                                        {item.title}
                                                        <ChevronUp className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                                    </button>
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                        </SidebarMenuItem>

                                        <CollapsibleContent id={`section-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                            {item.children?.map((child) =>
                                                child.href ? (
                                                    <SidebarMenuItem key={child.title} className="pl-6">
                                                        <SidebarMenuButton
                                                            asChild
                                                            className={cn(
                                                                'transition-colors',
                                                                url.startsWith(child.href)
                                                                    ? 'bg-[#006BFF] text-gray-100 dark:bg-muted dark:text-foreground'
                                                                    : 'hover:bg-gray-100 hover:text-black dark:hover:bg-muted/70 dark:hover:text-white',
                                                            )}
                                                        >
                                                            <Link href={child.href}>
                                                                {child.icon && <child.icon className="mr-2 h-4 w-4" />}
                                                                {child.title}
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                ) : null,
                                            )}
                                        </CollapsibleContent>
                                    </Collapsible>
                                ) : (
                                    item.href && (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                className={cn(
                                                    'transition-colors',
                                                    url.startsWith(item.href)
                                                        ? 'bg-[#006BFF] text-gray-100 dark:bg-muted dark:text-foreground'
                                                        : 'hover:bg-gray-100 hover:text-black dark:hover:bg-muted/70 dark:hover:text-white',
                                                )}
                                            >
                                                <Link href={item.href}>
                                                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                                    {item.title}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
