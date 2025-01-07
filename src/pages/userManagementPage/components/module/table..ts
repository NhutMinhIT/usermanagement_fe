import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';

type TableHeaderMappingType = { key: string; label: string }[];

export const rowHeaderMapping: TableHeaderMappingType = [
    { key: 'fullname', label: 'Fullname' },
    { key: 'role', label: 'Role' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'action', label: 'Action' },
];

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 14,
        padding: '8px',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: '8px',
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));