export const SEARCH_INPUT_PLACEHOLDER: string = 'Search....';
export const CREATE_USER_BUTTON: string = 'Add';
export const RELOAD_USER_BUTTON: string = 'Reload';

// user management component
export const USER_LOADING: string = 'Loading...';
export const NO_DATA_AVAILABLE: string = 'No data available';

export const DIALOG_CONFIRM_REMOVE_USER_TITLE: string = 'Are you sure you want to remove this user?';

//create user dialog
export const DIALOG_CREATE_USER_TITLE: string = 'Create New User';
export const DIALOG_CREATE_USER_DATA_TEST_ID: string = 'create-user-form';

//update user dialog
export const DIALOG_UPDATE_USER_TITLE: string = 'Update User';
export const DIALOG_UPDATE_USER_DATA_TEST_ID: string = 'update-user-form';

//user name text field
export const TEXTFIELD_USERNAME_DATA_TESTID: string = 'username';
export const TEXTFIELD_USERNAME_LABEL: string = 'Username';
export const TEXTFIELD_USERNAME_NAME: string = 'username';

//full name text field
export const TEXTFIELD_FULLNAME_DATA_TESTID: string = 'fullName';
export const TEXTFIELD_FULLNAME_LABEL: string = 'Full Name';
export const TEXTFIELD_FULLNAME_NAME: string = 'fullName';

//email text field
export const TEXTFIELD_EMAIL_DATA_TESTID: string = 'email';
export const TEXTFIELD_EMAIL_LABEL: string = 'Email';
export const TEXTFIELD_EMAIL_NAME: string = 'email';

//password text field
export const TEXTFIELD_PASSWORD_DATA_TESTID: string = 'password';
export const TEXTFIELD_PASSWORD_LABEL: string = 'Password';
export const TEXTFIELD_PASSWORD_NAME: string = 'password';

export const SELECT_ROLE_TITLE: string = 'Select Role';
export const SELECT_ROLE_DATA_TESTID: string = 'role';
export const SELECT_ROLE_LABEL: string = 'Role';
export const SELECT_ROLE_LABEL_ID: string = 'role-label';
export const SELECT_ROLE_NAME: string = 'role';

export const BUTTON_SUBMIT_CREATE_USER_DATA_TEST_ID: string = 'submit-create-user-form';
export const BUTTON_SUBMIT_CREATE_USER_TEXT: string = 'Create User';

export const BUTTON_CANCEL_CREATE_USER_DATA_TEST_ID: string = 'close-create-user-form';
export const BUTTON_CANCEL_CREATE_USER_TEXT: string = 'Cancel';

export const BUTTON_SUBMIT_UPDATE_USER_DATA_TEST_ID: string = 'submit-update-user-form';
export const BUTTON_SUBMIT_UPDATE_USER_TEXT: string = 'Update User';

export const BUTTON_CANCEL_UPDATE_USER_DATA_TEST_ID: string = 'close-update-user-form';
export const BUTTON_CANCEL_UPDATE_USER_TEXT: string = 'Cancel';

//validation error messages
export const ERROR_USERNAME_REQUIRED: string = 'Username is required';
export const ERROR_USERNAME_MIN_LENGTH: string = 'Username must be at least 3 characters';
export const ERROR_USERNAME_MIN_LENGTH_NUMBER: number = 3;
export const ERROR_USERNAME_MAX_LENGTH: string = 'Username must not exceed 50 characters';
export const ERROR_USERNAME_MAX_LENGTH_NUMBER: number = 50;

export const ERROR_FULLNAME_REQUIRED: string = 'Full name is required';
export const ERROR_FULLNAME_MIN_LENGTH: string = 'Full name must be at least 2 characters';
export const ERROR_FULLNAME_MIN_LENGTH_NUMBER: number = 2;
export const ERROR_FULLNAME_MAX_LENGTH: string = 'Full name must not exceed 50 characters';
export const ERROR_FULLNAME_MAX_LENGTH_NUMBER: number = 50;

export const ERROR_EMAIL_REQUIRED: string = 'Email is required';
export const ERROR_EMAIL_INVALID_FORMAT: string = 'Invalid email format';
export const EMAIL_REGEX: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const VALID_ROLES: string[] = ['admin', 'manager', 'staff', 'user'];
export const ERROR_ROLE_REQUIRED: string = 'Role is required';
export const ERROR_INVALID_ROLE: string = 'Invalid role';   
