import React from 'react'

import styles from './RulesText.module.css'

export const RulesText = () => {
    return (
        <div className={styles.rules}>
            <h2>Rules</h2>
            <ul className={styles.rulesList}>
                <li>Goals +2</li>
                <li>Misses -4</li>
                <li>Interceptions +10</li>
                <li>Turnovers -1</li>
                <li>Contact -0.5</li>
                <li>Obstruction -0.5</li>
                <li>Pickups +10</li>
            </ul>
            <div className={styles.rulesextra}>
                Captains will earn 2x the points for the week.
                Vice Captains will earn 1.5x the points for the week
            </div>
        </div>
    )
}
