import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href?: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    roles?: string[];
    children?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

interface UserRole {
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role: string | null;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Event {
    id: number;
    title: string;
    organizer_id: number;
    organizer?: User;
    description: string;
    image: string;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Comment {
    id: number;
    user_id: number;
    thread_id: number;
    user: User;
    thread: Thread;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Thread {
    id: number;
    category: 'lost-items' | 'study';
    user_id: number;
    user?: User;
    title: string;
    is_active: boolean;
    description: string;
    contact_name: string;
    phone_number: string;
    comments: Comment[];
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Image {
    id: number;
    thread_id: number;
    thread: Thread;
    url: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface ChatGroup {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Message {
    id: number;
    user_id: number;
    chat_group_id: number;
    content: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}
