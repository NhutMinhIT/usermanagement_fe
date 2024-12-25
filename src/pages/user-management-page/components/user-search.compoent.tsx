import { FC, memo } from "react";
import InputField from "../../../components/InputField/InputField";

interface UserSearchComponentProps {
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    placeholder?: string;
}

const UserSearchComponent: FC<UserSearchComponentProps> = memo(({
    onSearch,
    placeholder
}) => {
    return (
        <InputField
            type="text"
            placeholder={placeholder}
            onChange={onSearch}
        />
    );
});

UserSearchComponent.displayName = 'UserSearchComponent';

export default UserSearchComponent;