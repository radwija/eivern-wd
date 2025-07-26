<?php

namespace App\Enums;

enum UserRole: string
{
    case STUDENT = 'student';
    case ADMIN = 'admin';
    case UKM = 'ukm';

    public function label(): string
    {
        return match ($this) {
            self::STUDENT => 'Student',
            self::ADMIN => 'Admin',
            self::UKM => 'UKM',
        };
    }
}
