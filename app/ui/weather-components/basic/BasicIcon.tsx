import styles from "./BasicIcon.module.css";

const BasicIcon = ({ type }: { type: string }) => {
  return (
    <div
      className={`flex flex-col justify-center align-center h-10 w-10 ${
        styles.circle
      } ${styles[type.toLowerCase()]}`}
    ></div>
  );
};

export default BasicIcon;
