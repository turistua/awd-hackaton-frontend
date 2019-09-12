import React from 'react';
import styles from './Profile.module.css';

export class ProfilePage extends React.PureComponent {

    render() {
        const { user } = this.props;
        const achivementsTable = user.achievements.length ? (
            <div className={styles['achivements-table']}>
                {user.achievements.map(achievement => {
                    return <div className={styles.achievement}>
                        <div className={styles['achievement-avatar']} style={{
                            backgroundImage: `url(${achievement.avatarUrl})`,
                        }}></div>
                        <div>{achievement.title}</div>
                    </div>
                })}
            </div>
        ) : null
        return (
            <div>
                <div className={styles['info-block']}>
                    <div className={styles.avatar} style={{
                        backgroundImage: `url(${user.avatarUrl})`,
                    }}></div>
                    <div className={styles.name}>{user.fullName}</div>
                    <div className={styles.badge}>{user.badge}</div>
                    <div className={styles['level-breakdown']}>{user.treesTillLevel} trees till the next level</div>
                    {achivementsTable}
                    <div className={styles.separator}></div>
                    <div className={styles['tokens-block']}>
                        <div className={styles.balance}>
                            <div className={styles['tokens-count']}>{user.tokens}</div>
                            <div className={styles['tokens-add-button']}></div>
                        </div>
                        <div className={styles.label}>TreeTokens</div>
                    </div>
                </div>
            </div>
        )
    }

}
