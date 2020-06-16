import classNames from 'styled-classnames';

export const progressStyleClass = classNames`
    cursor: pointer;
    width: 100%;
    height: 10px;
    background: skyblue;

    & > div {
        background: cyan;
        height: 100%;
        transition: width .2s ease-in;
    }
`;
