import React from 'react';
import cx from 'classnames';

const TextInput = (props) => {
    const {
        submitted, value,
        errorMessage, name,
        placeholder, onChange,
        type,
    } = props;
    const invalid = submitted && !value;
    const styles = cx('form-group', { 'has-error': invalid });
    const handleChange = (e) => {
        const { target: { value, name } } = e;
        onChange({ value, name });
    };
    return (
        <div className={styles}>
            <div className="input-group">
                <input
                    type={type}
                    className="form-control"
                    name={name}
                    autoComplete="off"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                />
            </div>
            {invalid && (
                <div className="text-error">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

TextInput.defaultProps = {
    type: 'text',
};

export default TextInput;
