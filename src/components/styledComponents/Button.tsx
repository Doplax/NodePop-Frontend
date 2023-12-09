import styled from 'styled-components'


const styles = {
    fullFill: `
        font-size: 18px;
        padding: 0 20px;
        height: 40px;
        border-radius: 30px;
        border: 1px solid #13c1ac;
        background-color: #13c1ac;
        color: white;
        cursor: pointer;
        white-space: nowrap;
    `,

    default: `
        font-size: 18px;
        padding: 0 20px;
        height: 40px;
        border-radius: 30px;
        border: 1px solid #13c1ac;
        color: #13c1ac;
        cursor: pointer;
        white-space: nowrap;
    `
}

type Variant = 'fullFill' | 'default';

export const Button = styled.button<{$variant?: Variant}>`
    ${props => {
        const variant = props.$variant || 'default'; // Si $variant no está definido, usa 'default'
        return styles[variant];
    }}
`;
