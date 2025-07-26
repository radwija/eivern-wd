import React from 'react';

const UserList: React.FC<{ users: UserProps[] }> = ({ users }) => {
    return (
        <div className="px-6 py-6">
            <h3 className="mb-4 flex-shrink-0 text-lg font-semibold text-gray-900 dark:text-white">Daftar Peserta</h3>
            <ul className="flex-grow space-y-4 overflow-y-auto pr-2">
                {users.map((user) => (
                    <li key={user.id} className="flex items-center gap-4">
                        <UserAvatar user={user} />
                        <span className="font-medium text-gray-800 dark:text-gray-200">{user.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
