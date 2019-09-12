import React from 'react';
import classnames from 'classnames';
import styles from './Paginator.module.css';

export class Paginator extends React.PureComponent {

    render() {
        const { totalPages, currentPage } = this.props
        return (
            <ul>
                {Array(totalPages).fill(null).map((_, i) => {
                    return <li
                        key={i}
                        className={classnames({
                            [styles.selected]: i === currentPage,
                        })}
                        onClick={() => this.props.onPageChange(i)}>
                    </li>
                })}
            </ul>
        );
    }

}
