import styled from 'styled-components';
import { Button, Input } from 'antd'

export const AddExpenseContainer = styled.div`
    border: 1px solid gray;
    padding: 10px 20px;
`;

export const RowContainer = styled.div`
    width: 50%;
    // border: 1px solid green;
    padding: 5px;
    margin: 10px 0px 10px 0px;
    display: flex;
    gap: 20px;
    justify-content: center;
`;

export const LabelDiv = styled.div`
    width: 20%;
    display:flex;
    align-items: center;
    // border: 1px solid red;
`;

export const InputContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    // border: 1px solid blue;
`;

export const StyledInput = styled(Input)`
    width: 300px;
    height: 32px;
`;

export const ButtonContainer = styled.div`
    margin: 20px 0px 10px 0px;
    justify-content: center;
    width: 20%;
    display: flex;
    gap: 20px;
    height: 40px;
`;

export const StyledButton = styled(Button)`
    width: 125px;
`;