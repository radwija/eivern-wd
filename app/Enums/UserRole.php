<?php

namespace App\Enums;

enum UserRole: string
{
    case STUDENT = 'student';
    case ADMIN = 'admin';
    case ORGANIZATION_UKM = 'ORGANIZATION_UKM-ukm';

    public function label(): string
    {
        return match ($this) {
            self::STUDENT => 'Student',
            self::ADMIN => 'Admin',
            self::ORGANIZATION_UKM => 'ORGANIZATION_UKM/UKM',
        };
    }
}
