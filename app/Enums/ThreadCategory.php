<?php

namespace App\Enums;

enum ThreadCategory: string
{
    case LOST_ITEMS = 'lost-items';
    case STUDY = 'study';

    public function label(): string
    {
        return match ($this) {
            self::LOST_ITEMS => 'Lost Items',
            self::STUDY => 'Study',
        };
    }
}
