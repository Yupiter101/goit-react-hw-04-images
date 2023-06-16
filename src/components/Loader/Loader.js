
import { ProgressBar } from 'react-loader-spinner';
import css from "./Loader.module.css";

export const Loader = () => {
  return (
    <span className={css.LoaderWrap}>
      <ProgressBar
          height="140"
          width="140"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor = '#F4442E'
          barColor = '#51E5FF'
      />
    </span>
  )

}