import React from 'react';
import styles from './errorTerminal.module.scss';

type ErrorTerminalProps = {
    errors: { [key: string]: string };
    //errors: string[];
};

function ErrorTerminal({ errors }: ErrorTerminalProps) {
    const hasErrors = Object.entries(errors).length > 0;

    return (
        <>
            {hasErrors ? (
                <div className={styles.errorTerminalContainer}>
                    <span className="terminalArrow">{'> '}</span>
                    {Object.values(errors).map((error: string) => (
                        <p>{error}</p>
                    ))}
                </div>
            ) : (
                <div />
            )}
        </>
    );
}

export default ErrorTerminal;
