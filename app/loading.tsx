import { Spin } from "antd";
import styles from './loading.module.css'

export default function Loading() {
    return (
        <div className={styles.loading}>
            <Spin size="large" tip='Page is loading...'> </Spin>
        </div>
)
  }