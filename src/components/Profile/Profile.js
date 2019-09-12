import React from 'react';
import styles from './Profile.module.css';
import oxygenImg from 'img/oxygen.svg';
import coImg from 'img/co2.svg';

export class ProfilePage extends React.PureComponent {

    render() {
        const { user } = this.props;
        const achivementsTable = user.achievements.length ? (
            <div className={styles['achivements-table']}>
                <div className={styles.row}>
                    {user.achievements.slice(0,3).map(achievement => {
                        return <div key={achievement.name} className={styles.achievement}>
                            <div className={styles.avatar} style={{
                                backgroundImage: `url(${achievement.img})`,
                            }}></div>
                            <div className={styles.title}>{achievement.title}</div>
                        </div>
                    })}
                </div>
                <div className={styles.row}>
                    {user.achievements.slice(3,6).map(achievement => {
                        return <div key={achievement.name} className={styles.achievement}>
                            <div className={styles.avatar} style={{
                                backgroundImage: `url(${achievement.img})`,
                            }}></div>
                            <div className={styles.title}>{achievement.title}</div>
                        </div>
                    })}
                </div>
            </div>
        ) : null
        return (
            <div>
                <div className={styles.backButton}></div>
                <div className={styles['info-block']}>
                    <div className={styles.avatar} style={{
                        backgroundImage: `url(${user.avatarUrl})`,
                    }}></div>
                    <div className={styles.name}>{user.firstName + ' ' + user.lastName}</div>
                    <div className={styles.badge}>{user.badge}</div>
                    <div className={styles['level-breakdown']}>{user.treesTillLevel} trees till the next level</div>
                    {achivementsTable}
                    <div className={styles.separator}></div>
                    <div className={styles['tokens-block']}>
                        <div className={styles.balance}>
                            <div className={styles['tokens-count']}>{user.balance}</div>
                            <div className={styles['tokens-add-button']}></div>
                        </div>
                        <div className={styles.label}>TreeTokens</div>
                    </div>
                </div>
                <div className={styles.statistics}>
                    <div className={styles.statBlock}>
                        <h1>You planted</h1>
                        <div className={styles.treesCount}>{user.trees}</div>
                        <div className={styles.treesLabel}>Trees</div>
                        <div className={styles.separator}></div>
                        <div className={styles.facts}>
                            <div>
                                <div className={styles.img}><img src={oxygenImg} alt="oxygen"/></div>
                                <div className={styles.number}>42 354 100</div>
                                <div className={styles.description}>Kg of oxigen will be produced in next 10 years</div>
                            </div>
                            <div>
                                <div className={styles.img}><img src={coImg} alt="co2"/></div>
                                <div className={styles.number}>56 329 570</div>
                                <div className={styles.description}>Kg of carbon dioxide will be absorbed in next 10 years</div>
                            </div>
                        </div>
                        <div className={styles.shareButton}>Share</div>
                    </div>
                </div>
            </div>
        )
    }

}
