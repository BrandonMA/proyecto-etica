import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

interface Props {
    className?: string,
    variant: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "light" | "dark",
    disabled: boolean,
    loading: Boolean,
    spinnerVariant: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "light" | "dark"
    title: string
}

const LoadingButton: React.FunctionComponent<Props> = (props) => {
    return (
        <Button
            className = { props.className }
            variant = { props.variant }
            type = 'submit'
            disabled ={ props.disabled} >
            {
                props.loading ? 
                <Spinner animation = 'grow' variant = { props.spinnerVariant }/> : props.title
            }
        </Button>
    );
}

export default LoadingButton;
