import styled from 'styled-components'


const styles = {
    primary: `
        background-color:red;
    `,

    default: `
        font-size: .875rem;
        padding: 0 20px;
        height: 40px;
        background-color: #fff;
        border: 1px solid #13c1ac;
        color: #13c1ac;
        cursor: pointer;
        white-space: nowrap;
    `
}

type Variant = 'primary' | 'default';

export const Button = styled.button<{$variant?: Variant}>`
    ${props => {
        const variant = props.$variant || 'default'; // Si $variant no está definido, usa 'default'
        return styles[variant];
    }}
`;
