import styled from 'styled-components'

const styles = {
    fullFill: `
        font-size: 18px;
        padding: 0 20px;
        background-color: var(--primary-color);
        color: white;
        &:hover {
            background-color: var(--secondary-color);
            color: white;
        }
    `,

    default: `
        font-size: 18px;
        padding: 0 20px;
        border: 1px solid var(--primary-color);
        color: var(--primary-color);
        &:hover {
            background-color: var(--primary-color);
            color: white;
        }
    `,

    danger: `
        font-size: 18px;
        padding: 0 20px;
        background-color: #ff4d4f; 
        color: white;
        border: 1px solid #ff4d4f; 
        &:hover {
            background-color: #d73834; 
            border-color: #d73834; 
        }
    `
}

type Variant = 'fullFill' | 'default' | 'danger'; // Añade 'danger' al tipo de variantes

export const Button = styled.button<{$variant?: Variant}>`
    cursor: pointer;
    white-space: nowrap;
    height: 40px;
    border-radius: 30px;

    ${props => {
        const variant = props.$variant || 'default'; // Si $variant no está definido, usa 'default'
        return styles[variant]; // Retorna los estilos correspondientes a la variante
    }}
`;
