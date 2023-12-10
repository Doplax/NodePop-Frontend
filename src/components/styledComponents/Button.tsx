import styled from 'styled-components';

// Estilos para las variantes de los botones
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
        background-color: #ff4d4f; // Tono rojizo
        color: white;
        border: 1px solid #ff4d4f;
        &:hover {
            background-color: #d73834; // Tono rojo ocre al hacer hover
            border-color: #d73834;
        }
    `
};

// Estilos para los tamaños de los botones
const sizes = {
    default: `
        width: auto; // Tamaño por defecto, no ocupa todo el ancho
    `,
    full: `
        width: 100%; // Ocupa todo el ancho del contenedor
    `
};

type Variant = 'fullFill' | 'default' | 'danger';
type Size = 'default' | 'full';

// Creación del componente Button con estilos condicionales
export const Button = styled.button<{ $variant?: Variant; $size?: Size }>`
    cursor: pointer;
    white-space: nowrap;
    height: 40px;
    border-radius: 30px;
    
    // Aplica los estilos de variantes
    ${props => styles[props.$variant || 'default']}
    
    // Aplica los estilos de tamaño
    ${props => sizes[props.$size || 'default']}
`;
